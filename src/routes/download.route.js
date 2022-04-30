const express =require('express')

const router =express.Router();

const downloadController =require('../controllers/dowload.controller.js');


router.get('/download/:name/:episode/:lastepisode',downloadController.download);
router.get('/compress',downloadController.compress);
router.get('/remove/:name/:episode/',downloadController.remove);

module.exports =router;