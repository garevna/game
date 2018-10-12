class ContextMenuElement extends HTMLElement {
    constructor () {
        super ()
        var shadow = this.attachShadow ( { mode: 'open' } )

        this.elem = document.createElement ( 'select' )
        this.elem.className = 'selectElement'
        let style = document.createElement ( 'style' )
        style.textContent = `
            .selectElement {
                display: block;
                position: fixed;
                transform-origin: 100% 100%;
                top: 100px;
                left: 100px;
                border: dotted 1px orange;
                border-radius: 5px;
                box-shadow: inset 3px 3px 7px #00000090;
                background: #fa0;
                font-size: 16px;
                color: #fff;
                outline: none;
                padding: 5px 10px;
                z-index:1005;
            }
        `

        shadow.appendChild ( style )
        shadow.appendChild ( this.elem )
    }
    setOptions ( options ) {
        options.forEach (
          opt => {
            var el = addElem ( 'option', this.elem )
            //this.elem.appendChild ( el )
            el.innerText = opt.text
            el.value = opt.value
          }
        )
    }
    setPosition ( pos ) {
        this.elem.style.top = pos[1] + "px"
        this.elem.style.left = pos[0] + "px"
    }
    setCallback ( callback ) {
      this.elem.onchange = callback
    }
}

customElements.define (
    'context-menu',
    ContextMenuElement
)
