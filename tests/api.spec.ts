import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

var token;

test.describe('API Test', () => {

    const randomFirstName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const randomNumber = faker.number.int(50);

    test('GET request', async ({ request }) => {
        const response = await request.get("/booking");
        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log(JSON.stringify(body));
    })

    test.skip('GET request with params @api', async ({ request }) => {
        const response = await request.get("/booking", {
            params: {
                firstname: "Jane",
                lastname: "Doe"
            }
        });
    
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log(JSON.stringify(body));
    })

    test('POST create booking @api', async ({ request }) => {
        const response = await request.post("/booking", {
            data: {
                "firstname" : "Tibor",
                "lastname" : "Mesty",
                "totalprice" : 111,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2023-12-20",
                    "checkout" : "2019-12-23"
                },
                "additionalneeds" : "Breakfast"

            }
        });
    
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(JSON.stringify(responseBody));
        expect(responseBody.booking).toHaveProperty("firstname", "Tibor");
        expect(responseBody.booking).toHaveProperty("lastname", "Mesty");
    })

    test('POST dynamic test @api', async ({ request }) => {
        const response = await request.post("/booking", {
            data: {
                "firstname" : randomFirstName,
                "lastname" : randomLastName,
                "totalprice" : randomNumber,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2023-12-20",
                    "checkout" : "2019-12-23"
                },
                "additionalneeds" : "Breakfast"

            }
        });
    
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(JSON.stringify(responseBody));
        expect(responseBody.booking).toHaveProperty("firstname", randomFirstName);
        expect(responseBody.booking).toHaveProperty("lastname", randomLastName);
    })


    test.only('PUT update booking details @api', async ({ request }) => {


        const response = await request.post("/auth", {
            data: {
                "username": "admin",
                "password": "password123"
            }
        });

        console.log(await response.json());
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        token = responseBody.token;
        console.log("New token is: " + token);

        const updateRequest = await request.put("/booking/1", {
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`,
            },
            data: {
                "firstname" : randomFirstName,
                "lastname" : randomLastName,
                "totalprice" : randomNumber,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2023-12-20",
                    "checkout" : "2019-12-23"
                },
                "additionalneeds" : "Breakfast"

            }
        })

        console.log(await updateRequest.json())



    });

})