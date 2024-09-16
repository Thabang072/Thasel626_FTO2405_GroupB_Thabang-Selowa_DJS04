// utils.js

/**
 * Create a book preview element.
 * @param {Object} book - Book object.
 * @param {Object} authors - Authors object.
 * @returns {HTMLElement} - Book preview button element.
 */
export function createBookPreview(book, authors) {
    const element = document.createElement('button');
    element.classList.add('preview');
    element.setAttribute('data-preview', book.id);

    element.innerHTML = `
        <img class="preview__image" src="${book.image}" />
        <div class="preview__info">
            <h3 class="preview__title">${book.title}</h3>
            <div class="preview__author">${authors[book.author]}</div>
        </div>
    `;

    return element;
}

/**
 * Populate a select element with options.
 * @param {HTMLElement} select - Select element to populate.
 * @param {Object} options - Options object where keys are values and values are display texts.
 */
export function populateSelect(select, options) {
    const bookFile = document.createDocumentFragment();
    for (const [value, text] of Object.entries(options)) {
        const option = document.createElement('option');
        option.value = value;
        option.innerText = text;
        bookFile.appendChild(option);
    }
    select.appendChild(bookFile);
}


