const express = require('express')
const router = express.Router()
const multer = require('multer')
const {createEvent, getAllEvents, getOneEvent,updateEvent, deleteEvent, postPic, getPic} = require('../controllers/eventController')
const Event = require('../models/eventModel')

//storage and filename setting  
let storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb)=>{
        // cb(null, Date.now(+file+originalname))
        cb(null, file.originalname)
    }
})

let upload = multer({
    storage: storage
})

//create event
router.post('/', upload.single('uploaded_file'), createEvent)
// router.post('/', createEvent)

//get all events
router.get('/', getAllEvents)

//get one event
router.get('/:id', getOneEvent)

//update event
router.patch('/update/:id', updateEvent)

//delete event
router.delete('/:id', deleteEvent)


//post images
//storage and filename setting  
let PicStorage = multer.diskStorage({
    destination: './uploadPic',
    filename: (req, file, cb)=>{
        // cb(null, Date.now(+file+originalname))
        cb(null, file.originalname)
    }
})

let uploadPic = multer({
    storage: PicStorage
})


// router.post('/postpic/:id',uploadPic.single('uploaded_file'), postPic)

// router.get('/getpic/:id', getPic)



//get all event by likes
router.get('/byLikes', async (req, res) => {
    try {
        const events = await Event.find({}).sort({ "likes": -1 }); // Sort by the length of the likes array in descending order
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// To check whether user has liked the event or not 
router.post('/:eventId/like', async (req, res) => {
    const { eventId } = req.params;
    const { userId } = req.body;

    try {
        // Find the event
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'event not found' });
        }

        // Check if the user has liked the event
        const hasLiked = event.likes.includes(userId); // Error occurs here

        if (hasLiked) {
            // User has liked the event, remove the like
            event.likes.pull(userId);
            await event.save();
            res.json({ message: 'Like removed successfully' });
        } else {
            // User has not liked the event, add the like
            event.likes.push(userId);
            await event.save();
            res.json({ message: 'Event liked successfully' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//To get all likes
router.get('/:id/likes', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the event by id
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Check if the event has likes property and it's an array
        if (!Array.isArray(event.likes)) {
            return res.json({ likes: 0 }); // Assuming default value is 0
        }

        // Respond with the likes count
        
        res.json({ likes: event.likes.length });
    } catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



//Registration routes
//get all event by registrations
router.get('/byRegistrations', async (req, res) => {
    try {
        const events = await Event.find({}).sort({ "registered": -1 }); // Sort by the length of the likes array in descending order
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// To check whether user has liked the event or not 
router.post('/:eventId/register', async (req, res) => {
    const { eventId } = req.params;
    const { userId } = req.body;

    try {
        // Find the event
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'event not found' });
        }

        // Check if the user has liked the event
        const isRegistered = event.registered.includes(userId); // Error occurs here

        if (isRegistered) {
            // User has liked the event, remove the like
            event.registered.pull(userId);
            await event.save();
            res.json({ message: 'Registration removed successfully' });
        } else {
            // User has not liked the event, add the like
            event.registered.push(userId);
            await event.save();
            res.json({ message: 'Event registered successfully' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//To get all likes
router.get('/:id/registrations', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the event by id
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Check if the event has likes property and it's an array
        if (!Array.isArray(event.registered)) {
            return res.json({ registered: 0 }); // Assuming default value is 0
        }

        // Respond with the likes count
        
        res.json({ registered: event.registered.length });
    } catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router