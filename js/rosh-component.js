class RoshComponent extends HTMLElement {
    connectedCallback() {
        const path = this.getAttribute('src');

        if (!path) {
            console.error('src attribute topilmadi');
            return;
        }

        fetch(path)
            .then(res => {
                if (!res.ok) throw new Error('File yuklanmadi');
                return res.text();
            })
            .then(data => this.innerHTML = data)
            .catch(err => console.error(err));
    }
}

customElements.define('rosh-component', RoshComponent);
