let things = null
let personages = null
let badPersonage = null

let step = 50

async function start () {
    let promise_1 = fetch ( "./data/things.json" )
        .then ( response => response.json()
          .then ( response => things = response )
        )
    let promise_2 = fetch ( "./data/personages.json" )
        .then ( response => response.json()
          .then ( response => personages = response )
        )
    await Promise.all ( [ promise_1, promise_2 ] )
    showFone ()
}

selectedURL = null

document.body.className = "fone"
document.body.style.height = window.innerHeight + "px"
function addElem ( tagName, container ) {
    container = container && container.nodeType === 1 ?
                container : document.body
    return container.appendChild (
         document.createElement ( tagName )
    )
}

let furniture = []

start ()

function showFone () {
    things.forEach ( ( item, index ) => {
        furniture.push ( ( function () {
            let elem = addElem ( 'furniture-element' )
            elem.setImage ( item.url )
            elem.setHeight ( item.height )
            elem.title = item.title
            elem.relativePosition = item.position
            elem.elem.style = `
                position: fixed;
                left: ${item.position[0]*window.innerWidth}px;
                top: ${item.position[1]*window.innerHeight}px;
                height: ${item.height}px;
            `
            return elem
        })( item ) )
    })

    // badPersonage = document.createElement ( 'bad-boy' )
    // document.body.appendChild ( badPersonage )
    // badPersonage.setImage ( personages [5] )
    // badPersonage.setHeight ( 200 )
    // badPersonage.getRelativePosition ()
}

window.addEventListener ( 'resize', function ( event ) {
    var persons = Array.from (
        document.querySelectorAll ( 'bad-boy' )
    )
    persons.forEach (
      x => x.resizeWin ( event )
    )
    var persons = Array.from (
        document.querySelectorAll ( 'good-boy' )
    )
    persons.forEach (
      x => x.resizeWin ( event )
    )
})
