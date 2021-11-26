describe("save seats", () =>{
    /*it("renders usable window to save seats", () => {
        cy.visit("/")

        // ==== Generated with Cypress Studio ==== 
        cy.get('.MuiImageListItemBar-subtitle > div > :nth-child(1)').click();
        cy.get('body').click();
        cy.get('.MuiBackdrop-root').click();
        cy.get('body').click();
        cy.get('.MuiMenuItem-root').click();
        cy.get('body').click();
        cy.get('[data-value="D"]').click();
        cy.get(':nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('#day').clear();
        cy.get('#day').type('2021-10-05');
        cy.get('.MuiLoadingButton-root').click();
        // ==== End Cypress Studio ==== 
    });*/
    
    it("saves the reservation in the database", async () => {
        cy.request({
            method: 'POST',
            url : 'https://testing-proyecto-b-backend.herokuapp.com/reservations',
            body: {
                "show_id": 5,
                "row": "A",
                "seat": "1",
                "day": "2021-10-05"
            }
        }).then((res)=>{
            expect(res.status).to.eq(201)
        })
    })
})