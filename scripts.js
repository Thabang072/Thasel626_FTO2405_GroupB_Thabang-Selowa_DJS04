// Import necessary modules and functions from different scripts.
import { books } from './data.js'; // Imports book data from 'data.js'.
import { updateDropdowns } from './scripts/genre-author-filter.js'; // Imports function to update genre and author dropdowns.
import { updateTheme, handleSettingsFormSubmit } from './scripts/settings.js'; // Imports functions to update the theme and handle settings form submission.
import { setupOverlayEventListeners } from './scripts/overlay-management.js'; // Imports function to setup event listeners for overlay management.
import { handleSearch } from './scripts/book-search.js'; // Imports function to handle search functionality.
import { loadMoreBooks, setMatches } from './scripts/book-list.js'; // Imports functions to load more books and set book matches.
import { showBookDetails } from './scripts/book-preview.js'; // Imports function to show details of a selected book.

// Wait until the DOM content is fully loaded before executing the script.
document.addEventListener('DOMContentLoaded', () => {
    // Initialize dropdowns (e.g., genre and author filters) when the page is loaded.
    updateDropdowns();
    
    // Set the theme for the application based on user preferences or default settings.
    updateTheme();
    
    // Setup event listeners for any overlay elements (e.g., modals or popups).
    setupOverlayEventListeners();
    
    // Attach event handler to the search form submission.
    document.querySelector('[data-search-form]').addEventListener('submit', handleSearch);
    
    // Attach event handler to the settings form submission.
    document.querySelector('[data-settings-form]').addEventListener('submit', handleSettingsFormSubmit);
    
    // Attach event handler to the button for loading more books.
    document.querySelector('[data-list-button]').addEventListener('click', loadMoreBooks);
    
    // Attach event handler to the book list container to handle clicks on book preview elements.
    document.querySelector('[data-list-items]').addEventListener('click', (event) => {
        // Convert the event's path or composed path into an array of nodes.
        const pathArray = Array.from(event.path || event.composedPath());
        
        // Iterate through the path to find a node with a 'data-preview' attribute.
        for (const node of pathArray) {
            // Check if the node has a 'data-preview' attribute and show book details if it does.
            if (node?.dataset?.preview) {
                showBookDetails(node.dataset.preview);
                break; // Stop iterating once the book details are shown.
            }
        }
    });

    // Initialize the book list with all books.
    setMatches(books); 
});
