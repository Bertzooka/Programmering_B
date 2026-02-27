var currentPage = '#page1'
var deck
var player = {
    cards: [],
    total:0
}

var dealer = {
    cards: [],
    total:0
}

var state = "begin"

//P5 setup() bliver kaldt en gang føre siden vises
function setup() {
    console.log('P5 setup kaldt')

    //skift til current page
    shiftPage(currentPage)

    //fetch er en asynkron funktion som kan hente data ude i byen

    getDeck()

    select('#getCardBtn').mousePressed(()=>{
        getCard()
    })

    //Sæt menu op
    // hent alle sider som et array
    var allPages = selectAll('.page')
    // Løb listen igennem en for en
    allPages.map(
        page => {
            // Lav et nyt <a> element 
            var menuItem = createElement('a')
            menuItem.html(page.attribute('title'))
            // sæt eventlistener på a tagget
            menuItem.mousePressed(
                () => shiftPage('#' + page.attribute('id'))
            )
            // sæt a tagget ind i sidebaren
            select('.sidebar').child(menuItem)

        }
    )
}
//Async står for asyncronous - vi ved ikke præcist hvor længe det tager at køre funktionen
async function getDeck() {
    try {
        //Fetch kan hente data fra en server ude i byen
        const respone = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        //response objektet kommer tilbage fra serveren - og HVIS response.ok er true, kan vi hente data
        console.log("Response objektet:", response)
        if (response.ok) {
            const data = await response.json()
            console.log("Data vi får tilbage:", data)
            deck = data
            drawCard()
        }
    } catch (error) {
        console.log(error)
    }
}

function drawCard(){
    if(state == "begin"){
        var cardOne = getOneCard()
        player.cards.push(cardOne)
        var cardTwo = getOneCard()
        player.cards.push(cardTwo)
        var dealerCardOne = getOneCard()
        dealer.cards.push(dealerCardOne)
        var dealerCardTwo = getOneCard()
        dealer.cards.push(dealerCardTwo)
        showCards()
    }
    if(state == "dealer"){

    }
    if(state = "player"){

    }
}

function showCards(){
    console.log("Show cards er klar med" +  player.cards, dealer.cards)
    select('#player .cards').html('')
    player.cards.map( (c, i) => {
        var img = createImg(c.image)
        img.style('transform', `translate(${i*40}px), ${i*40}px)`)
        select('#player .cards').child(img)
    })
}

async function getOneCard(){
        //Hent et kort
    var card
    try{
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        const data = await response.json()
        console.log("DrawCard kommer tilbage med et nyt kort" + data)
        return data.cards[0]
    } catch(error){
        console.log("Error catched", error)
    }
}

function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}