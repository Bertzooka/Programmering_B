//This script takes a csv file and cleans the data into a javascript array

var table
//cleanData will hold the javascript objects we intend to use
var cleanData = [] 

const csvFile = './assets/GaltonFamilies.csv'
//Vi vil kun bruge tusind rækker - da vil skal tegne dem på skærmen
const maxRows = 1000

function preload(){
    //loadTable er en p5 funktion der henter en tabel fra en fil
    table = loadTable(csvFile, 'csv', 'header')
    console.log('Data tabel loaded', table)
}

//Kan jeg lave en algoritme som kan forudsige et barns voksne højde ud fra
//deres forældres højde?
function setup(){
    console.log("Rå data kolonner:", table.columns)
    var xValue = "father"
    var yValue = "mother" 
    var labelValue = "childHeight"   
    
    //table.rows er et array med alle data objekterne i
    //map returnerer et nyt array med de dimensioner vi gerne vil have
    cleanData = table.rows.map( row =>{
        var x = row.get(xValue)
        var y = row.get(yValue)
        var returnObj = {
            [xValue]: Number(x),
            [yValue]: Number(y)
        }
        if(labelValue){
            returnObj.label = Number(row.get(labelValue))
        }
        return returnObj
        //Vi filtrerer så lige arrayet så vi er sikre på alle de dimensioner vi skal bruge er udfyldt
    })
    cleanData = cleanData.filter( row =>{
        //valid er true - hvis begge felter er et TAL
        var valid = !isNaN(row[xValue]) && !isNaN(row[yValue])
        //MEN vi skal også tjekke om label er noget HVIS vi har en label
        if(labelValue && !row.label){
            valid = false
        }
        return valid
    })

    //bland data vilkårligt
    cleanData = shuffle(cleanData)

    cleanData = cleanData.slice(0, maxRows)

    console.log('Så har vi renset data:', cleanData)

    select('#status').html(`Vi har nu renset data og skåret det ned til maks 1000 rækker - kig i konsollen! <3`)
}


