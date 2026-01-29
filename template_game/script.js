//We select the gamecontainer from thml - and save it in a var called game_container
var game_container = document.querySelector('#game-container')
var points_display = document.querySelector('#points-display')
var timeout = 1000
var points = 0
//The function takes a asta div element as arguments, and removes it from its parent container
function KillAsta(asta) {
    game_container.removeChild(asta)
    points += 5
    points_display.textContent = points
}

function TimeoutAsta(asta) {
    
    game_container.removeChild(asta)
    points -= 2
    points_display.textContent = points
}

//setInterval is a javascript function that runs a function every X miliseconds
setInterval(()=>{
    //Vi laver et img element i variablen new_asta
var new_asta = document.createElement('img')
var top = Math.random() * 90
var left = Math.random() * 90
new_asta.style = `left: ${left}%; top: ${top}%;`
//We add a source to the new img
new_asta.src = 'assets/asta1.png'
//We add a classname to it so we can style it
new_asta.className = 'asta'
//We put the new img element inside the game container
game_container.appendChild(new_asta)
//
new_asta.addEventListener('click', () => { KillAsta(new_asta)})
setTimeout(() => { TimeoutAsta(new_asta)}, timeout)
}, 1250)