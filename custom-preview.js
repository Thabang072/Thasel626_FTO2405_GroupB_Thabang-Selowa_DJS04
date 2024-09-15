class CustomDropdown extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    static get observedAttributes() {
        return ['options', 'label'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
        const options = JSON.parse(this.getAttribute('options') || '[]');
        const label = this.getAttribute('label');

        this.shadowRoot.innerHTML = `
            <style>
                select {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
            </style>
            <label>${label}</label>
            <select>
                ${options.map(option => `<option value="${option.value}">${option.text}</option>`).join('')}
            </select>
        `;
    }
}

customElements.define('custom-dropdown', CustomDropdown);
