const express =require('express')

const router =express.Router();

const epsiodeController =require('../controllers/episode.controller');


router.get('/',epsiodeController.findAll);

router.get('/add/:name/:episode',epsiodeController.create);

router.get('/:id',epsiodeController.findOne);
router.get('/manga/:manga',epsiodeController.findByManga);

router.put('/:id',epsiodeController.update);

router.delete('/:id',epsiodeController.delete);
router.get('/image/:name/:episode/:number',epsiodeController.sendImage);
router.get('/import/episode',epsiodeController.import)
router.get('/test/julien',epsiodeController.test)



module.exports =router;