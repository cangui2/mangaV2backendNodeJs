const Episode = require('../models/episode.model');
const Manga = require('../models/manga.model.js');
const path = require("path");
const fs = require('fs');
const csvtojson = require("csvtojson");
require("dotenv").config();

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    Episode.find().populate('manga')
        .then(episodes => {
            res.send(episodes);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while getting list of users."
        });
    });
};

// find by
exports.findByManga = (req, res) => {
    console.log('appel')
    Episode.find({manga:req.params.manga})
        .then(episodes => {
            res.send(episodes);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while getting list of users."
        });
    });
};
// Create and Save a new User
exports.create = async (req, res) => {
    let page;
    const m = req.params.name;
    const episode = req.params.episode;
    const dir2=path.join(__dirname,'..',`../src/uploads/` + m + `/episode`+episode+`/`);
    Manga.findOne({name:m})
        .then(episodes => {
            fs.readdir(dir2, (err, files) => {
                //console.log(files.length);
               // console.log('compte files')
                page=files.length;
               // console.log(episodes)

                const epsiode = new Episode({
                    number: episode,
                    location: m,
                    name: m,
                    page:page,
                    manga:episodes
                });
                //console.log(epsiode)
//Save user in the database
                epsiode.save()
                    .then(data => {
                        res.send('Episode ajouté');
                    }).catch(err => {
                    res.status(500).send({
                        message: err.message
                    });
                });

            });

        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while getting list of users."
        });
    });


// Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
// Create a new User



};
// Find a single User with a id
exports.findOne = (req, res) => {
    Episode.findById(req.params.id)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send(user);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error getting user with id " + req.params.id
        });
    });
};
// Update a User identified by the id in the request
exports.update = async (req, res) => {
// Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
// Find user and update it with the request body
    const manga = await Manga.find({name: req.body.name})
    Episode.findByIdAndUpdate(req.params.id, {
        number: req.body.number,
        location: req.body.location,
        name: req.body.name,
        mal_id: req.body.mal_id,
        manga: manga
    }, {new: true})
        .then(episode => {
            if (!episode) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send(episode);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    Episode.findByIdAndRemove(req.params.id)
        .then(episode => {
            if(!episode) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send({message: "user deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.id
        });
    });
};
exports.sendImage = (req, res) => {
    let file=req.params.number
    let name=req.params.name
    let episode=req.params.episode
    let manga=['countrouble','city-hunter','gate-au-dela-de-la-porte','iruma-a-l-ecole-des-demons','one-piece','one-piece-door'
    ,'one-piece-hs','one-piece-party','one-piece-wanted','platinum-end','the-rising-of-the-shield-hero','mortelle-adele',
        'head-trick','fairy-tail','fairy-tail-100-years-quest','great-teacher-onizuka','gto-paradise-lost','yuna-de-la-pension-yuragi','fire-force','Goldorak','coq-de-combat'
    ];
    let data=[];
    let number =parseInt(file)-1;
    let folder=path.join(__dirname, "../uploads/"+name+"/episode"+episode);
    console.log(folder)
    console.log(number)
    //if(manga.includes(name)){

        fs.readdir(folder, (err, files) => {
            files.forEach(file => {
                data.push(file)
            });
            console.log(data[0]);
            res.sendFile(path.join(__dirname, "../uploads/"+name+"/episode"+episode+"/"+data[number]));
            console.log(data[0]);
        });
   // }
    //else {

     //   res.sendFile(path.join(__dirname, "../uploads/"+name+"/episode"+episode+"/"+file+".webp"));
    //}




};
exports.import =(req,res) =>{
    const fileName = path.join(__dirname, "episode.csv");
    console.log(fileName)
    var arrayToInsert = [];
    csvtojson().fromFile(fileName).then(source => {
        // Fetching the all data from each row
        for (var i = 0; i < source.length; i++) {
            console.log(source[i]);
            // break;
            const episode = new Episode({
                number: source[i]["number"],
                location: source[i]["location"],
                name: source[i]["name"],
                //page: source[i]["synopsis"],
                is_active:true,
                is_download:true,
                manga:source[i]["manga_id"],
            });
            arrayToInsert.push(episode);


        }     //inserting into the table “employees”
        Episode.insertMany(arrayToInsert, (err, result) => {
            if (err) console.log(err);
            if(result){
                console.log("Import CSV into database successfully.");
            }
        });


    });
}

exports.test =(req,res)=>{
    const testFolder = path.join(__dirname, "../uploads/countrouble/episode1/");
    let data=[];
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {

            data.push(file)
        });
        console.log(data[0]);
    });

}


