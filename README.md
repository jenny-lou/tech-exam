
# HOW TO EXECUTE THE TEST
### Using the Cypress Test Runner

1. Install Cypress
```bash
npm install cypress --save-dev
```

2. Run the following command on the terminal to open the test runner
```bash
npx cypress open
```

3. On the test runner welcome page, select the E2E Testing

4. Select any available browser (Electron or Firefox)

5. Click Start E2E Testing

6. On the Specs page, click 'home.cy.js'. This will run the test


### Running on headless mode

1. Run on terminal the following command
```bash
npm run cy:run:firefox
```
OR

On your available browser
```bash
npx cypress run --browser <browsername> --headless
```


Note: 
It will fail on the last page validating the added plan price ($45) vs on the cart summary plan price ($53)


### To run the report


1. Install mochawesome

```bash

npm install --save-dev cypress mochawesome mochawesome-merge mochawesome-report-generator
```


2.  Run the following commands:
```bash
npm run cypress:run
npm run cypress:report
```





---


Part 1: Compare UI Labels vs. API Response Labels

    Go to URL www.vodafone.com.au/mobile/sim-only-phone-plans
    Get Product List
    Iterate through product list to obtain "Add to Cart" button label
    Send GET request to https://api-prod.prod.cms.df.services.vodafone.com.au/plan/postpaid-simo?serviceType=New
    Traverse through the response to obtain CTA Label value for plans object
    Compare UI Labels vs CTA Label from response object



Part 2: Add a Plan to Cart and Assert Values

    Select the first plan from the list of products
    Click Add to Cart
    Assert Amount displayed on Sticky Cart
    Continue to Cart
    Assert Plan added on Cart vs. Selected Plan


Guidelines

Use the client's preferred tool which is Cypress and programming language is Javascript.

Steps

    Create your own Github repository and make [rcanaveral] a read-only collaborator.
    Create a README.md file explaining how to execute your test.
    Sign up to any free CI tool such as Gitlab, CircleCI etc. Run your test in the CI and share the results with us.
    Ensure code is written neatly showcasing reusability and easy maintainability of tests.

Deadline

Please submit until tomorrow, November 13, 2025.


If there are any issues, or queries please let me know. Good luck!

