import { populateSelect } from '../utils.js';
import { genres, authors } from '../data.js';

/**
 * Update dropdown menus for genres and authors by populating them with options.
 * The genres and authors are loaded from the imported data and set in their respective dropdowns.
 */
export function updateDropdowns() {
    // Select the genre dropdown element from the DOM
    const genreSelect = document.querySelector('[data-search-genres]');
    // Populate the genre dropdown with options, including a default 'All Genres' option
    populateSelect(genreSelect, { 'any': 'All Genres', ...genres });

    // Select the author dropdown element from the DOM
    const authorSelect = document.querySelector('[data-search-authors]');
    // Populate the author dropdown with options, including a default 'All Authors' option
    populateSelect(authorSelect, { 'any': 'All Authors', ...authors });
}

