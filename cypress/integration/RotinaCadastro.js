describe("Rotina Cadastro",()=>{

    let id;

    beforeEach(() => {
        cy.visit("https://qa-test.ticto.io/")
       //Verificar Site
        cy.get('div[class="col-12"]').should('contain',"Formulário")
            .should('contain',`Nome`)
            .should('contain',`E-mail`)
            .should('contain',`Password`);        
      })

    context("Erros de Cadastro",()=>{
    
        it("Cadastro Faltando Nome",()=>{        
            cy.get(`input[name="email"]`).type(Cypress.env("email"));
            cy.get(`input[name="password"]`).type(Cypress.env("senha"));
            cy.get('button[type="submit"]').contains("Cadastrar").click()
            cy.get('div[class="form-group py-1"]').should('contain',Cypress.env("erroNomeObrig"))
        })
    
        it("Cadastro Faltando Senha",()=>{        
            cy.get(`input[name="name"]`).type(`${Cypress.env("nome")} ${Cypress.env("sobrenome")}`);
            cy.get(`input[name="email"]`).type(Cypress.env("email"));
            cy.get('button[type="submit"]').contains("Cadastrar").click()
            cy.get('div[class="form-group py-1"]').should('contain',Cypress.env("erroSenhaObrig"))
        })
    
        it("Cadastro Faltando E-mail",()=>{        
            cy.get(`input[name="name"]`).type(`${Cypress.env("nome")} ${Cypress.env("sobrenome")}`);
            cy.get(`input[name="password"]`).type(Cypress.env("senha"));
            cy.get('button[type="submit"]').contains("Cadastrar").click()
            cy.get('div[class="form-group py-1"]').should('contain',Cypress.env("erroEmailObrig"))
        })
    
        it("Cadastro com Nome sem Sobrenome",()=>{        
            cy.get(`input[name="name"]`).type(Cypress.env("nome"));
            cy.get(`input[name="email"]`).type(Cypress.env("email"));
            cy.get(`input[name="password"]`).type(Cypress.env("senha"));
            cy.get('button[type="submit"]').contains("Cadastrar").click()
            cy.get('div[class="form-group py-1"]').should('contain',Cypress.env("erroSobrenomeObrig"))
        })
    })   

    context("Cadastro Usuario",()=>{
        it("Cadastro Completo",()=>{      
            cy.get(`input[name="name"]`).type(`${Cypress.env("nome")} ${Cypress.env("sobrenome")}`);   
            cy.get(`input[name="email"]`).type(Cypress.env("email"));
            cy.get(`input[name="password"]`).type(Cypress.env("senha"));
            cy.get('button[type="submit"]').contains("Cadastrar").click()
            cy.get('div[class="alert alert-success"]').should('contain',Cypress.env("mensagemCadastro"))
          
            cy.get('tbody').contains(`${Cypress.env("nome")} ${Cypress.env("sobrenome")}`)
            .last()
            .parent()
            .find('th')
            .invoke('text')
            .then((th) => {id = th})
        })
    
        it("Verificar Cadastro",()=>{
            cy.get('tbody')
            .should(`contain`,id)
            .should(`contain`,Cypress.env("email"))
            .should(`contain`,`${Cypress.env("nome")} ${Cypress.env("sobrenome")}`) 
        })
    })
    
    context("Alteração do Cadastro",()=>{
        it("Editar Cadastro",()=>{
            cy.get('tbody').contains(id)
            .parent()
            .find('.btn-group > .btn')
            .click()
            .get('div[class="dropdown-menu show"]').contains("Editar").click()
    
            cy.get(`#e_name${id}`).clear().type(Cypress.env("nomeAlterado"));
            cy.get(`#e_email${id}`).clear().type(Cypress.env("emailAlterado"));
            cy.get(`#modalEdit${id} > .modal-dialog > .modal-content > .modal-footer > .btn-primary`).click();
            
            cy.get('div[class="alert alert-success"]').should('contain',Cypress.env("mensagemEdicao"))
        })
    
        it("Verificar Edição Cadastro",()=>{
            cy.get('tbody')
            .should(`contain`,id)
            .should(`contain`,Cypress.env("nomeAlterado"))
            .should(`contain`,Cypress.env("emailAlterado"))       
        })
    })

    context("Exclusão de Cadastro",()=>{
        it("Apagar o Cadastro Realizado",()=>{
            cy.get('tbody').contains(id)
            .parent()
            .find('.btn-group > .btn')
            .click()
            .get('div[class="dropdown-menu show"]').contains("Excluir").click()
    
            cy.get(`#modalDelete${id} > .modal-dialog > .modal-content > .modal-footer > .btn-danger`).click()
            cy.get('div[class="alert alert-success"]').should('contain',Cypress.env("mensagemExcluir"))
        })
    
        it("Verificar Se o Cadastro foi Apagado",()=>{
            cy.get('tbody')
            .should(`not.contain`,id)
            .should(`not.contain`,Cypress.env("nomeAlterado"))
            .should(`not.contain`,Cypress.env("emailAlterado"))        
        })
    })
})