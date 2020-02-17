class HelloComponent extends HTMLElement {
    constructor () {
        super()
        let shadowRoot = this.attachShadow({mode: 'open'})
        let styles = `
        hello-web-components {color: red}
        h3 {font-weight: normal}
        `
        shadowRoot.innerHTML = `
        <style>${styles}</style>
        <h3>Hello Web Component</h3>
        `
    }
}

customElements.define('hello-web-components', HelloComponent)