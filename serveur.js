const express =require('express');
const bodyParser =require('body-parser');
require("dotenv").config();
const bcrypt=require('bcryptjs')
const cors = require("cors");
const fs = require('fs');
var privateKey = fs.readFileSync( '/opt/tinycp/domains/serv.canguidev.fr/ssl/ssl-letsencrypt.key' );
var certificate = fs.readFileSync( '/opt/tinycp/domains/serv.canguidev.fr/ssl/ssl-letsencrypt.crt' );
//
//


var credentials = {key: privateKey, cert: certificate};





// creation de express app

//const app = express();
const app = express(credentials);
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

// mongoose.connect(dbConfig.url).then((client)=>{
//     console.log("succes db connect")
//
// }).catch(err =>{
//     console.log("erreur connect")
//     process.exit();
// })
async function main() {
    await mongoose.connect('mongodb://AdminSammy:GHT30k7!@localhost:27017/admin');
}
main().catch(err => console.log(err));
// require route

const userRoutes =require('./src/routes/user.routes')
const mangaRoutes =require('./src/routes/mangas.routes')
const episodeRoutes =require('./src/routes/episodes.route')
const downloadRoutes =require('./src/routes/download.route')
const bookRoutes =require('./src/routes/book.routes')
const jwt = require("jsonwebtoken");
const User = require("./src/models/user.model");


app.use('/api/users',userRoutes)
app.use('/api/manga',mangaRoutes)
app.use('/api/episode',episodeRoutes)
app.use('/api/download',downloadRoutes)
app.use('/api/book',bookRoutes)
// app.post("/register", async (req, res) => {
//
//     // Our register logic starts here
//     let encryptedPassword;
//     try {
//         // Get user input
//         const {first_name, last_name, email, password} = req.body;
//
//         // Validate user input
//         if (!(email && password && first_name && last_name)) {
//             res.status(400).send("All input is required");
//         }
//
//         // check if user already exist
//         // Validate if user exist in our database
//         const oldUser = await User.findOne({email});
//
//         if (oldUser) {
//             return res.status(409).send("User Already Exist. Please Login");
//         }
//
//         //Encrypt user password
//         encryptedPassword = await bcrypt.hash(password, 10);
//
//         // Create user in our database
//         const user = await User.create({
//             first_name,
//             last_name,
//             email: email.toLowerCase(), // sanitize: convert email to lowercase
//             password: encryptedPassword,
//         });
//
//         // Create token
//         // save user token
//         console.log(process.env.TOKEN_KEY)
//         user.token = jwt.sign(
//             {user_id: user._id, email},
//             process.env.TOKEN_KEY,
//             {
//                 expiresIn: "2h",
//             }
//         );
//
//         // return new user
//         res.status(201).json(user);
//     } catch (err) {
//         console.log(err);
//     }
//     // Our register logic ends here
// });

app.get('/',(req,res) =>{
    res.json({"message":"hello world"});
} );

app.listen(port,()=>{
    console.log(`node server is listening on port ${port}`);
});