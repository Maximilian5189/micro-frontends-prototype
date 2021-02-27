class ThirdComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = 'Third component (web component) loaded.'
  }

}
window.customElements.define("third-component", ThirdComponent);