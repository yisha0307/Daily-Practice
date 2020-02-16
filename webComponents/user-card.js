class UserCard extends HTMLElement {
    constructor () {
        super()
        var image = document.createElement('img')
        image.src = 'https://semantic-ui.com/images/avatar2/large/kristy.png'
        image.classList.add('image')

        var container = document.createElement('div')
        container.classList.add('container')

        var name = document.createElement('p')
        name.classList.add('name')
        name.innerText = 'User Name'

        var email = document.createElement('p')
        email.classList.add('email')
        email.innerText='yourmail@some-email.com'

        var button = document.createElement('button')
        button.classList.add('button')
        button.innerText = 'Follow'

        container.append(name, email, button)
        this.append(image, container)
    }
}
window.customElements.define('user-card', UserCard)