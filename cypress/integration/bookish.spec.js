import axios from "axios";

const gotoApp = () => {
  cy.visit('http://localhost:3000/');
}

const checkAppTitle = () => {
  cy.get('h2[data-test="heading"]').contains('Bookish');
}

const checkBookListWith = (expectation = []) => { cy.get('div[data-test="book-list"]').should('exist'); cy.get('div.book-item').should((books) => {
  expect(books).to.have.length(expectation.length);
  const titles = [...books].map(x => x.querySelector('h2').innerHTML);
  expect(titles).to.deep.equal(expectation)
})
}

const checkBookList = () => {
  checkBookListWith(['Refactoring', 'Domain-driven design', 'Building Microservices', 'Acceptance Test Driven Development with React']);
}

const checkSearchedResult = () => { checkBookListWith(['Domain-driven design'])
}

describe('Bookish application', function () {
  before(() => {
    return axios
        .delete('http://localhost:8080/books?_cleanup=true')
        .catch((err) => err);
  });

  it('Visits the bookish', () => {
    gotoApp();
    checkAppTitle();
  })

  it('Goes to the detail page', () => {
    cy.visit('http://localhost:3000/');
    cy.get('div.book-item').contains('View Details').eq(0).click();
    cy.url().should('include', '/books/1');
    cy.get('h2.book-title').contains('Refactoring');
  });

  it('Searches for a title', () => {
    cy.visit('http://localhost:3000/');
    cy.get('div.book-item').should('have.length', 4);
    cy.get('[data-test="search"] input').type('design');
    cy.get('div.book-item').should('have.length', 1);
    cy.get('div.book-item').eq(0).contains('Domain-driven design');
  });
})