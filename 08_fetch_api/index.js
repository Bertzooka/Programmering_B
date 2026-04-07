var currentPage = '#page1'
var deck

var player = {
    cards: [],
    total: 0
}

var dealer = {
    cards: [],
    total: 0
}

var state = "begin"

// P5 setup() bliver kaldt EN gang før siden vises 
function setup() {
    console.log('P5 setup kaldt')

    shiftPage(currentPage)
    getDeck()

    select('#playerDrawBtn').mousePressed(() => drawCard("player"))
    select('#playerStandBtn').mousePressed(() => drawCard("dealer"))
    select('#restartBtn').mousePressed(restart)

    var allPages = selectAll('.page')
    allPages.map(
        page => {
            var menuItem = createElement('a')
            menuItem.html(page.attribute('title'))
            menuItem.mousePressed(
                () => shiftPage('#' + page.attribute('id'))
            )
            select('.sidebar').child(menuItem)
        }
    )
}

async function getDeck() {
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        if (response.ok) {
            const data = await response.json()
            deck = data
            drawCard()
        }
    } catch (error) {
        console.log(error)
    }
}

async function drawCard(newState) {
    if (newState) {
        state = newState
    }

    // 1. Spilleren taber (Bust)
    if (state == "playerLose") {
        select('#result').html("You went bust! Dealer wins.")
        shiftPage('#page2')
        return
    }

    // 2. Dealerens tur og 3. Afgør vinderen
    if (state == "dealer") {
        // Vis skjult kort
        dealer.cards[0].hidden = false
        showCards()

        // Dealer trækker kort indtil summen er mindst 17
        while (dealer.total < 17) {
            var newCard = await getOneCard()
            dealer.cards.push(newCard)
            dealer.total += returnCardValue(newCard)
            
            // Tjek for es-logik for dealeren også
            if (dealer.total > 21) {
                dealer.cards.forEach(c => {
                    if (c.value === "ACE") {
                        c.value = "ACE-USED"
                        dealer.total -= 10
                    }
                })
            }
            showCards()
        }

        // Afgør vinderen
        let message = ""
        if (dealer.total > 21) {
            message = "Dealer busts! You win!"
        } else if (player.total > dealer.total) {
            message = "You win!"
        } else if (dealer.total > player.total) {
            message = "Dealer wins!"
        } else {
            message = "It's a draw!"
        }

        select('#result').html(message)
        shiftPage('#page2')
        return
    }

    if (state == "player") {
        var newCard = await getOneCard()
        player.cards.push(newCard)
        player.total += returnCardValue(newCard)

        // 4. Ret es-logikken (Spiller)
        if (player.total > 21) {
            player.cards.forEach(c => {
                if (c.value === "ACE" && player.total > 21) {
                    c.value = "ACE-USED"
                    player.total -= 10
                }
            })
        }

        showCards()

        if (player.total > 21) {
            state = "playerLose"
            drawCard()
        } else if (player.total == 21) {
            state = "dealer"
            drawCard()
        }
    }

    if (state == "begin") {
        // Træk startkort
        var p1 = await getOneCard()
        var p2 = await getOneCard()
        player.cards.push(p1, p2)
        player.total = returnCardValue(p1) + returnCardValue(p2)

        var d1 = await getOneCard()
        var d2 = await getOneCard()
        d1.hidden = true
        dealer.cards.push(d1, d2)
        dealer.total = returnCardValue(d1) + returnCardValue(d2)

        // Tjek for start-Blackjack
        if (dealer.total == 21 || player.total == 21) {
            state = "dealer"
            drawCard()
        } else {
            state = "player"
            showCards()
        }
    }
}

function restart() {
    player.cards = []
    player.total = 0
    dealer.cards = []
    dealer.total = 0
    state = "begin"
    shiftPage('#page1')
    drawCard()
}

function showCards() {
    select('#player .cards').html('')
    player.cards.map((c, i) => {
        var img = createImg(c.image)
        img.style('transform', `translate(${i * 40}px, ${i * 40}px)`)
        select('#player .cards').child(img)
    })
    
    select('#dealer .cards').html('')
    dealer.cards.map((c, i) => {
        var img = (c.hidden) ? createImg('https://deckofcardsapi.com/static/img/back.png') : createImg(c.image)
        img.style('transform', `translate(${i * 40}px, ${i * 40}px)`)
        select('#dealer .cards').child(img)
    })
}

function returnCardValue(card) {
    if (isNaN(card.value)) {
        if (card.value == "ACE" || card.value == "ACE-USED") {
            return 11
        } else {
            return 10
        }
    } else {
        return Number(card.value)
    }
}

async function getOneCard() {
    try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        const data = await response.json()
        return data.cards[0]
    } catch (error) {
        console.log("Error", error)
    }
}

function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}