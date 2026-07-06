export const saveUserTestData = [

    {
        testName: 'Verify create user successfully',
        userRole: 'ESS',
        employeeName: 'James  Butler',
        status: 'Enabled',
        username: 'odoriko2',
        password: 'Hoangle0812@',
        confirmPassword: 'Hoangle0812@',
        expectedUrl: '/web/index.php/admin/viewSystemUsers'
    },

    {
        testName: 'Verify all required fields',
        userRole: '',
        employeeName: '',
        status: '',
        username: '',
        password: '',
        confirmPassword: '',
        expectedErrors: [
            {
                field: 'userRole',
                text: 'Required'
            },
            {
                field: 'employeeName',
                text: 'Required'
            },
            {
                field: 'status',
                text: 'Required'
            },
            {
                field: 'username',
                text: 'Required'
            },
            {
                field: 'password',
                text: 'Required'
            },
            {
                field: 'confirmPassword',
                text: 'Passwords do not match'
            }
        ]
    },

    {
        testName: 'Verify blank username field',
        userRole: 'ESS',
        employeeName: 'James  Butler',
        status: 'Enabled',
        username: '',
        password: 'Hoangle0812@',
        confirmPassword: 'Hoangle0812@',
        expectedErrors: [
            {
                field: 'username',
                text: 'Required'
            }
        ]
    },

    {
        testName: 'Verify blank password field',
        userRole: 'ESS',
        employeeName: 'James  Butler',
        status: 'Enabled',
        username: 'odoriko2',
        password: '',
        confirmPassword: '',
        expectedErrors: [
            {
                field: 'password',
                text: 'Required'
            },
            {
                field: 'confirmPassword',
                text: 'Required'
            }
        ]
    },

    {
        testName: 'Verify password mismatch',
        userRole: 'ESS',
        employeeName: 'James  Butler',
        status: 'Enabled',
        username: 'odoriko2',
        password: 'Hoangle0812@',
        confirmPassword: 'WrongPassword123',
        expectedErrors: [
            {
                field: 'confirmPassword',
                text: 'Passwords Do Not Match'
            }
        ]
    },

    {
        testName: 'Verify short password',
        userRole: 'ESS',
        employeeName: 'James  Butler',
        status: 'Enabled',
        username: 'odoriko2',
        password: '123',
        confirmPassword: '123',
        expectedErrors: [
            {
                field: 'password',
                text: 'Should have at least 7 characters'
            }
        ]
    },

    {
        testName: 'Verify blank employee name',
        userRole: 'ESS',
        employeeName: '',
        status: 'Enabled',
        username: 'odoriko2',
        password: 'Hoangle0812@',
        confirmPassword: 'Hoangle0812@',
        expectedErrors: [
            {
                field: 'employeeName',
                text: 'Required'
            }
        ]
    },

    {
        testName: 'Verify blank user role',
        userRole: '',
        employeeName: 'James  Butler',
        status: 'Enabled',
        username: 'odoriko2',
        password: 'Hoangle0812@',
        confirmPassword: 'Hoangle0812@',
        expectedErrors: [
            {
                field: 'userRole',
                text: 'Required'
            }
        ]
    },

    {
        testName: 'Verify blank status',
        userRole: 'ESS',
        employeeName: 'James  Butler',
        status: '',
        username: 'odoriko2',
        password: 'Hoangle0812@',
        confirmPassword: 'Hoangle0812@',
        expectedErrors: [
            {
                field: 'status',
                text: 'Required'
            }
        ]
    }
];