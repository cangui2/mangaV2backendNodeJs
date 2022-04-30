const express =require('express')

const router =express.Router();

const userController =require('../controllers/user.controllers');

router.get('/',userController.findAll);

router.post('/',userController.create);

router.get('/:id',userController.findOne);

router.put('/:id',userController.update);

router.delete('/:id',userController.delete);


router.post('/register',userController.register);
router.post('/login',userController.login);

module.exports =router;