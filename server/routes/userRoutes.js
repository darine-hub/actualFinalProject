const express = require ('express');
const{registerController,loginController,afficheController,updateUserController,deleteUserController,updateUserImage, updateStateUserController }= require ('../controllers/userController');
const router = express.Router();
const {body}=require ('express-validator');
const authMiddleware = require ('../middleware/authMiddleware')

const multer = require ('multer')

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      cb(null,Date.now() + '-' + file.originalname )
    }
  })
  
  const upload = multer({storage })


router.post('/register',upload.single('picture'),
/*  body('email','invalid email').isEmail(),
body('password','password must have min 6 characters').isLength({min:6}),  */
registerController);

router.put('/updateImage/:id',upload.single('userImg'), authMiddleware,updateUserImage);


router.post('/login',loginController);

router.get('/listUsers', authMiddleware,afficheController)

router.put('/updateUser/:id',authMiddleware,updateUserController)

router.put('/updateStateUser/:id',authMiddleware,updateStateUserController)

router.delete('/deleteUser/:id',authMiddleware ,deleteUserController)


module.exports = router;