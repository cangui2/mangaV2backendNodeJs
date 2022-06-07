const express =require('express')

const router =express.Router();

const bookController =require('../controllers/book.controller.js');



router.get('/',bookController.findAll);

router.post('/',bookController.create);

router.get('/:id',bookController.findOne);

router.put('/:id',bookController.update);

router.delete('/:id',bookController.delete);
router.get('/import/test',bookController.import);
router.get('/find/:name',bookController.findForlder);
router.get('/read/:name',bookController.sendEpub);


module.exports =router;