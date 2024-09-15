import { createBookPreview } from '../utils.js';
import { books, authors, BOOKS_PER_PAGE } from '../data.js';

let page = 1;
let matches = books;

export function updateBookList() {
    const fragment = document.createDocumentFragment();

    for (const book of matches.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE)) {
        fragment.appendChild(createBookPreview(book, authors));
    }

    const listItems = document.querySelector('[data-list-items]');
    listItems.innerHTML = '';
    listItems.appendChild(fragment);

    const listButton = document.querySelector('[data-list-button]');
    listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;
    listButton.innerHTML = `    
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `;
}

export function loadMoreBooks() {
    page += 1;
    updateBookList();
}

export function setMatches(newMatches) {
    matches = newMatches;
    page = 1;
    updateBookList();
}
