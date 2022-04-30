var compress_images = require('compress-images');
const path = require("path");
const args = process.argv.slice(2)
const manga = args[0];
const episode = args[1]

const paths =path.join(__dirname,'..',`/public/upload/`);
const output =path.join(__dirname,'..',`/public/upload/compress`);
const INPUT_path_to_your_images = paths+`/**/*.{jpg,JPG,jpeg,JPEG}`;
const OUTPUT_path = paths+`/compress/`;
// We will be compressing images [jpg] with two algorithms, [webp] and [jpg];

//[jpg] ---to---> [webp]
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

