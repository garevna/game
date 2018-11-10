class PersonageElement extends GameElement {
	constructor () {
		super ()
		this.mode = 'stop'
		this.elem.style.zIndex = "1000"
		this.oncontextmenu = function ( event ) {
			event.preventDefault ()
			let sel = document.createElement ( 'context-menu' )
			document.body.appendChild ( sel )
			sel.setCallback (
				function ( id, val ) {
					this.mode = id
					eval ( val )
				}.bind ( this )
			)
			sel.setOptions ( [
				{ text: "...", value: null },
				{ text: "break", value: 'this.breakAll()' },
				{ text: "shit", value: `this.showMustGoOn ( this.character === 'good' ? "0" : "90" )` },
				{ text: "stop", value: `this.timeout ? clearTimeout ( this.timeout ) : null` }
			] )
			sel.setPosition (
				[
					Math.min ( event.clientX, window.innerWidth - 100 ),
					Math.min ( event.clientY, window.innerHeight - 150 )
				]
			)
		}
	}
}

PersonageElement.prototype.shits = [];

PersonageElement.prototype.walk = function ( newCoordinates ) {
	let dist = Math.max (
		Math.abs ( newCoordinates [ 0 ] - this.elem.offsetLeft ),
		Math.abs ( newCoordinates [ 1 ] - this.elem.offsetTop )
	);
	this.elem.style.transition = "all " + ( dist / this.step ) + "s";
	this.elem.style.left = newCoordinates [ 0 ] + "px";
	this.elem.style.top = newCoordinates [ 1 ] + "px";
	return dist / this.step
};

PersonageElement.prototype.getObjects = function ( deg ) {
	let objects = Array.from (
		document.querySelectorAll ( 'furniture-element' )
	)
	return this.character !== 'good' ?
		objects.filter ( x => !x.break ) :
		objects.filter ( x => x.break )
}

PersonageElement.prototype.breakAll = async function () {
	let deg = this.character === 'good' ? 0 : 90
	let self = this
	let objects = this.getObjects ()
	while ( objects.length > 0 && this.mode === 'break' ) {
		let obj = objects.shift ()
		await new Promise (
			function ( resolve, reject ) {
				let t = self.walk ( [
					obj.elem.offsetLeft + obj.elem.offsetWidth - 50,
					obj.elem.offsetTop + obj.elem.offsetHeight - self.elem.offsetHeight
				] )
				self.timeout = setTimeout ( resolve, t * 1000 )
			}
		).then ( function () {
			self.getRelativePosition ()
			obj.elem.style.transform = `rotate(${deg}deg)`
			obj.break = self.character === 'good' ? false : true
		} )
		objects = this.getObjects ()
	}
}

PersonageElement.prototype.shitURL = "https://pngimg.com/uploads/poop/poop_PNG48.png"

PersonageElement.prototype.resizeWin = function ( event ) {
	this.mode = 'stop'
	this.setPosition ( [
		this.relativePosition [ 0 ] * window.innerWidth,
		this.relativePosition [ 1 ] * window.innerHeight
	] )
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
	let self = this
	while ( self.mode === 'shit' ) {
		let pos = self.getRandomCoordinates ()
		await new Promise (
			function ( resolve, reject ) {
				let t = self.walk ( pos );
				self.timeout = setTimeout ( resolve, t * 1000 )
			}
		)
			.then ( function () {
				self.getRelativePosition ();
				self.shits.push (
					( function () {
						let shit = document.body.appendChild (
							document.createElement ( "img" )
						);
						shit.src = self.shitURL;
						shit.style = `
                        position: fixed;
                        left: ${pos[ 0 ] + self.elem.offsetWidth * 0.5}px;
                        top: ${pos[ 1 ] + self.elem.offsetHeight * 0.5}px;
                        width: 50px;
                    `;
						return shit
					} ) ()
				);
				let good = document.querySelector ( 'good-boy' );
				good ? good.dispatchEvent ( new Event ( 'shit' ) ) : console.log ( 'У вас нету убирателя какашек' )
			} )
	}
};

customElements.define (
	'bad-boy',
	BadPersonage
)

class HeroPersonage extends PersonageElement {
	constructor () {
		super ()
		this.character = 'good';
		this.addEventListener ( 'shit', function () {
			this.mode = 'shit';
			this.showMustGoOn ();
			console.log ( 'Tra la la' )
		} );
	}
}

HeroPersonage.prototype.showMustGoOn = async function () {
	let self = this
	while ( self.mode === 'shit' && self.shits.length > 0 ) {
		let obj = self.shits.shift ()
		await new Promise (
			function ( resolve, reject ) {
				let t = self.walk ( [
					obj.offsetLeft - 100,
					obj.offsetTop - 100
				] )
				self.timeout = setTimeout ( resolve, t * 1000 )
			}
		)
			.then ( function () {
				self.getRelativePosition ()
				obj.parentNode.removeChild ( obj )
			} )
	}
}

customElements.define (
	'good-boy',
	HeroPersonage
)