export type ErrorField = 
    | 'username' 
    | 'password' 
    | 'login';

export interface ExpectedError {
    field: ErrorField;
    text: string;
}

export interface LoginTestCase  {
    testName: string;
    username: string;
    password: string;
    expectedUrl?: string;
    expectedErrors?: ExpectedError[];
}