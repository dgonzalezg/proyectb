describe("save seats", () =>{
    it("renders usable window to save seats", () => {
        cy.visit("/")
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(2) > .MuiImageListItemBar-root > .MuiImageListItemBar-titleWrap > .MuiImageListItemBar-subtitle > div > :nth-child(2)').click();
        /* ==== End Cypress Studio ==== */
        cy.get('[id^=Sala]').click({ multiple: true })
        cy.get('.MuiMenuItem-root').click();
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#day').clear();
        cy.get('#day').type('2021-10-05');
        cy.get('.MuiLoadingButton-root').click();
        /* ==== End Cypress Studio ==== */
        cy.get('[id^=Fila]').click({ multiple: true })
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[data-value="D"]').click();
        cy.get(':nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('[style="display: flex; flex-direction: column;"] > .MuiLoadingButton-root').click();
        /* ==== End Cypress Studio ==== */
    });
    
    it("saves the reservation in the database", async () => {
        cy.request({
            method: 'GET',
            url : 'https://testing-proyecto-b-backend.herokuapp.com/reservations',
        }).then((res)=>{
            var objeto = (res.body).pop()
            expect((objeto).show_id).to.eq(8)
            expect((objeto).row).to.eq('D')
            expect((objeto).seat).to.eq('1')
            cy.request({
                method: 'DELETE',
                url : `https://testing-proyecto-b-backend.herokuapp.com/reservations/${objeto.reservation_id}`
            })
        })
    })
})