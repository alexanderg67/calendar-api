const express =require('express')
const router =express.Router()
const userCntrl=require('../controllers/users')
const authMiddleware=require('../middleware/authenticateUsers')
router.use(authMiddleware)
router.get('/',userCntrl.getUsers)
router.post('/',userCntrl.createUser)
router.route('/:user').delete(userCntrl.deleteUser)
module.exports=router