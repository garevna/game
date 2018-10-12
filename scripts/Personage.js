class PersonageElement extends GameElement {
    constructor () {
      super ()
      this.mode = 'stop'
      this.elem.style.zIndex = "1000"
      this.oncontextmenu = function ( event ) {
          event.preventDefault ()
          var sel = document.createElement ( 'context-menu' )
          document.body.appendChild ( sel )
          sel.setCallback (
              function ( event ) {
                 this.mode = event.target.value
                 this.mode === 'break' ? this.breakAll () :
                     this.mode === 'shit' ? this.showMustGoOn (
                        this.character === 'good' ? "0" : "90"
                     ) : ( this.timeout ? clearTimeout ( this.timeout ) : null )
                 var el = document.querySelector( 'context-menu' )
                 el.parentNode.removeChild ( el )
              }.bind ( this )
          )
          sel.setOptions ([
            { text: "...", value: 'stop' },
            { text: "break", value: 'break' },
            { text: "shit", value: 'shit' },
            { text: "stop", value: 'stop' }
          ])
          sel.setPosition ([
              Math.min ( this.elem.offsetLeft + 50, window.innerWidth - 100 ),
              this.elem.offsetTop + 50
          ])
      }
    }
}

PersonageElement.prototype.shits = []

PersonageElement.prototype.walk = function ( newCoordinates ) {
    var dist = Math.max (
        Math.abs ( newCoordinates [0] - this.elem.offsetLeft ),
        Math.abs ( newCoordinates [1] - this.elem.offsetTop )
    )
    this.elem.style.transition = "all " + ( dist / this.step ) + "s"
    this.elem.style.left = newCoordinates [0] + "px"
    this.elem.style.top = newCoordinates [1] + "px"
    return dist / this.step
}

PersonageElement.prototype.getObjects = function ( deg ) {
    var objects = Array.from (
        document.querySelectorAll ( 'furniture-element' )
    )
    return this.character !== 'good' ?
            objects.filter ( x => !x.break ) :
            objects.filter ( x => x.break )
}

PersonageElement.prototype.breakAll = async function () {
    var deg = this.character === 'good' ? 0 : 90
    var self = this
    var objects = this.getObjects ()
    while ( objects.length > 0 && this.mode === 'break' ) {
        var obj = objects.shift ()
        await new Promise (
            function ( resolve, reject ) {
               var t = self.walk ( [
                    obj.elem.offsetLeft + obj.elem.offsetWidth - 50,
                    obj.elem.offsetTop + obj.elem.offsetHeight - self.elem.offsetHeight
               ] )
               self.timeout = setTimeout ( resolve, t * 1000 )
            }
        ).then ( function () {
            self.getRelativePosition ()
            obj.elem.style.transform = `rotate(${deg}deg)`
            obj.break = self.character === 'good' ? false : true
        })
        objects = this.getObjects ()
    }
}

PersonageElement.prototype.shitURL = "https://pngimg.com/uploads/poop/poop_PNG48.png"

PersonageElement.prototype.resizeWin = function ( event ) {
    this.mode = 'stop'
    this.setPosition ( [
        this.relativePosition [0] * window.innerWidth,
        this.relativePosition [1] * window.innerHeight
    ])
}

customElements.define (
    'personage-element',
    PersonageElement
)

class BadPersonage extends PersonageElement {
    constructor () {
      super ()
      this.character = 'bad'
    }
}

BadPersonage.prototype.showMustGoOn = async function () {
    var self = this
    while ( self.mode === 'shit' ) {
        var pos = self.getRandomCoordinates ()
        await new Promise (
            function ( resolve, reject ) {
                var t = self.walk ( pos )
                self.timeout = setTimeout ( resolve, t * 1000 )
            }
        )
        .then ( function () {
            self.getRelativePosition ()
            self.shits.push (
                ( function () {
                    var shit = document.body.appendChild (
                        document.createElement ( "img" )
                    )
                    shit.src = self.shitURL
                    shit.style = `
                        position: fixed;
                        left: ${pos[0] + self.elem.offsetWidth * 0.5}px;
                        top: ${pos[1] + self.elem.offsetHeight * 0.5}px;
                        width: 50px;
                    `
                    return shit
                }) ()
                )
        })
    }
}

customElements.define (
    'bad-boy',
    BadPersonage
)

class HeroPersonage extends PersonageElement {
    constructor () {
        super ()
        this.character = 'good'
    }
}

HeroPersonage.prototype.showMustGoOn = async function () {
    var self = this
    while ( self.mode === 'shit' && self.shits.length > 0 ) {
        var obj = self.shits.shift()
        await new Promise (
              function ( resolve, reject ) {
                  var t = self.walk ( [
                        obj.offsetLeft - 100,
                        obj.offsetTop - 100
                    ] )
                  self.timeout = setTimeout ( resolve, t * 1000 )
              }
        )
        .then ( function () {
            self.getRelativePosition ()
            obj.parentNode.removeChild ( obj )
        })
    }
}

customElements.define (
    'good-boy',
    HeroPersonage
)
