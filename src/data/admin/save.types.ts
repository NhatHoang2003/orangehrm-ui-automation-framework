export type ErrorField =
    | 'userRole'
    | 'employeeName'
    | 'status'
    | 'username'
    | 'password'
    | 'confirmPassword'
    | ''

export interface ExpectedError {
    field: ErrorField;
    text: string;
}

export interface saveSystemUserCase {
    userRole: string;
    employeeName: string;
    status: string;
    username: string;
    password: string;
    confirmPassword: string;
    expectedUrl?: string;
    expectedError?: ExpectedError[];
}