import React from 'react'
import {render} from '@testing-library/react'
import {MemoryRouter as Router} from 'react-router-dom';
import BookList from './BookList';
import BookDetail from "../BookDetail/BookDetail";

const renderWithRouter = (component) => {
  return {
    ...render(<Router>
      {component}
    </Router>)
  }
};

describe('BookList', () => {
  it('loading', () => {
    const props = {
      loading: true
    };
    const {container} = render(<BookList {...props} />)
    const content = container.querySelector('p');
    expect(content.innerHTML).toContain('Loading');
  });

  it('error', () => {
    const props = {
      error: true
    };
    const {container} = render(<BookList {...props} />);
    const content = container.querySelector('p');
    expect(content.innerHTML).toContain('Error');
  })

  it('render books', () => {
    const props = {
      books: [
        {'name': 'Refactoring', 'id': 1},
        {'name': 'Domain-driven design', 'id': 2},
      ]
    };
    const {container} = renderWithRouter(<BookList {...props} />);
    const titles = [...container.querySelectorAll('h2')].map(x => x.innerHTML);
    expect(titles).toEqual(['Refactoring', 'Domain-driven design']);
  })

  it('displays the book name when no description was given', () => {
    const props = {
      book: {
        name: 'Refactoring'
      }
    }
    const { container } = render(<BookDetail {...props} />);
    const description = container.querySelector('p.book-description');
    expect(description.innerHTML).toEqual(props.book.name);
  })

});

