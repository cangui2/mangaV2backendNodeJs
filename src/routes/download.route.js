const express =require('express')

const router =express.Router();

const downloadController =require('../controllers/dowload.controller.js');


router.get('/download/:name/:episode/:lastepisode',downloadController.download);
router.get('/download/:name/:episode/:code1/:code2',downloadController.download2);
router.get('/compress/:name/:episode',downloadController.compress);
router.get('/remove/:name/:episode/',downloadController.remove);
router.get('/check/:name/:episode/',downloadController.checkIsExiste);
router.get('/download/pdf/:name',downloadController.downloadPdf)

module.exports =router;