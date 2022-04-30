require("dotenv").config();
const bcrypt=require('bcryptjs')
const csvtojson = require("csvtojson");
const path = require("path");

const urlExists = require('url-exists');
const fs = require('fs');
const https = require('https');
const {log} = require("nodemon/lib/utils");
const args = process.argv.slice(2);

var compress_images = require('compress-images');
const paths =path.join(__dirname,'..',`../src/uploads/`);
const output =path.join(__dirname,'..',`/../src/uploads/compress`);
const INPUT_path_to_your_images = paths+`/**/*.{jpg,JPG,jpeg,JPEG}`;
const OUTPUT_path = paths+`/compress/`;


exports.download = (req, res) => {
    const manga = req.params.name;
    const episode = req.params.episode;
    const lastEpisode = req.params.lastepisode;
    console.log(manga);
    console.log(episode);
    console.log(lastEpisode)

    const dir=path.join(__dirname ,'..',`../src/uploads/` + manga + `/`);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    const dir2=path.join(__dirname,'..',`../src/uploads/` + manga + `/episode`+episode+`/`);
    if (!fs.existsSync(dir2)){
        fs.mkdirSync(dir2);
    }


    for (let i = 1; i < 54; i++) {
        let data = [];
        if (episode <= 9) {
            data = [
                // 'https://scansmangas.ws/scans/' + manga + '/0' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/0' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + '/0' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + '/0' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + '/' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + '/' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/0' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/0' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/00' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/00' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/00' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/00' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/0' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/0' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + '/0' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + '/0' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + '/' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + '/' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/000' + episode + '/0' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/000' + episode + '/0' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/000' + episode + '/00' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/000' + episode + '/00' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + 'vf/00' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + 'vf/00' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + 'vf/0' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + 'vf/0' + i + '.jpg',
            ]
        }
        if (episode >= 10 && episode <= 99) {
            data = [
                // 'https://scansmangas.ws/scans/' + manga + '/0' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/0' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + '/0' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + '/0' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + '/' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + '/' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/0' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/0' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/00' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/00' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/00' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/00' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/0' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/0' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + '/' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + '/' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + '/0' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + '/0' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/00' + episode + '/0' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/00' + episode + '/0' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/00' + episode + '/00' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/00' + episode + '/00' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + 'vf/00' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + 'vf/00' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + 'vf/0' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + 'vf/0' + i + '.jpg',
            ]
        }
        if (episode >= 100) {
            data = [
                // 'https://scansmangas.ws/scans/' + manga + '/0' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/0' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + '/0' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + '/0' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + '/' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + '/' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/0' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/0' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/00' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/000' + episode + '/00' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/00' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/00' + i + '.jpg',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/0' + i + '.png',
                // 'https://scansmangas.ws/scans/' + manga + '/' + episode + 'vf/0' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + '/' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + '/' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + '/0' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + '/0' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/0' + episode + '/0' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/0' + episode + '/0' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/0' + episode + '/00' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/0' + episode + '/00' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + 'vf/00' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + 'vf/00' + i + '.jpg',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + 'vf/0' + i + '.png',
                'https://www.frscan.cc/uploads/manga/' + manga + '/chapters/' + episode + 'vf/0' + i + '.jpg',

            ]
        }

        data.forEach(element =>
           // console.log(element)
            urlExists(element, function (err, exists) {
               // console.log(element)
                if (exists) {
                    https.get(element, (res) => {
                        // Image will be stored at this path
                        //console.log(res)
                        const paths =path.join(__dirname,'..',`../src/uploads/` + manga + `/episode`+episode+`/`+ i + `.jpg`);
                        const filePath = fs.createWriteStream(paths);
                        res.pipe(filePath);
                        filePath.on('finish', () => {
                            filePath.close();
                            console.log('Download Completed');

                        })
                    })

                }

            })
        )



    }
    res.send('download ok')

// http://www.frscan.cc/uploads/manga/my-hero-academia/chapters/0001/001.png
// http://www.frscan.cc/uploads/manga/my-hero-academia/chapters/0001/002.png
// http://www.frscan.cc/uploads/manga/my-hero-academia/chapters/0001/003.png
// http://www.frscan.cc/uploads/manga/my-hero-academia/chapters/0001/004.png
//
//
//
// http://www.frscan.cc/uploads/manga/my-hero-academia/chapters/01/01.jpg
// http://www.frscan.cc/uploads/manga/my-hero-academia/chapters/01/02.jpg
// http://www.frscan.cc/uploads/manga/my-hero-academia/chapters/01/03.jpg
// http://www.frscan.cc/uploads/manga/my-hero-academia/chapters/01/04.jpg
//
// http://www.frscan.cc/uploads/manga/my-hero-academia/chapters/1/001.png
// http://www.frscan.cc/uploads/manga/my-hero-academia/chapters/1/002.png
// http://www.frscan.cc/uploads/manga/my-hero-academia/chapters/1/004.png
// http://www.frscan.cc/uploads/manga/my-hero-academia/chapters/1/003.png
//
//
// http://www.frscan.cc/uploads/manga/my-hero-academia/chapters/00001/001.jpg
// http://www.frscan.cc/uploads/manga/my-hero-academia/chapters/00001/002.jpg
// http://www.frscan.cc/uploads/manga/my-hero-academia/chapters/00001/003.jpg
// http://www.frscan.cc/uploads/manga/my-hero-academia/chapters/00001/004.jpg




}

exports.compress=(req,res)=>{
    compress_images(
        INPUT_path_to_your_images,
        OUTPUT_path,
        { compress_force: false, statistic: true, autoupdate: true },
        false,
        { jpg: { engine: "webp", command: false } },
        { png: { engine: false, command: false } },
        { svg: { engine: false, command: false } },
        { gif: { engine: false, command: false } },
        function (err) {
            if (err === null) {
                //[jpg] ---to---> [jpg(jpegtran)] WARNING!!! autoupdate  - recommended to turn this off, it's not needed here - autoupdate: false
                compress_images(
                    "src/img/**/*.{jpg,JPG,jpeg,JPEG}",
                    "build/img/",
                    { compress_force: false, statistic: true, autoupdate: false },
                    false,
                    { jpg: { engine: "jpegtran", command: false } },
                    { png: { engine: false, command: false } },
                    { svg: { engine: false, command: false } },
                    { gif: { engine: false, command: false } },
                    function () {}
                );
            } else {
                console.error(err);
            }
        }
    );
    res.send('compress ok')
}

exports.remove=(req,res)=>{

    const manga = req.params.name;
    const episode = req.params.episode;
    const lastEpisode = req.params.lastepisode;
    function* sequenceGenerator() {
        let currVal = this.minVal;
        while(currVal <= this.maxVal) yield currVal++;
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
                        };
                        // if no error, file has been deleted successfully
                        console.log(path.join(__dirname, '..', `../src/uploads/` + manga + `/episode` + i + `/` + x + `.jpg`))

                        console.log('File deleted!');
                    });
                };
                // if no error, file has been deleted successfully
                console.log('File deleted!');
                console.log(path.join(__dirname, '..', `../src/uploads/` + manga + `/episode` + i + `/0` + x + `.jpg`))
            }));
    }
    res.send('supprimer ok')

}