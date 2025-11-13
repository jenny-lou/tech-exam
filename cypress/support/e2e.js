// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'


 // Prevent Cypress from failing on site JS errors
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})



// Define the allowed Domains
const allowedDomains = [
'vodafone.com.au',
'api-prod.prod.cms.df.services.vodafone.com.au',
'cludo.com'
];

// Block all requests not coming from the allowedDomains before each test
before(() => {  
    cy.intercept({ url: '**', middleware: true }, (req) => {
        const url = req.url || '';
        const allowed = allowedDomains.some(domain => url.includes(domain));

        if(allowed) {
            console.log(url)
            req.continue()
        } else {
            req.destroy()
            console.log('Blocked external request:', req.url)
        }
    })
})
