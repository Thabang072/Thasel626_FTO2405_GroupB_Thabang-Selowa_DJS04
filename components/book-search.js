import { books } from '../data.js';
import { updateBookList } from './book-list.js';

export function handleSearch(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
        let genreMatch = filters.genre === 'any';  
        
        for (const singleGenre of book.genres) {
            if (genreMatch) break; 
            if (singleGenre === filters.genre) { genreMatch = true; }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book);
        }
    }

    document.querySelector('[data-list-message]').classList.toggle('list__message_show', result.length < 1);
    updateBookList(result);
    window.scrollTo({top: 0, behavior: 'smooth'}); 
    document.querySelector('[data-search-overlay]').open = false;
}
