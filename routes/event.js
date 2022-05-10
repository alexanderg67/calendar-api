const express =require('express')
const router =express.Router()
const jobsCntrl=require('../controllers/events')
const authMiddleware=require('../middleware/authenticateEvents')
router.use(authMiddleware)
router.route('/').get(jobsCntrl.getAllEvents).post(jobsCntrl.createEvent)
router.route('/:id').delete(jobsCntrl.deleteEvent)

module.exports= router