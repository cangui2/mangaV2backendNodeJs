require("dotenv").config();
const bcrypt = require('bcryptjs')
const csvtojson = require("csvtojson");
const path = require("path");

const urlExists = require('url-exists');
const fs = require('fs');
const https = require('https');
const {log} = require("nodemon/lib/utils");
const args = process.argv.slice(2);

var compress_images = require('compress-images');

const CloudflareBypasser = require('cloudflare-bypasser');
let cf = new CloudflareBypasser();


exports.download = async (req, res) => {
    const manga = req.params.name;
    const episode = req.params.episode;
    const lastEpisode = req.params.lastepisode;
    console.log(manga);
    console.log(episode);
    console.log(lastEpisode)

    const dir = path.join(__dirname, '..', `../src/uploads/` + manga + `/`);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const dir2 = path.join(__dirname, '..', `../src/uploads/` + manga + `/episode` + episode + `/`);
    if (!fs.existsSync(dir2)) {
        fs.mkdirSync(dir2);
    }


    for (let i = 1; i < 54; i++) {
        let data = [];
        if (episode <= 9) {
            data = [
                'https://scansmangas.ws/scans/' + manga + '/0' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/0' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + '/0' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + '/0' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + '/' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + '/' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/0' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/0' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/00' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/00' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/00' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/00' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/0' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/0' + i + '.jpg',
                //'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + '/0' + i + '.png',
                //'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + '/0' + i + '.jpg',
                //'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + '/' + i + '.png',
                //'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + '/' + i + '.jpg',
                //'https://frscan.ws/uploads/manga/' + manga + '/chapters/000' + episode + '/0' + i + '.png',
                //'https://frscan.ws/uploads/manga/' + manga + '/chapters/000' + episode + '/0' + i + '.jpg',
                //'https://frscan.ws/uploads/manga/' + manga + '/chapters/000' + episode + '/00' + i + '.png',
                //'https://frscan.ws/uploads/manga/' + manga + '/chapters/000' + episode + '/00' + i + '.jpg',
                //'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + 'vf/00' + i + '.png',
                //'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + 'vf/00' + i + '.jpg',
                //'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + 'vf/0' + i + '.png',
                //'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + 'vf/0' + i + '.jpg',
            ]
        }
        if (episode >= 10 && episode <= 99) {
            data = [
                'https://scansmangas.ws/scans/' + manga + '/0' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/0' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + '/0' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + '/0' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + '/' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + '/' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/0' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/0' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/00' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/00' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/00' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/00' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/0' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/0' + i + '.jpg',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + '/' + i + '.png',
                //'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + '/' + i + '.jpg',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + '/0' + i + '.png',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + '/0' + i + '.jpg',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/00' + episode + '/0' + i + '.png',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/00' + episode + '/0' + i + '.jpg',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/00' + episode + '/00' + i + '.png',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/00' + episode + '/00' + i + '.jpg',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + 'vf/00' + i + '.png',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + 'vf/00' + i + '.jpg',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + 'vf/0' + i + '.png',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + 'vf/0' + i + '.jpg',
            ]
        }
        if (episode >= 100) {
            data = [
                //'https://scansmangas.ws/scans/' + manga + '/' + episode + '/' + i + '.jpg'
                'https://scansmangas.ws/scans/' + manga + '/0' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/0' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + '/0' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + '/0' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + '/' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + '/' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/0' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/0' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/00' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/00' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/00' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/00' + i + '.jpg',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/0' + i + '.png',
                'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/0' + i + '.jpg',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + '/' + i + '.png',
                //'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + '/' + i + '.jpg',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + '/0' + i + '.png',
               // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + '/0' + i + '.jpg',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/0' + episode + '/0' + i + '.png',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/0' + episode + '/0' + i + '.jpg',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/0' + episode + '/00' + i + '.png',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/0' + episode + '/00' + i + '.jpg',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + 'vf/00' + i + '.png',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + 'vf/00' + i + '.jpg',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + 'vf/0' + i + '.png',
                // 'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + 'vf/0' + i + '.jpg',

            ]
        }

        function sleep (time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        }

        data.forEach(element =>

                https.get(element, (res) => {
                    // Image will be stored at this path
                    console.log(res.statusCode)
                    console.log(element)
                    if (res.statusCode === 200) {
                        const paths = path.join(__dirname, '..', `../src/uploads/` + manga + `/episode` + episode + `/` + i + `.jpg`);
                        const filePath = fs.createWriteStream(paths);
                        res.pipe(filePath);
                        filePath.on('finish', () => {
                            filePath.close();
                            console.log('Download Completed');

                        })
                    }

                })




            // console.log(element)
            // setTimeout(function () {
            //     urlExists(element, function (err, exists) {
            //         console.log(element)
            //         console.log(err)
            //         if (exists) {
            //             https.get(element, (res) => {
            //                 // Image will be stored at this path
            //                 //console.log(res)
            //                 const paths = path.join(__dirname, '..', `../src/uploads/` + manga + `/episode` + episode + `/` + i + `.jpg`);
            //                 const filePath = fs.createWriteStream(paths);
            //                 res.pipe(filePath);
            //                 filePath.on('finish', () => {
            //                     filePath.close();
            //                     console.log('Download Completed');
            //
            //                 })
            //             })
            //
            //         }
            //
            //     })
            // }, 20000),


        )


    }
    res.send('download ok')

// http://frscan.ws/uploads/manga/my-hero-academia/chapters/0001/001.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/0001/002.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/0001/003.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/0001/004.png
//
//
//
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/01/01.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/01/02.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/01/03.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/01/04.jpg
//
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/1/001.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/1/002.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/1/004.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/1/003.png
//
//
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/00001/001.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/00001/002.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/00001/003.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/00001/004.jpg


}
exports.download2 = async (req, res) => {
    const code1 = req.params.code1;
    const code2 = req.params.code2;
    const episode=req.params.episode;
    const name = req.params.name;


    const dir = path.join(__dirname, '..', `../src/uploads/` + name + `/`);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const dir2 = path.join(__dirname, '..', `../src/uploads/` + name + `/episode` + episode + `/`);
    if (!fs.existsSync(dir2)) {
        fs.mkdirSync(dir2);
    }


    for (let i = 1; i < 54; i++) {
        let data = [];
        if (i < 10) {
            data = [
                'https://stockage.manga-scantrad.net/manga_'+code1+'/'+code2+'/'+i+'.jpg',
                'https://stockage.manga-scantrad.net/manga_'+code1+'/'+code2+'/'+i+'.png',
                'https://stockage.manga-scantrad.net/manga_'+code1+'/'+code2+'/0'+i+'.jpg',
                'https://stockage.manga-scantrad.net/manga_'+code1+'/'+code2+'/0'+i+'.png',
            ]
        }

        if (i >= 10) {
            data = [
                'https://stockage.manga-scantrad.net/manga_'+code1+'/'+code2+'/'+i+'.jpg',
                'https://stockage.manga-scantrad.net/manga_'+code1+'/'+code2+'/'+i+'.png'

            ]
        }


        data.forEach(element =>

                https.get(element, (res) => {
                    // Image will be stored at this path
                    console.log(res.statusCode)
                    console.log(element)
                    if (res.statusCode === 200) {
                        const paths = path.join(__dirname, '..', `../src/uploads/` + name + `/episode` + episode + `/` + i + `.jpg`);
                        const filePath = fs.createWriteStream(paths);
                        res.pipe(filePath);
                        filePath.on('finish', () => {
                            filePath.close();
                            console.log('Download Completed');

                        })
                    }

                })




            // console.log(element)
            // setTimeout(function () {
            //     urlExists(element, function (err, exists) {
            //         console.log(element)
            //         console.log(err)
            //         if (exists) {
            //             https.get(element, (res) => {
            //                 // Image will be stored at this path
            //                 //console.log(res)
            //                 const paths = path.join(__dirname, '..', `../src/uploads/` + manga + `/episode` + episode + `/` + i + `.jpg`);
            //                 const filePath = fs.createWriteStream(paths);
            //                 res.pipe(filePath);
            //                 filePath.on('finish', () => {
            //                     filePath.close();
            //                     console.log('Download Completed');
            //
            //                 })
            //             })
            //
            //         }
            //
            //     })
            // }, 20000),


        )


    }
    res.send('download ok')

// http://frscan.ws/uploads/manga/my-hero-academia/chapters/0001/001.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/0001/002.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/0001/003.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/0001/004.png
//
//
//
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/01/01.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/01/02.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/01/03.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/01/04.jpg
//
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/1/001.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/1/002.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/1/004.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/1/003.png
//
//
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/00001/001.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/00001/002.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/00001/003.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/00001/004.jpg


}


