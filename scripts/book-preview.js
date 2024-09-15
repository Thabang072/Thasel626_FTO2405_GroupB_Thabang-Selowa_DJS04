import { books, authors } from '../data.js';

/**
 * Display detailed information about a book in a dedicated overlay.
 * Finds the book by its ID and updates the relevant DOM elements with the book's details.
 * @param {string} bookId - The ID of the book to display.
 */
export function showBookDetails(bookId) {
    // Find the book with the matching ID from the books array
    const book = books.find(b => b.id === bookId);
    
    if (book) { // Proceed if the book is found
        // Open the book details overlay
        document.querySelector('[data-list-active]').open = true;
        // Set the source of the blurred background image and main image to the book's image
        document.querySelector('[data-list-blur]').src = book.image;
        document.querySelector('[data-list-image]').src = book.image;
        // Set the book title in the details overlay
        document.querySelector('[data-list-title]').innerText = book.title;
        // Set the book subtitle with author name and publication year
        document.querySelector('[data-list-subtitle]').innerText = `${authors[book.author]} (${new Date(book.published).getFullYear()})`;
        // Set the book description in the details overlay
        document.querySelector('[data-list-description]').innerText = book.description;
    }
}
