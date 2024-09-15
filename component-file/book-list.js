import { createBookPreview } from '../utils.js';
import { books, authors, BOOKS_PER_PAGE } from '../data.js';

let page = 1; // Current page number for pagination
let matches = books; // Array of books to be displayed

/**
 * Updates the list of books displayed on the page.
 * Creates a document fragment with book preview elements and appends it to the DOM.
 * Also updates the "Show more" button state and text.
 */
export function updateBookList() {
    const fragment = document.createDocumentFragment(); // Create a fragment to hold book previews

    // Iterate over a slice of the matches array based on current page and items per page
    for (const book of matches.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE)) {
        fragment.appendChild(createBookPreview(book, authors)); // Append each book preview to the fragment
    }

    // Update the list items container with the new book previews
    const listItems = document.querySelector('[data-list-items]');
    listItems.innerHTML = ''; // Clear existing content
    listItems.appendChild(fragment); // Append the new fragment

    // Update the state and text of the "Show more" button
    const listButton = document.querySelector('[data-list-button]');
    listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1; // Disable button if no more books to load
    listButton.innerHTML = `    
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `;
}

/**
 * Increment the page number and update the book list.
 */
export function loadMoreBooks() {
    page += 1; // Move to the next page
    updateBookList(); // Update the list to show books for the new page
}

/**
 * Set a new array of books to display and reset pagination.
 * @param {Array} newMatches - Array of books to display.
 */
export function setMatches(newMatches) {
    matches = newMatches; // Update the matches array with new books
    page = 1; // Reset page to 1
    updateBookList(); // Update the book list to reflect the new set of books
}
