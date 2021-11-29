describe("renders the home page", () =>{
    it("renders correctly", () => {
        cy.visit("/")
        cy.get("title").should("exist")
    })
})
describe("check reservation", () => {
    it("show reserved seats", () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('/');
        cy.get(':nth-child(2) > .MuiImageListItemBar-root > .MuiImageListItemBar-titleWrap > .MuiImageListItemBar-subtitle > div > :nth-child(1)').click();
        cy.get('body').click();
        cy.get('.MuiMenuItem-root').click();
        cy.get('#day').clear();
        cy.get('#day').type('2021-11-29');
        cy.get('.MuiLoadingButton-root').click();
        /* ==== End Cypress Studio ==== */
    })

})
