import { books } from './data.js';
import { updateDropdowns } from './components/genre-author-filter.js';
import { updateTheme, handleSettingsFormSubmit } from './components/settings.js';
import { setupOverlayEventListeners } from './components/overlay-management.js';
import { handleSearch } from './components/book-search.js';
import { loadMoreBooks, setMatches } from './components/book-list.js';
import { showBookDetails } from './components/book-preview.js';

document.addEventListener('DOMContentLoaded', () => {
    updateDropdowns();
    updateTheme();
    setupOverlayEventListeners();
    
    document.querySelector('[data-search-form]').addEventListener('submit', handleSearch);
    document.querySelector('[data-settings-form]').addEventListener('submit', handleSettingsFormSubmit);
    document.querySelector('[data-list-button]').addEventListener('click', loadMoreBooks);
    document.querySelector('[data-list-items]').addEventListener('click', (event) => {
        const pathArray = Array.from(event.path || event.composedPath());
        for (const node of pathArray) {
            if (node?.dataset?.preview) {
                showBookDetails(node.dataset.preview);
                break;
            }
        }
    });

    setMatches(books); // Initialize with all books
});
