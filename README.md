# 🚀 OrangeHRM Admin Automation Framework

[![Playwright Tests](https://github.com/NhatHoang2003/OrangeHRM_Admin_Management_Framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/NhatHoang2003/OrangeHRM_Admin_Management_Framework/actions/workflows/playwright.yml)

---

## 1. Project Overview

- Project Name: OrangeHRM Admin Automation Framework  
- Purpose: UI automation testing for OrangeHRM Admin module  
- Type: End-to-End Automation Testing  
- Target: QA / QA Automation / CI-CD practice  
- Scope: Admin Users, Roles, Permissions  

---

## 2. Tech Stack

- Playwright: UI Automation Framework  
- TypeScript: Test scripting language  
- Node.js: Runtime environment  
- Docker: Containerized execution  
- Git: Version control  
- GitHub Actions: CI/CD pipeline  
- HTML Report: Test reporting  
- Allure Report: Advanced reporting (optional)  

---

## 3. Project Structure

- tests/ : Test cases  
- pages/ : Page Object Model (POM)  
- utils/ : Helper functions  
- config/ : Environment configs  
- docker/ : Docker setup  
- playwright.config.ts : Playwright configuration  
- package.json : Dependencies & scripts  

---

## 4. Setup Project

- Clone repo:  
  git clone <https://github.com/NhatHoang2003/OrangeHRM_Admin_Management_Framework.git>

- Move folder:  
  cd OrangeHRM_Admin_Management_Framework  

- Install dependencies:  
  npm install  

- Install browsers:  
  npx playwright install  

---

## 5. Run Tests (Local)

- Run all tests: npm run test  
- UI mode: npm run test:ui  
- Headed mode: npm run test:headed  
- Chromium: npm run test:chromium  
- Firefox: npm run test:firefox  
- WebKit: npm run test:webkit  

---

## 6. Docker Usage

- Build image: docker build -t orangehrm-playwright .  
- Run tests: docker run --rm orangehrm-playwright  
- Debug container: docker run -it orangehrm-playwright bash  

---

## 7. CI/CD (GitHub Actions)

- Trigger: Push / Pull Request  
- OS: Ubuntu latest  
- Browser support: Chromium / Firefox / WebKit  
- Execution: Parallel tests  
- Output: Test report generation  

---

## 8. Test Reports

- HTML Report: npx playwright show-report  
- Allure Report: npx allure generate && npx allure open  

---

## 9. Key Features

- Page Object Model (POM)  
- Cross-browser testing  
- Parallel execution  
- Retry failed tests  
- Environment config (.env)  
- Dockerized execution  
- CI/CD automation  
- Screenshot & trace debugging  

---

## 10. Evidence / Screenshots

- GitHub Actions pipeline  
- HTML report result  
- Docker execution logs  
- Test run results  

---

## 11. Project Value

- QA Automation: Playwright test design  
- DevOps basics: Docker + CI/CD  
- Framework design: POM architecture  
- Testing strategy: Cross-browser + parallel  
- Real-world workflow: End-to-end automation  

---

## 12. Author

- Author: Lê Nhật Hoàng  
- Role: QA Automation Tester (Aspiring)  
- GitHub: <https://github.com/NhatHoang2003>
