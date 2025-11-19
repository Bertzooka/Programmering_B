var currentPage = '#page1'
var videoButton, theVideo
var videoPlaying = true
var screenshot1 = './assets/screenshot1.jpg'
var dropdown = document.getElementById("theDropdown")
var page6 = document.getElementById("page6")

dropdown.onchange = function () {
    page6.style.backgroundImage = "url(" + dropdown.value + ")"
}


//P5 setup() bliver kaldt en gang føre siden vises
function setup() {
    console.log('P5 setup kaldt')

    //skift til current page
    shiftPage(currentPage)




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

 //Videon
    theVideo = select('#theVideo')

    //Video control button
    videoButton = select('#videoButton')
    videoButton.mousePressed(() => {
        console.log('button pressed')
        if (videoPlaying) {
            theVideo.pause()
            videoPlaying = false
        }else{
            theVideo.play()
            videoPlaying = true
        }
    })
}



function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}





