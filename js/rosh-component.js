class RoshComponent extends HTMLElement {
    connectedCallback() {
        const path = this.getAttribute('src');

        if (!path) {
            console.error('src attribute not found');
            return;
        }

        fetch(path)
            .then(res => {
                if (!res.ok) throw new Error('File not uploaded.: ' + path);
                return res.text();
            })
            .then(data => {
                this.innerHTML = data;
                // Notify that the component is loaded
                document.dispatchEvent(new CustomEvent('component-loaded', {
                    detail: { path: path, element: this }
                }));
            })
            .catch(err => console.error(err));
    }
}

customElements.define('rosh-component', RoshComponent);
