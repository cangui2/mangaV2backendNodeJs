
const express =require('express');
const bodyParser =require('body-parser');
const childProcess = require('child_process');
const CircularJSON = require('circular-json');
const bcrypt=require('bcryptjs')
const cors = require("cors");
const fs = require('fs');
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, '.env') });
// var privateKey = fs.readFileSync( '/usr/local/hestia/data/users/admin/ssl/serv.canguidev.fr.key' );
// var certificate = fs.readFileSync( '/usr/local/hestia/data/users/admin/ssl/serv.canguidev.fr.crt' );
// //
// //


// var credentials = {key: privateKey, cert: certificate};





// creation de express app

const app = express();
//const app = express(credentials);
app.use(cors());
// setup des port

const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended:true}))

app.use(bodyParser.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// database config

const dbConfig =require('./config/db.config');
const mongoose =require('mongoose')

mongoose.Promise=global.Promise;

// connect database

mongoose.connect('mongodb://localhost:27017/node-expres-api', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
  // Create a version file every time the database is updated
  db.on('open', () => {
    if (!fs.existsSync('versionDb.txt')) {
        fs.writeFileSync('versionDb.txt', JSON.stringify(new Date()));
    } else {
        fs.appendFileSync('versionDb.txt', JSON.stringify(new Date()));
    }
  });

  // Route to send the entire database
  app.get('/api/db', (req, res) => {
    const dumpPath = path.join(__dirname, 'dump');
    const dumpFile = path.join(dumpPath, 'node-expres-api.gz');
    const cmd = `mongodump --host localhost --port 27017 --db node-expres-api --gzip --archive=${dumpFile}`;

    childProcess.exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.download(dumpFile, 'database.gz', (err) => {
            if (err) throw err;
            fs.unlinkSync(dumpFile);
            fs.rmdirSync(dumpPath);
        });
    });
});
  // Route to send the version file
  app.get('/api/version', (req, res) => {
    res.sendFile(__dirname + '/versionDb.txt');
  });



// mongoose.connect(dbConfig.url).then((client)=>{
//     console.log("succes db connect")
//
// }).catch(err =>{
//     console.log("erreur connect")
//     process.exit();
// })
async function main() {
    //await mongoose.connect('mongodb://AdminSammy:GHT30k7!@localhost:27017/admin');
    //await mongoose.connect('mongodb://cangui:Canguilieme1@localhost:27017/admin');
   // await mongoose.connect('mongodb://localhost:27017/node-expres-api')
}
main()
.then((client)=>{
        console.log("succes db connect")
    })
.catch(err => console.log(err));
// require route


const userRoutes =require('./src/routes/user.routes')
const mangaRoutes =require('./src/routes/mangas.routes')
const episodeRoutes =require('./src/routes/episodes.route')
const downloadRoutes =require('./src/routes/download.route')
const bookRoutes =require('./src/routes/book.routes')
const magazineRoutes =require('./src/routes/magazine.routes')
const jwt = require("jsonwebtoken");
const User = require("./src/models/user.model");
const documentRoute =require('./src/routes/document.routes')
const linksRoute =require('./src/routes/links.routes')
const categoriesRoutes =require('./src/routes/categories.routes')
const urlsRoutes =require('./src/routes/urls.routes')


app.use('/api/users',userRoutes)
app.use('/api/manga',mangaRoutes)
app.use('/api/episode',episodeRoutes)
app.use('/api/download',downloadRoutes)
app.use('/api/book',bookRoutes)
app.use('/api/magazine',magazineRoutes)
app.use('/api/document',documentRoute)
app.use('/api/link',linksRoute)
app.use('/api/categories',categoriesRoutes)
app.use('/api/url',urlsRoutes)
app.get('/',(req,res) =>{
    res.json({"message":"hello world"});
} );

app.listen(port,()=>{
    console.log(`node server is listening on port ${port}`);
    console.log(process.env.TOKEN_KEY);
});