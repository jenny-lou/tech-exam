describe('The sim only plan flow', () => {
  const pageUrl = 'https://www.vodafone.com.au/mobile/sim-only-phone-plans';
  const apiUrl = 'https://api-prod.prod.cms.df.services.vodafone.com.au/plan/postpaid-simo?serviceType=New';

  let uiLabels = [];
  let apiLabels = [];
  let productIdList = [];

  before(() => {
    // visit the main page
    cy.visit(pageUrl)
  })

  it("Compare the UI 'Add to Cart' labels with API CTA labels", () => {
    // Get the product id's and store to productIdList
    cy.get("[data-index]")
      .find("[id*='plan-card']:not(#carousel-block-view-primaryPlans)")
      .each(($el) => {
        const planIdCard = $el.attr("id") 
        const planId = planIdCard.replace("plan-card-", "")
        productIdList.push(planId)
      })
      .then(() => {
        cy.log("Plan IDs: ", productIdList.join(', '))
      }) 
    
    // Get the CTA UI labels and store to uiLabels
    cy.get("[data-index]")
      .find("[data-testid*='desktop']")
      .each(($el) => {
        const ctaLabel = $el.find("[data-testid='select-plan-cta']").text().trim()
        if(ctaLabel) {
          uiLabels.push(ctaLabel)
        }
      })
      .then(() => {
        cy.log("UI CTA Labels: ", uiLabels.join(', '))
      })

    // Fetch API response
    cy.request(apiUrl).then((response) => {
      // Ensure response is valid
      expect(response.status).to.eq(200)

      // Extract CTA labels from API plans and store to apiLabels
      response.body.planListing.plans.map(plan => {
        apiLabels.push(plan.ctaLabel)
      })

      // Compare UI vs API cta labels
      uiLabels.forEach((uiLabel, index) => {
        expect(uiLabel).to.eq(apiLabels[index])
      })
    })
  })

  it("Add the first Plan to Cart and Assert Values", () => {
    let pricePlanUI = ""
    let pricePlanAPI = ""

    cy.get("[data-index]")
      .find("[id*='plan-card']:not(#carousel-block-view-primaryPlans)")
      .as("desktopPlans")

    // Get the displayed discounted price on the ui 
    cy.get("@desktopPlans")
      .find("[data-testid='uplifted-plan-card-price'] [data-testid='price']")
      .first()
      .then(($el) => {
        pricePlanUI = $el.text()
        cy.log("UI Price",pricePlanUI)
        // Get the discounted price on the api
        cy.request(apiUrl).then((response) => {
        // Ensure response is valid
        expect(response.status).to.eq(200)
        // Extract the discounted price plan
        pricePlanAPI = response.body.planListing.plans[0].discountedRecurringCharge

        // Compare values
        const uiValue = parseFloat(pricePlanUI.replace(/[^0-9.]g/, '')) // remove any char that is not a number or a dot
        const apiValue = parseFloat(pricePlanAPI)
        expect(uiValue).to.eq(apiValue)
      })
      .then(() => {
        //=== Click the Add to Cart button
        cy.get("@desktopPlans")
          .find("[data-testid='plan-card-actions-desktop'] button")
          .first()
          .click({ force: true })

        //===== Assert Amount displayed on Sticky Cart
        cy.get("[data-testid='sticky-cart-container']")
          .should("contain.text", pricePlanUI)

        //==== Continue to Cart
        cy.get("[data-testid='sticky-cart-title-cta-button']").click({ force: true })

        // //==== Assert Plan added on Cart vs. Selected Plan
        cy.wait(10000).then(() => {
          // to check if on the cart page
          cy.contains("Your cart") 

          // if asserted to the Original price plan
          cy.contains("53")
            .should("be.visible")
            .scrollIntoView()
          
          // if asserted to the discounted price plan
          cy.contains(pricePlanUI, { timeout: 10000 })
            .should("be.visible")
            .scrollIntoView()

        })

        
      })
    })
    
    
  })

})

