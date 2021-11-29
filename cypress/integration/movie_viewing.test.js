/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect-in-promise */
describe("renders the home page", () =>{
    it("renders correctly", () => {
        cy.visit("/")
        cy.get("title").should("exist")
        // cy.get('.MuiImageListItem-root').should('have.length', 3)
    })
})

describe("check quantity", () => {
    it("look for the quantity of saved movies", () => {
    cy.request({
        method: 'GET',
        url : 'https://testing-proyecto-b-backend.herokuapp.com/movies',
    }).then((res)=>{
        var quantity_db = (res.body).length
        cy.get('.MuiImageListItem-root').should('have.length', quantity_db+1)
        })
    })
})

describe("check title names", () => {
    it("look if the titles match", () => {
    cy.request({
        method: 'GET',
        url : 'https://testing-proyecto-b-backend.herokuapp.com/movies',
    }).then((res)=>{
        // console.log(objeto)
        var number = 0
        var objeto = (res.body)[number].name
        cy.get('.MuiImageListItemBar-title').each(($el) => {
            expect($el.text()).to.eq(objeto)
            
        }
        )
    })
    })
})