exports.compress = (req, res) => {
    let name=req.params.name;
    let number=req.params.episode;
    const paths = path.join(__dirname, '..', "../src/uploads/"+name+"/episode"+number);
    const output = path.join(__dirname, '..', `/../src/uploads/`);
    const INPUT_path_to_your_images = paths + `/**/*.{jpg,JPG,jpeg,JPEG}`;
    const OUTPUT_path = paths + `/`;
    compress_images(
        INPUT_path_to_your_images,
        OUTPUT_path,
        {compress_force: false, statistic: true, autoupdate: true},
        false,
        {jpg: {engine: "webp", command: false}},
        {png: {engine: false, command: false}},
        {svg: {engine: false, command: false}},
        {gif: {engine: false, command: false}},
        function (err) {
            if (err === null) {
                //[jpg] ---to---> [jpg(jpegtran)] WARNING!!! autoupdate  - recommended to turn this off, it's not needed here - autoupdate: false
                compress_images(
                    "src/img/**/*.{jpg,JPG,jpeg,JPEG}",
                    "build/img/",
                    {compress_force: false, statistic: true, autoupdate: false},
                    false,
                    {jpg: {engine: "jpegtran", command: false}},
                    {png: {engine: false, command: false}},
                    {svg: {engine: false, command: false}},
                    {gif: {engine: false, command: false}},
                    function () {
                    }
                );
            } else {
                console.error(err);
            }
        }
    );
    res.send('compress ok')
}

