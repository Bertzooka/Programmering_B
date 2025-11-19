var currentPage = '#page5'
var videoButton, theVideo
var videoPlaying = true

//P5 setup() bliver kaldt EN gang før siden vises 
function setup() {
    console.log('P5 setup kaldt inshallah')

    //skift til current page 
    shiftPage(currentPage)


    //Videon
    theVideo = select('#theVideo')
    //Video control button
    videoButton = select('#videoButton')
    videoButton.mousePressed(() => {
        //console.log('button pressed')
        if (videoPlaying) {
            theVideo.pause()
            videoPlaying = false
        }else{
            theVideo.play()
            videoPlaying = true
        }
    })


    //Sæt menu op
    //Hent alle sider som et array
    var allPages = selectAll('.page')
    //Løb listen igennem en for en 
    allPages.map(
        page => {
            //Lav et nyt <a> element 
            var menuItem = createElement('a')
            //Sæt a taggets html til sidens titel
            menuItem.html(page.attribute('title'))
            //sæt eventlistener på a tagget
            menuItem.mousePressed(
                () => shiftPage('#' + page.attribute('id'))
            )
            //sæt a tagget ind i sidebaren
            select('.sidebar').child(menuItem)
        }
    )

}

function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}
