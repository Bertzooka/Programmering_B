//lav en ref til din collection
var testRef = db.collection('test')
console.log('oprettet reference til test')

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    //NU KOMMER DE GENIALE: ONSNAPSHOT
    testRef.onSnapshot(snap =>{
        console.log('Modtog snap', snap.size)
        snap.map( doc => {
            var d = doc.data()
            console.log(d)
        })
    })
}

