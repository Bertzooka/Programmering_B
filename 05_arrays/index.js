var currentPage ='#page3'
var listeInput, listeHeader, listeButton, listeContainer
var removeListe 

function preload(){
    
}



//P5 setup() bliver kaldt en gang føre siden vises
function setup(){
    console.log('P5 setup kaldt')

    //skift til current page
    shiftPage(currentPage)

    var klassen2T = ["Balder", "Asta", "Viggo", "Bertam", "Tobias", "Selma", "Toke", "Victor"]

    //Hvor mange elementer?
    console.log(klassen2T.length, "elementer i listen")
    //sådan bruger vi et element
    console.log(klassen2T[0], 'er den første i listen')
    //sådam lægger vi nye elementer til
    klassen2T.push("Molle")
    klassen2T.push("Nikolaj")
    klassen2T.push("Mads")
    klassen2T.push("Lisbet")
    klassen2T.push("Asbjørn")
    klassen2T.push("Julemanden")
    klassen2T.push("Gilbert")
    klassen2T.push("Ludvig")
    klassen2T.push("Silas")
    klassen2T.push("Milas")
    klassen2T.push("John")
    klassen2T.push("Sebastian")
    klassen2T.push("Flóki")
    klassen2T.push("Amadeus")

    console.log(klassen2T)

    // Sådan looper vi i igennem et array:
    klassen2T.map((e)=>{
        console.log('Denne person i klassen hedder ' + e)
       

    })




    //page2 . basics
    //DOM BINDING
    listeButton = select('#listeButton')
    listeHeader = select('#listeHeader')
    listeInput = select('#listeInput')
    listeContainer = select('#listeContainer')
    //der et input felt en container og en knap til at tiføje nye elementer på siden
    createList(klassen2T, listeContainer, 'elev')






    //page 3
    //DOM binding
    removeListe = select('#removeListe')
    //make a list 
    var elements = ["hest", "dog", "hamster", "php", "cangaroo", "fuck", "subway sandwich", "group rat", "bird"]
    // call the geneic function that makes new html elements
    createList(elements, removeListe, 'RapeVictim', rape)

    // sørge for at indsætte Astrid når der trykkes på knappen
    listeButton.mousePressed( ()=> {
        if(listeInput.value() != 'Sebastian'){
            confirm('Du er blevet til ingentin g')
        }else{
            klassen2T.push(listeInput.value())
            createElever(klassen2T, listeContainer)
            listeContainer.elt.scrollTop = listeContainer.elt.scrollHeight
        }
        listeInput.value('')
        
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
                ()=>shiftPage('#' + page.attribute('id'))      
            )
            // sæt a tagget ind i sidebaren
            select('.sidebar').child(menuItem)

        }
    )
}

function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}
//tager to argumenter - hvilken liste den skal gøre noget med og hvor den skal gøre af resultatet
function createList(list, dest, className, action){
    //først søger vi for at der er tomt i contaieren
    dest.html('')
    list.map( e => {
        var div = createDiv(e)
        div.addClass(className)
        //Hvis der er en action i argumenterne - så gør noget
        if(action){div.mousePressed(()=>{action()})}
        dest.child(div)        
    })

}

function rape(){
    console.log('Rape was called - Sebastians fault')
}