class NumInput extends HTMLElement {
    constructor () {
        super()
        const shadowRoot = this.attachShadow({mode: 'open'})
        let styles = `
            .num-input-content {margin: 10px 0;}
            .num-input {text-align: center;}
        `;
        shadowRoot.innerHTML = `
        <style>${styles}</style>
        <div class='num-input-content'>
        <button class='decrease'>-</button>
        <input type='text' class='num-input' value=${this.dataset.value}>
        <button class='increase'>+</button>
        <span>price: <b class='price'>${this.dataset.price}</b></span>
        </div>
        `
        this.numInput = this.shadowRoot.querySelector('.num-input')
        this.price = this.shadowRoot.querySelector('.price')

        let decrease = this.shadowRoot.querySelector('.decrease')
        let increase = this.shadowRoot.querySelector('.increase')

        decrease.addEventListener('click', this.decrease.bind(this), false)
        increase.addEventListener('click', this.increase.bind(this), false)
    }

    decrease () {
        this.dataset.value--
        this.update()
    }
    increase () {
        this.dataset.value++
        this.update()
    }
    update () {
        this.numInput.setAttribute('value', this.dataset.value)
        let allPrice = this.dataset.value * this.dataset.price
        this.price.innerHTML = allPrice

        this.dataset.out = JSON.stringify({
            value: this.dataset.value,
            price: allPrice
        })
    }
}

window.customElements.define('num-input', NumInput)