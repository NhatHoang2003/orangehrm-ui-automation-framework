import { ENV } from "../../config/env";
import{ LoginTestCase  } from "./login.types";

export const loginRegressionData: LoginTestCase[] = [
    
    {
        testName: 'C55 Should show invalid credential message for invalid username',
        username: 'odoriko',
        password: ENV.ADMIN_PASSWORD,
        expectedErrors: [
            {
                field: 'login',
                text: 'Invalid credentials'
            }
        ],
    },

    {
        testName: 'C56 Should show invalid credential message for invalid password',
        username: ENV.ADMIN_USERNAME,
        password: 'todyodrift',
        expectedErrors: [
            {
                field: 'login',
                text: 'Invalid credentials'
            }
        ]
    },

    {
        testName: 'C57 Should show required message when username is empty',
        username: '',
        password: ENV.ADMIN_PASSWORD,
        expectedErrors: [
            {
                field: 'username',
                text: 'Required'
            }
        ]
    },

    {
        testName: 'C58 Should show required message when password is empty',
        username: ENV.ADMIN_USERNAME,
        password: '',
        expectedErrors: [
            {
                field: 'password',
                text: 'Required'
            }
        ]
    },

    {
        testName: 'C59 Should show required messages when all fields are empty',
        username: '',
        password: '',
        expectedErrors: [
            {
                field: 'username',
                text: 'Required'
            },
            {
                field: 'password',
                text: 'Required'
            }
        ]
    },

    {
        testName: 'C60 Should not login with SQL injection input',
        username: "' OR '1'='1",
        password: "' OR '1'='1",
        expectedErrors: [
            {
                field: 'login',
                text: 'Invalid credentials'
            }
        ]
    },

    {
        testName: 'C61 Should not execute script from XSS input',
        username: '<script>alert("xss")</script>',
        password: '<script>alert("xss")</script>',
        expectedErrors: [
            {
                field: 'login',
                text: 'Invalid credentials'
            }
        ]
    }
];  