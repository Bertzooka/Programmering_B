var currentPage = '#page1'

// Array med filnavne på vores billeder - hvert billede står der to gange så vi kan få par
var images = [
    "assets/bambirhino.jpg", "assets/cropcoptub.jpg", "assets/dogtiger.jpg", "assets/elephorse.jpg",
    "assets/foxmockingbird.jpg", "assets/hamsterfinger.jpg", "assets/owlbear.jpg", "assets/rhinelephant.jpg",
    "assets/sealhorse.jpg", "assets/zeacat.jpg",
    "assets/bambirhino.jpg", "assets/cropcoptub.jpg", "assets/dogtiger.jpg", "assets/elephorse.jpg",
    "assets/foxmockingbird.jpg", "assets/hamsterfinger.jpg", "assets/owlbear.jpg", "assets/rhinelephant.jpg",
    "assets/sealhorse.jpg", "assets/zeacat.jpg"
]

var flippedCards = []

function setup() {
    noCanvas() // Vi bruger HTML elementer, så vi behøver ikke et canvas   
    shiftPage(currentPage) // Skift til startsiden
    select('#startGame').mousePressed(() => {
        setupGame()
    })
}

function setupGame() {
    //Lad os blande kortene
    images = shuffle(images)
    //console.log(images)
    images.map(i => {
        //DOM binding til spil containeren
        var container = select('#gameContainer')
        //Opret spillekort, læg dem ind i game containers og put et billede ind i div'erne
        var card = createElement('div').addClass('card').attribute('img-source', i).parent(container).child(createImg(i)).mousePressed(() => {
            if (flippedCards.length < 2) {
                flippedCards.push(card)
                card.addClass('show')
                //Hvis der er to kort i flippedcards, skal vi tjekke match
                if (flippedCards.length == 2) {
                    if (flippedCards[0].attribute('img-source') === flippedCards[1].attribute('img-source')) {
                        flippedCards[0].addClass('checked')
                        flippedCards[1].addClass('checked')
                    }else{
                        setTimeout(()=>{
                            flippedCards[0].removeClass('show')
                            flippedCards[1].removeClass('show')
                            flippedCards = []
                        },2000)
                       
                    }

                }
            }

        })

    })
    shiftPage('#page2')
}

// Funktion til at skifte mellem sider (skjuler den gamle, viser den nye)
function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}
