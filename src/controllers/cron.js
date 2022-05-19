/*
Connexion base
 */
var mongoose = require("mongoose");
const Manga = require("../models/manga.model.js");
const path = require("path");
const fs = require("fs");
const urlExists = require("url-exists");
const https = require("https");
mongoose.connect('mongodb://AdminSammy:GHT30k7!@localhost:27017/admin').then((client)=>{
    console.log("succes db connect")

}).catch(err =>{

    console.log(err)
    console.log("erreur connect")
    process.exit();
})

/*
Recherche des mangas
 */
let allManga;
let dataManga =[];
let manga;
let episode;
let i = 1;
let dataDl=[];






function fetchManga() {
    Manga.find()
        .then(mangas => {
            allManga=mangas;
            console.log(mangas);

        }).catch(err => {

        console.log("error"+ err)

    });
}
function tab() {
    allManga.forEach(element =>{
            //console.log(element)
     const dir=path.join(__dirname,'..',`../src/uploads/` +element.name)
       // console.log(dir)
            fs.readdir(dir, (err, files) => {
                //console.log(files.length);
                dataManga.push({
                    'name':element.name,
                    'lastEpisode':files.length
                })

            });

    },

    );


}
function checkSite() {
    let site1=[]
    dataManga.forEach(element =>{
        site1.push('https://www.frscan.cc/uploads/manga/' + element.name + '/chapters/' + element.lastEpisode + '/0' + i + '.png')
        site1.push('https://www.frscan.cc/uploads/manga/' + element.name + '/chapters/' + element.lastEpisode + '/0' + i + '.jpg')
        site1.push('https://www.frscan.cc/uploads/manga/' + element.name + '/chapters/' + element.lastEpisode + '/' + i + '.png')
        site1.push('https://www.frscan.cc/uploads/manga/' + element.name + '/chapters/' + element.lastEpisode + '/' + i + '.jpg')
        site1.push('https://www.frscan.cc/uploads/manga/' + element.name + '/chapters/000' + element.lastEpisode + '/0' + i + '.png')
        site1.push('https://www.frscan.cc/uploads/manga/' + element.name + '/chapters/000' + element.lastEpisode + '/0' + i + '.jpg')
        site1.push('https://www.frscan.cc/uploads/manga/' + element.name + '/chapters/000' + element.lastEpisode + '/00' + i + '.png')
        site1.push('https://www.frscan.cc/uploads/manga/' + element.name + '/chapters/000' + element.lastEpisode + '/00' + i + '.jpg')
        site1.push('https://www.frscan.cc/uploads/manga/' + element.name + '/chapters/' + element.lastEpisode + 'vf/00' + i + '.png')
        site1.push('https://www.frscan.cc/uploads/manga/' + element.name + '/chapters/' + element.lastEpisode + 'vf/00' + i + '.jpg')
        site1.push('https://www.frscan.cc/uploads/manga/' + element.name + '/chapters/' + element.lastEpisode + 'vf/0' + i + '.png')
        site1.push('https://www.frscan.cc/uploads/manga/' + element.name + '/chapters/' + element.lastEpisode + 'vf/0' + i + '.jpg')
    })
    let site2 =[]
    dataManga.forEach(element =>{
        site2.push('https://scansmangas.ws/scans/' + element.name + '/' + element.lastEpisode + '/0' + i + '.png')
        site2.push('https://scansmangas.ws/scans/' + element.name + '/' + element.lastEpisode + '/0' + i + '.jpg')
        site2.push('https://scansmangas.ws/scans/' + element.name + '/' + element.lastEpisode + '/' + i + '.png')
        site2.push('https://scansmangas.ws/scans/' + element.name + '/' + element.lastEpisode + '/' + i + '.jpg')
        site2.push('https://scansmangas.ws/scans/' + element.name + '/000' + element.lastEpisode + '/0' + i + '.png')
        site2.push('https://scansmangas.ws/scans/' + element.name + '/000' + element.lastEpisode + '/0' + i + '.jpg')
        site2.push('https://scansmangas.ws/scans/' + element.name + '/000' + element.lastEpisode + '/00' + i + '.png')
        site2.push('https://scansmangas.ws/scans/' + element.name + '/000' + element.lastEpisode + '/00' + i + '.jpg')
        site2.push('https://scansmangas.ws/scans/' + element.name + '/' + element.lastEpisode + 'vf/00' + i + '.png')
        site2.push('https://scansmangas.ws/scans/' + element.name + '/' + element.lastEpisode + 'vf/00' + i + '.jpg')
        site2.push('https://scansmangas.ws/scans/' + element.name + '/' + element.lastEpisode + 'vf/0' + i + '.png')
        site2.push('https://scansmangas.ws/scans/' + element.name + '/' + element.lastEpisode + 'vf/0' + i + '.jpg')
    })
    // console.log(site1);
    // console.log(site2);
    for (let y = 1; y < dataManga.length; y++) {
        site1.forEach(element =>
            urlExists(element, function (err, exists) {
                 console.log(element)
                if (exists) {
                    dataDl.push({
                        'name':element.name,
                        'dispo':'1'
                    })

                }else {
                    dataDl.push({
                        'name':element.name,
                        'dispo':'0'
                    })

                    site2.forEach(element =>
                        // console.log(element)
                        urlExists(element, function (err, exists) {
                             console.log(element)
                            if (exists) {
                                dataDl.push({
                                    'name':element.name,
                                    'dispo':'2'
                                })

                            }

                        })
                    )
                }

            })
        )
    }
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log(JSON.stringify(dataDl))
            console.log("Number3 is done");
            resolve(20);
        },500);
    });

    //console.log(dataDl);


}


//
//
// async function oneByOne() {
//     const number1 = await fetchManga();
//     const number2 = await tab();
//
// }
// oneByOne().then(r => console.log(r));
//
//

function printNumber1() {
    fetchManga();
    return new Promise((resolve,reject) => {
        setTimeout(() => {

            console.log("Number1 is done");
            resolve(10);
        },1000);
    });
}

function printNumber2() {
    tab();

    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log(JSON.stringify(dataManga))
            console.log("Number2 is done");
            resolve(20);
        },55000);
    });
}
function printNumber3() {
    console.log('function 3')
checkSite()
    .then(r => {
        return r
    });


}
async function oneByOne() {
    const number1 = await printNumber1();
    const number2 = await printNumber2();
    const number3 = await printNumber3();
}
oneByOne().then(r => console.log(r));

//process.exit();

/*
Recherche du dernier episode
 */

/*
Recherche de la disponibilité
 */

/*Telechargement
 */

/*
Compression
 */

/*
Suppression
 */

/*
Ajout en bdd
 */

/*
envoie de la notification a l app
 */