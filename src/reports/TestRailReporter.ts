import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

type SuiteName = 'smoke' | 'regression';
type ModuleName = 'login' | 'dashboard' | 'admin' | 'my-info' | 'auth';
type BrowserName = 'chromium' | 'firefox' | 'webkit';

class TestRailReporter implements Reporter {
  private planCache: Record<string, any> = {};

  async onTestEnd(test: TestCase, result: TestResult) {
    console.log('\n=== TESTRAIL REPORTER ===');
    console.log('Title:', test.title);
    console.log('Tags:', test.tags);
    console.log('Status:', result.status);
    console.log('Duration:', result.duration);

    const caseId = this.getCaseId(test);

    if (!caseId) {
      console.warn('No TestRail case ID found. Skipping TestRail update.');
      console.log('=========================\n');
      return;
    }

    const suiteName = this.getSuiteName(test);

    if (!suiteName) {
      console.warn(`No suite tag found for C${caseId}. Expected @smoke or @regression.`);
      console.log('=========================\n');
      return;
    }

    const moduleName = this.getModuleName(test);

    if (!moduleName) {
      console.warn(`No module tag found for C${caseId}. Expected @login, @dashboard, or @admin.`);
      console.log('=========================\n');
      return;
    }

    const browserName = this.getBrowserName(test);

    if (!browserName) {
      console.warn(`No browser found for C${caseId}.`);
      console.log('=========================\n');
      return;
    }

    const planId = this.getPlanId(suiteName);

    if (!planId) {
      console.warn(`No TestRail plan ID found for suite: ${suiteName}.`);
      console.log('=========================\n');
      return;
    }

    const runId = await this.getRunIdFromPlan(planId, moduleName, browserName);

    if (!runId) {
      console.warn(
        `No matching run found in plan ${planId} for module=${moduleName}, browser=${browserName}.`
      );
      console.log('=========================\n');
      return;
    }

    const statusId = this.mapStatusId(result);
    const comment = this.buildComment(test, result, suiteName, moduleName, browserName);

    await this.addResultForCase(runId, caseId, statusId, comment, result.duration);

    console.log('=========================\n');
  }

  private getCaseId(test: TestCase): string | undefined {
    const annotation = test.annotations.find(
      annotation => annotation.type === 'testrail_case_id'
    );

    if (annotation?.description) {
      return annotation.description.match(/C?(\d+)/i)?.[1];
    }

    return test.title.match(/C(\d+)/i)?.[1];
  }

  private getSuiteName(test: TestCase): SuiteName | undefined {
    const tags = test.tags.map(tag => tag.toLowerCase());
    const filePath = test.location.file.toLowerCase().replace(/\\/g, '/');

    if (tags.includes('@smoke') || filePath.includes('/smoke/')) {
      return 'smoke';
    }

    if (tags.includes('@regression') || filePath.includes('/regression/')) {
      return 'regression';
    }

    return undefined;
  }

  private getModuleName(test: TestCase): ModuleName | undefined {
    const tags = test.tags.map(tag => tag.toLowerCase());
    const filePath = test.location.file.toLowerCase().replace(/\\/g, '/');
    const projectName = test.parent.project()?.name?.toLowerCase() ?? '';

    if (
      tags.includes('@auth') ||
      projectName.includes('setup') ||
      filePath.includes('auth.setup') ||
      filePath.includes('/auth/')
    ) {
      return 'auth';
    }
    if (
      tags.includes('@login') ||
      projectName.includes('login') ||
      filePath.includes('/login/')
    ) {
      return 'login';
    }

    if (
      tags.includes('@dashboard') ||
      filePath.includes('/dashboard/')
    ) {
      return 'dashboard';
    }

    if (
      tags.includes('@admin') ||
      filePath.includes('/admin/')
    ) {
      return 'admin';
    }

    // if (
    //   tags.includes('@myinfo') ||
    //   filePath.includes('/myinfo/')
    // ) {
    //   return 'myinfo';
    // }

    return undefined;
  }

  private getBrowserName(test: TestCase): BrowserName | undefined {
    const projectName = test.parent.project()?.name?.toLowerCase() ?? '';

    if (projectName.includes('chromium')) {
      return 'chromium';
    }

    if (projectName.includes('firefox')) {
      return 'firefox';
    }

    if (projectName.includes('webkit')) {
      return 'webkit';
    }

    return undefined;
  }

