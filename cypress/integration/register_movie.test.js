describe("renders the home page", () =>{
    it("renders correctly", () => {
        cy.visit("/")
        cy.get("title").should("exist")
    })
    it("allows to click on register movie and goes to 'create movie' view", () => {
        cy.visit("/");
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.MuiContainer-root > .MuiButton-root').click();
        /* ==== End Cypress Studio ==== */
        cy.url().should('eq', 'http://localhost:3000/create')
    })
})
describe("register movie", () => {
    var today = new Date();
    var date = (today.getFullYear()+1)+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var dateFinish = (today.getFullYear()+2)+'-'+(today.getMonth()+1)+'-'+today.getDate();
    it("renders usable window to create a movie", () => {
        cy.visit("/")
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.MuiContainer-root > .MuiButton-root').click();
        cy.get('#name').clear();
        cy.get('#name').type('Harry potter');
        cy.get(':nth-child(1) > :nth-child(6) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get(':nth-child(2) > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('#image').clear();
        cy.get('#image').type('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ehgpsmw5h7NPDLLSxvvf0FjG0V30Uosv-w&usqp=CAU');
        cy.get('#start_day').clear();
        cy.get('#start_day').type(date);
        cy.get('#end_day').clear();
        cy.get('#end_day').type(dateFinish);
        cy.get('.MuiLoadingButton-root').click()
        /* ==== End Cypress Studio ==== */
    })
    it("saves the movie in the database", () => {
    cy.request({
        method: 'GET',
        url : 'https://testing-proyecto-b-backend.herokuapp.com/movies',
    }).then((res)=>{
        expect(((res.body).pop()).name).to.eq("Harry potter")
        })
    })
})