exports.remove = (req, res) => {

    const manga = req.params.name;
    const episode = req.params.episode;
    const lastEpisode = req.params.lastepisode;

    function* sequenceGenerator() {
        let currVal = this.minVal;
        while (currVal <= this.maxVal) yield currVal++;
    }

    let obj = {minVal: 1, maxVal: 60},
        arr;
    obj[Symbol.iterator] = sequenceGenerator;
    let data = [...obj];
    //console.log(data);

    for (let i = 1; i < episode; i++) {
        console.log('la')
        data.map(x =>
// delete file named 'sample.txt'

            fs.unlink(path.join(__dirname, '..', `../src/uploads/` + manga + `/episode` + i + `/0` + x + `.jpg`), function (err) {
                console.log(path.join(__dirname, '..', `../src/uploads/` + manga + `/episode` + i + `/0` + x + `.jpg`))
                console.log('File deleted!');
                if (err) {
                    fs.unlink(path.join(__dirname, '..', `../src/uploads/` + manga + `/episode` + i + `/` + x + `.jpg`), function (err) {
                        if (err) {
                            console.log('no files')
                        }
                        ;
                        // if no error, file has been deleted successfully
                        console.log(path.join(__dirname, '..', `../src/uploads/` + manga + `/episode` + i + `/` + x + `.jpg`))

                        console.log('File deleted!');
                    });
                }
                ;
                // if no error, file has been deleted successfully
                console.log('File deleted!');
                console.log(path.join(__dirname, '..', `../src/uploads/` + manga + `/episode` + i + `/0` + x + `.jpg`))
            }));
    }
    res.send('supprimer ok')

}
exports.checkIsExiste = async (req, res) => {
    const manga = req.params.name;
    const episode = req.params.episode;
    console.log(manga);
    console.log(episode);
    let data = [];
    if (episode) {
        data = [
            // 'https://scansmangas.ws/scans/' + manga + '/0' + 1 + '.png',
            // 'https://scansmangas.ws/scans/' + manga + '/0' + 1 + '.jpg',
            // 'https://scansmangas.ws/scans/' + manga + '/' + 1 + '.png',
            // 'https://scansmangas.ws/scans/' + manga + '/' + 1 + '.jpg',
            // 'https://scansmangas.ws/scans/' + manga + '/' + episode + '/0' + 1 + '.png',
            // 'https://scansmangas.ws/scans/' + manga + '/' + episode + '/0' + 1 + '.jpg',
            // 'https://scansmangas.ws/scans/' + manga + '/' + episode + '/' + 1 + '.png',
            // 'https://scansmangas.ws/scans/' + manga + '/' + episode + '/' + 1 + '.jpg',
            // 'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/0' + 1 + '.png',
            // 'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/0' + 1 + '.jpg',
            // 'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/00' + 1 + '.png',
            // 'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/00' + 1 + '.jpg',
            // 'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/00' + 1 + '.png',
            // 'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/00' + 1 + '.jpg',
            // 'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/0' + 1 + '.png',
            // 'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/0' + 1 + '.jpg',
            'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + '/0' + 1 + '.png',
            'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + '/0' + 1 + '.jpg',
            'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + '/' + 1 + '.png',
            'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + '/' + 1 + '.jpg',
            'https://frscan.ws/uploads/manga/' + manga + '/chapters/000' + episode + '/0' + 1 + '.png',
            'https://frscan.ws/uploads/manga/' + manga + '/chapters/000' + episode + '/0' + 1 + '.jpg',
            'https://frscan.ws/uploads/manga/' + manga + '/chapters/000' + episode + '/00' + 1 + '.png',
            'https://frscan.ws/uploads/manga/' + manga + '/chapters/000' + episode + '/00' + 1 + '.jpg',
            'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + 'vf/00' + 1 + '.png',
            'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + 'vf/00' + 1 + '.jpg',
            'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + 'vf/0' + 1 + '.png',
            'https://frscan.ws/uploads/manga/' + manga + '/chapters/' + episode + 'vf/0' + 1 + '.jpg',
        ]
    }
    let check = false
    for (const element of data) {
        console.log(element)
        setTimeout(async () => {
            await urlExists(element, function (err, exists) {
                    console.log(err),
                        console.log(exists)

                    if (exists) {
                        // Image will be stored at this path
                        check = true;
                        return res.sendStatus(200)
                        //break;


                    }

                }
            );
        }, 1000);


    }



// http://frscan.ws/uploads/manga/my-hero-academia/chapters/0001/001.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/0001/002.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/0001/003.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/0001/004.png
//
//
//
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/01/01.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/01/02.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/01/03.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/01/04.jpg
//
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/1/001.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/1/002.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/1/004.png
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/1/003.png
//
//
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/00001/001.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/00001/002.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/00001/003.jpg
// http://frscan.ws/uploads/manga/my-hero-academia/chapters/00001/004.jpg


}