  private getPlanId(suiteName: SuiteName): string | undefined {
    const planIdMap: Record<SuiteName, string | undefined> = {
      smoke: process.env.TESTRAIL_PLAN_ID_SMOKE,
      regression: process.env.TESTRAIL_PLAN_ID_REGRESSION,
    };

    return planIdMap[suiteName];
  }

  private async getRunIdFromPlan(
  planId: string,
  moduleName: ModuleName,
  browserName: BrowserName
  ): Promise<string | undefined> {
    const plan = await this.getPlan(planId);

    for (const entry of plan.entries ?? []) {
      const entryName = String(entry.name ?? '').toLowerCase();

      for (const run of entry.runs ?? []) {
        const runName = String(run.name ?? '').toLowerCase();
        const configName = String(run.config ?? '').toLowerCase();

        const searchableName = `${entryName} ${runName} ${configName}`;

        console.log('Checking TestRail run:', {
          entryName,
          runName,
          configName,
          searchableName,
          runId: run.id,
        });

        const isCorrectModule = searchableName.includes(moduleName);
        const isCorrectBrowser = searchableName.includes(browserName);

        if (isCorrectModule && isCorrectBrowser) {
          console.log(`Matched TestRail run: ${searchableName} -> run_id=${run.id}`);
          return String(run.id);
        }
      }
    }

    return undefined;
  }

  private async getPlan(planId: string): Promise<any> {
    if (this.planCache[planId]) {
      return this.planCache[planId];
    }

    const baseUrl = this.getBaseUrl();
    const authString = this.getAuthString();

    const url = `${baseUrl}/index.php?/api/v2/get_plan/${planId}`;

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
    });

    this.planCache[planId] = response.data;

    return response.data;
  }

  private async addResultForCase(
    runId: string,
    caseId: string,
    statusId: number,
    comment: string,
    duration: number
  ): Promise<void> {
    const baseUrl = this.getBaseUrl();
    const authString = this.getAuthString();

    const url = `${baseUrl}/index.php?/api/v2/add_result_for_case/${runId}/${caseId}`;

    const elapsed = `${Math.max(1, Math.ceil(duration / 1000))}s`;

    try {
      console.log(`Updating TestRail C${caseId} in run ${runId}...`);

      const response = await axios.post(
        url,
        {
          status_id: statusId,
          comment,
          elapsed
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${authString}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log(`Updated TestRail C${caseId} successfully.`);
      }
    } catch (error: any) {
      console.error(`Update TestRail C${caseId} failed.`);

      if (error.response) {
        console.error(`Status code: ${error.response.status}`);
        console.error('Response data:', error.response.data);
      } else {
        console.error('Error message:', error.message);
      }
    }
  }

  private mapStatusId(result: TestResult): number {
    if (result.status === 'passed') {
      return 7; // Automation Passed
    }

    if (result.status === 'skipped') {
      return 4; // Skipped
    }

    if (result.status === 'timedOut' || result.status === 'interrupted') {
      return 9; // Automation Error
    }

    return 8; // Automation Failed
  }

  private buildComment(
    test: TestCase,
    result: TestResult,
    suiteName: SuiteName,
    moduleName: ModuleName,
    browserName: BrowserName
  ): string {

    const labels = test.tags.join(', ');

    const lines = [
      'Playwright Automated Test Execution',
      '',
      `Test Title: ${test.title}`,
      `Suite: ${suiteName}`,
      `Labels: ${labels}`,
      `Module: ${moduleName}`,
      `Browser: ${browserName}`,
      `Project: ${test.parent.project()?.name}`,
      `Result: ${result.status.toUpperCase()}`,
      `Duration: ${result.duration}ms`,
      `Retry: ${result.retry}`,
    ];

    if (result.error?.message) {
      lines.push('');
      lines.push('Error Message:');
      lines.push(result.error.message);
    }

    return lines.join('\n');
  }

  private getBaseUrl(): string {
    const baseUrl = process.env.TESTRAIL_URL?.replace(/\/$/, '');

    if (!baseUrl) {
      throw new Error('TESTRAIL_URL is missing.');
    }

    return baseUrl;
  }

  private getAuthString(): string {
    const username = process.env.TESTRAIL_USERNAME;
    const apiKey = process.env.TESTRAIL_API_KEY;

    if (!username || !apiKey) {
      throw new Error('TESTRAIL_USERNAME or TESTRAIL_API_KEY is missing.');
    }

    return Buffer.from(`${username}:${apiKey}`).toString('base64');
  }
}

export default TestRailReporter;