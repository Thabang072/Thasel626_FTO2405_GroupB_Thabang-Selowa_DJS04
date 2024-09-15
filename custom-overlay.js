class CustomOverlay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    static get observedAttributes() {
        return ['open'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
        const isOpen = this.getAttribute('open') === 'true';

        this.shadowRoot.innerHTML = `
            <style>
                .overlay {
                    display: ${isOpen ? 'block' : 'none'};
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .overlay-content {
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    width: 80%;
                    max-width: 600px;
                }
            </style>
            <div class="overlay">
                <div class="overlay-content">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

customElements.define('custom-overlay', CustomOverlay);
