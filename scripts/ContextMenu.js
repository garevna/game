class ContextMenuElement extends HTMLElement {
    constructor () {
        super ()
        this.shadow = this.attachShadow ( { mode: 'open' } )
        this.wrapper = document.createElement ( 'figure' )
        this.shadow.appendChild ( this.wrapper )
        this.wrapper.onmouseleave = function ( event ) {
            let component = event.target.parentNode.host
            component.parentNode.removeChild ( component )
        }
        this.wrapper.className = "dropdownMenu"
        let style = document.createElement ( 'style' )
        style.textContent = `
            .dropdownMenu {
              position: absolute;
              color: #fdfeff;
              text-shadow: 2px 2px 4px #00000090;
              transition: all 0.5s;
              padding: 5px 10px;
              font-family: Roboto;
              background-color: #fa0;
              z-index: 1005;
            }
            .option {
              position: relative;
              font-family: Roboto, monospace, coursive;
              font-size: 20px;
              color: #fdfeff;
              text-shadow: 2px 2px 4px #00000090;
              transition: all 0.5s;
              cursor: pointer;
            }
            .option:hover {
              background-color: #970;
            }
        `
        this.shadow.appendChild ( style )
    }
    setOptions ( options ) {
        options.forEach (
            opt => {
              let el = addElem ( 'div', this.wrapper )
              el.innerHTML = opt.text
              el.className = "option"
              el.val = opt.value
            }
        )
    }
    setPosition ( pos ) {
        this.wrapper.style.top = pos[1] - 10 + "px"
        this.wrapper.style.left = pos[0] - 10 + "px"
    }
    setCallback ( callback ) {
        let dropdown = this
        Array.from ( this.shadow.children ).forEach (
            x => {
                if ( x.tagName !== 'FIGURE' ) return
                x.onclick = function ( event ) {
                    callback ( event.target.innerText, event.target.val )
                    dropdown.parentNode.removeChild ( dropdown )
                }
            }
        )
    }
}

customElements.define (
    'context-menu',
    ContextMenuElement
)
