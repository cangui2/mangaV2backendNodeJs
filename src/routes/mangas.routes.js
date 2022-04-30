const express =require('express')

const router =express.Router();

const mangaController =require('../controllers/manga.controller.js');



router.get('/',mangaController.findAll);

router.post('/',mangaController.create);

router.get('/:id',mangaController.findOne);

router.put('/:id',mangaController.update);

router.delete('/:id',mangaController.delete);
router.get('/import/test',mangaController.import);



module.exports =router;