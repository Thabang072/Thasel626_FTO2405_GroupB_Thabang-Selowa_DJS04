import { populateSelect } from '../utils.js';
import { genres, authors } from '../data.js';

export function updateDropdowns() {
    const genreSelect = document.querySelector('[data-search-genres]');
    populateSelect(genreSelect, { 'any': 'All Genres', ...genres });

    const authorSelect = document.querySelector('[data-search-authors]');
    populateSelect(authorSelect, { 'any': 'All Authors', ...authors });
}
