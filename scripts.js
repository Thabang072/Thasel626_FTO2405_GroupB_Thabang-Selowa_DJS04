// Import utility functions from the utils.js file
import { createBookPreview, populateSelect } from './utils.js';
// Import data and constants from the data.js file
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

// Initialize the current page and the matches array with all books
let page = 1;
let matches = books;



// Function to update the list of books displayed based on the current page and matches, create a document fragment to hold the book elements
function updateBookList() {
    
    const starting = document.createDocumentFragment();

    // Add book previews for the current page to the fragment
    for (const book of matches.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE)) {
        starting.appendChild(createBookPreview(book, authors)); // Use the imported function to create book previews
    }

    // Get the list items container and clear its current content
    const listItems = document.querySelector('[data-list-items]');
    listItems.innerHTML = '';
    // Append the new book previews to the list items container
    listItems.appendChild(starting);

    // Get the list button and update its disabled state and text based on remaining books
    const listButton = document.querySelector('[data-list-button]');
    listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;
    listButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `;
}

// Function to update dropdown menus for genres and authors
function updateDropdowns() {
    // Get the genre select element and populate it with genre options
    const genreSelect = document.querySelector('[data-search-genres]');
    populateSelect(genreSelect, { 'any': 'All Genres', ...genres });

    // Get the author select element and populate it with author options
    const authorSelect = document.querySelector('[data-search-authors]');
    populateSelect(authorSelect, { 'any': 'All Authors', ...authors });
}

// Function to update the theme based on the user's color scheme preference
function updateTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Set theme to 'night' and adjust color properties for dark mode
        document.querySelector('[data-settings-theme]').value = 'night';
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        // Set theme to 'day' and adjust color properties for light mode
        document.querySelector('[data-settings-theme]').value = 'day';
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
}

// Function to set up event listeners for various UI elements
function setupEventListeners() {
    // Close the search overlay when the cancel button is clicked
    document.querySelector('[data-search-cancel]').addEventListener('click', () => {
        document.querySelector('[data-search-overlay]').open = false;
    });

    // Close the settings overlay when the cancel button is clicked
    document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
        document.querySelector('[data-settings-overlay]').open = false;
    });

    // Open the search overlay when the search header button is clicked
    document.querySelector('[data-header-search]').addEventListener('click', () => {
        document.querySelector('[data-search-overlay]').open = true;
        document.querySelector('[data-search-title]').focus(); // Focus on the search input field
    });

    // Open the settings overlay when the settings header button is clicked
    document.querySelector('[data-header-settings]').addEventListener('click', () => {
        document.querySelector('[data-settings-overlay]').open = true;
    });

    // Close the book list overlay when the close button is clicked
    document.querySelector('[data-list-close]').addEventListener('click', () => {
        document.querySelector('[data-list-active]').open = false;
    });

    // Handle form submission for theme settings
    document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const formData = new FormData(event.target);
        const { theme } = Object.fromEntries(formData);

        // Set theme colors based on user selection
        if (theme === 'night') {
            
            document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
            document.documentElement.style.setProperty('--color-light', '10, 10, 20');
        } else {
            document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
            document.documentElement.style.setProperty('--color-light', '255, 255, 255');
            
        }
        
        // Close the settings overlay after applying the theme
        document.querySelector('[data-settings-overlay]').open = false;
    });

    // Handle form submission for search filters that Prevent the default form submission behavior
    document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const filters = Object.fromEntries(formData); // Get the form data as an object
        const result = [];

        // Filter books based on the search criteria result true if 'any' is selected  exit the loop if genre match is found
        for (const book of books) {
            let genreMatch = filters.genre === 'any';  

            for (const singleGenre of book.genres) {
                if (genreMatch) break; 
                if (singleGenre === filters.genre) { genreMatch = true; }
            }

            // Check if the book matches all the filters and add the book to the result if it matches
            if (
                (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
                (filters.author === 'any' || book.author === filters.author) && 
                genreMatch
            ) {
                result.push(book);
            }
        }

        // Update the matches and page number
        page = 1;
        matches = result;

        // Show or hide the no results message and update the book list Scroll to the top smoothly
        document.querySelector('[data-list-message]').classList.toggle('list__message_show', result.length < 1);
        updateBookList();
        window.scrollTo({top: 0, behavior: 'smooth'}); 
        document.querySelector('[data-search-overlay]').open = false; // Close the search overlay
    });

    // Add funcrion clicking the 'Show more' button to load more books
    document.querySelector('[data-list-button]').addEventListener('click', () => {
        page += 1;
        updateBookList(); // Update the book list with the new page
    });

    // clicking on a book preview to show detailed view  the path of the event
    document.querySelector('[data-list-items]').addEventListener('click', (event) => {
        const pathArray = Array.from(event.path || event.composedPath());  
        let dataList = null;

        // Find the clicked book preview and break the loop if book is found
        for (const node of pathArray) {
            if (dataList) break;  

            if (node?.dataset?.preview) {
                dataList = books.find(book => book.id === node.dataset.preview);
            }
        }

        // Update the detailed view with the selected book's information
        if (dataList) {
            document.querySelector('[data-list-active]').open = true;
            document.querySelector('[data-list-blur]').src = dataList.image;
            document.querySelector('[data-list-image]').src = dataList.image;
            document.querySelector('[data-list-title]').innerText = dataList.title;
            document.querySelector('[data-list-subtitle]').innerText = `${authors[dataList.author]} (${new Date(dataList.published).getFullYear()})`;
            document.querySelector('[data-list-description]').innerText = dataList.description;
        }
    });
}

// Initialize the application when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    updateDropdowns(); // Populate dropdowns with genres and authors
    updateTheme(); // Apply the initial theme based on user preference
    updateBookList(); // Load and display the initial list of books
    setupEventListeners(); // Set up event listeners for UI interactions
});


