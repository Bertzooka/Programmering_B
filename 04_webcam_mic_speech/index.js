var currentPage = '#page1'
var capture

//P5 setup() bliver kaldt en gang føre siden vises
function setup() {
    console.log('P5 setup kaldt')

    //skift til current page
    shiftPage(currentPage)

    capture = createCapture(VIDEO, {flipped:false})
    capture.size(720,468)
    select('#page1').child(capture)


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





