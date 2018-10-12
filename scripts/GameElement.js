class GameElement extends HTMLElement {
    constructor () {
        super ()

        this.step = step ? step : 50
        this.elem = document.createElement ( 'img' )
        this.elem.className = "picture"

        this.setPosition (
            this.hasAttribute ( 'position' ) ?
                position : this.getRandomCoordinates ()
        )

        this.getRelativePosition ()

        this.shadow = this.attachShadow ( { mode: 'open' } )
        let style = document.createElement ( 'style' )
        style.textContent = `
            .picture {
                display:block;
                position: fixed;
                transition: all 0.5s;
                height: 100px;
            }
        `
        this.shadow.appendChild ( style )
        this.shadow.appendChild ( this.elem )
    }
    getRandomCoordinates () {
        return [
            Math.floor (
                Math.random () * ( window.innerWidth - this.offsetWidth - 10 )
            ),
            Math.floor (
                Math.random () * ( window.innerHeight - this.offsetHeight - 10 )
            )
        ]
    }
    setImage ( imgURL ) {
        this.elem.src = imgURL
    }
    setPosition ( position ) {
        this.elem.style.transition = "all 0.5s"
        this.elem.style.left = position [0] + "px"
        this.elem.style.top = position [1] + "px"
    }
    getRelativePosition () {
        this.relativePosition = [
            this.elem.offsetLeft / window.innerWidth,
            this.elem.offsetTop / window.innerHeight
        ]
    }
    setHeight ( newHeight ) {
        this.elem.style.height = newHeight + "px"
    }
    resizeWindow ( event ) {
        //this.getRelativePosition ()
        this.setPosition (
            [
                Math.min (
                    this.relativePosition [0] * window.innerWidth,
                    window.innerWidth - this.elem.offsetWidth
                ),
                Math.min (
                    this.relativePosition [1] * window.innerHeight,
                    window.innerHeight - this.elem.offsetHeight
                )
            ]
        )
    }
}

GameElement.resizeWindow = function ( event ) {
    document.body.style.height = window.innerHeight + "px"
    for ( var elem of document.querySelectorAll ( 'furniture-element' ) ) {
        elem.resizeWindow ( event )
    }
}


customElements.define (
    'game-element',
    GameElement
)

class FurnitureElement extends GameElement {
    constructor () {
      super ()
      this.break = false
      this.elem.oncontextmenu = function ( event ) {
          event.preventDefault()
          var sel = document.createElement ( 'context-menu' )
          sel.setCallback (
              function ( event ) {
                 var step = event.target.value
                 var offset  = event.target.selectedIndex < 3 ? "offsetLeft" : "offsetTop"
                 var cssAttr = event.target.selectedIndex < 3 ? "left" : "top"
                 this.style [ cssAttr ] =
                      Number(this [ offset ]) + Number(step) + "px"
                 var el = document.querySelector( 'context-menu' )
                 el.parentNode.removeChild ( el )
              }.bind ( this )
          )
          sel.setOptions ([
            { text: "...", value: null },
            { text: "left", value: -50 },
            { text: "right", value: 50 },
            { text: "top", value: -50 },
            { text: "bottom", value: 50 },
          ])
          sel.setPosition ([
              Math.min ( this.offsetLeft + 70, window.innerWidth - 100 ),
              this.offsetTop + 70
          ])
          document.body.appendChild ( sel )
      }
    }
}

customElements.define (
    'furniture-element',
    FurnitureElement
)

window.addEventListener ( 'resize', function ( event ) {
    GameElement.resizeWindow ( event )
})
