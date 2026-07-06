export const SIDEBAR_SEARCH_TEST_CASES = [
    { caseId: 'C64', menu: 'Admin', title: 'Should display Admin menu after searching' },
    { caseId: 'C65', menu: 'PIM', title: 'Should display PIM menu after searching' },
    { caseId: 'C66', menu: 'Leave', title: 'Should display Leave menu after searching' },
    { caseId: 'C67', menu: 'Time', title: 'Should display Time menu after searching' },
    { caseId: 'C68', menu: 'Recruitment', title: 'Should display Recruitment menu after searching' },
    { caseId: 'C69', menu: 'My Info', title: 'Should display My Info menu after searching' },
    { caseId: 'C70', menu: 'Performance', title: 'Should display Performance menu after searching' },
    { caseId: 'C71', menu: 'Dashboard', title: 'Should display Dashboard menu after searching' },
    { caseId: 'C72', menu: 'Directory', title: 'Should display Directory menu after searching' },
    { caseId: 'C73', menu: 'Maintenance', title: 'Should display Maintenance menu after searching' },
    { caseId: 'C74', menu: 'Claim', title: 'Should display Claim menu after searching' },
    { caseId: 'C75', menu: 'Buzz', title: 'Should display Buzz menu after searching' },
];

export const SIDEBAR_CLICK_TEST_CASES = [
    { caseId: 'C76', menu: 'Admin', expectedUrl: /.*admin\/viewSystemUsers/, title: 'Should redirects to View Users page after clicking Admin menu' },
    { caseId: 'C77', menu: 'PIM', expectedUrl: /.*pim\/viewEmployeeList/, title: 'Should redirects to View Employee List page after clicking PIM menu' },
    { caseId: 'C78', menu: 'Leave', expectedUrl: /.*leave\/viewLeaveList/, title: 'Should redirects to View Leave List page after clicking Leave menu' },
    { caseId: 'C79', menu: 'Time', expectedUrl: /.*time\/viewEmployeeTimesheet/, title: 'Should redirects to View Employee Timesheet page after clicking Time menu' },
    { caseId: 'C80', menu: 'Recruitment', expectedUrl: /.*recruitment\/viewCandidates/, title: 'Should redirects to View Candidates page after clicking Recruitment menu' },
    { caseId: 'C81', menu: 'My Info', expectedUrl: /.*pim\/viewPersonalDetails/, title: 'Should redirects to View Personal Details page after clicking My Info menu' },
    { caseId: 'C82', menu: 'Performance', expectedUrl: /.*performance\/searchEvaluatePerformanceReview/, title: 'Should redirects to Search Evaluate Performance Review page after clicking Performance menu' },
    { caseId: 'C83', menu: 'Dashboard', expectedUrl: /.*dashboard\/index/, title: 'Should redirects to Dashboard page after clicking Dashboard menu' },
    { caseId: 'C84', menu: 'Directory', expectedUrl: /.*directory\/viewDirectory/, title: 'Should redirects to View Directory page after clicking Directory menu' },
    { caseId: 'C85', menu: 'Maintenance', expectedUrl: /.*maintenance\/purgeEmployee/, title: 'Should redirects to Purge Employee page after clicking Maintenance menu' },
    { caseId: 'C86', menu: 'Claim', expectedUrl: /.*claim\/viewAssignClaim/, title: 'Should redirects to View Assign Claim page after clicking Claim menu' },
    { caseId: 'C87', menu: 'Buzz', expectedUrl: /.*buzz\/viewBuzz/, title: 'Should redirects to View Buzz page after clicking Buzz menu' },
];