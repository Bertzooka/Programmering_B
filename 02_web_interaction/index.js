var currentPage = '#page5'

//P5 setup() bliver kaldt en gang føre siden vises
function setup() {
    console.log('P5 setup kaldt')

    //skift til current page
    shiftPage(currentPage)


    //Buttons
    var theButton = select('#theButton')
    //Sæt en event listener op på knappen
    theButton.mousePressed(() => {
        if (confirm('Er du sikker?')) {
            theButton.html('I was clicked')
        } else {
            theButton.html('I am not sure who I am')
        }
    })

    //P5 button
    var myButton = createButton('Button created with javascript')
    //Læg den ind i side 5
    select('#page5').child(myButton)
    //Lav en eventlistener
    myButton.mousePressed(()=>{
        shiftPage('#page1')
    })

    //Drop Downs
    var theDropdown = select('#theDropdown')
    //Event listener: changed
    theDropdown.changed(() => {
        select('#page2').style('background-color', theDropdown.value())
    })

    //Input field - DOM BINDING
    var theInput = select('#theInput')
    var theInputButton = select ('#theInputButton')
    var theInputTitle = select ('#theInputTitle')
    theInputButton.mousePressed(()=>{
        //Giv mig det som står i input feltet ind i variablen title
        var title = theInput.value()
        theInput.hide()
        theInputButton.hide()
        theInputTitle.html(title)
    })

//Check boxes
var ck = select('#ck1')
ck.changed(()=>{
    ck.hide()
    select('#ck1').hide()
    select('rebel').html("DØD OVER OPRØRET")
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

function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}





