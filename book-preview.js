class BookPreview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['title', 'author', 'image', 'description'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
        const title = this.getAttribute('title');
        const author = this.getAttribute('author');
        const image = this.getAttribute('image');
        const description = this.getAttribute('description');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                    cursor: pointer;
                }
                .preview {
                    padding: 16px;
                }
                .preview img {
                    width: 100%;
                    height: auto;
                }
                .preview h3 {
                    margin: 0;
                    font-size: 1.2em;
                }
                .preview p {
                    margin: 0;
                    color: #555;
                }
            </style>
            <div class="preview">
                <img src="${image}" alt="${title}">
                <h3>${title}</h3>
                <p>${author}</p>
                <p>${description}</p>
            </div>
        `;
    }
}

customElements.define('book-preview', BookPreview);
