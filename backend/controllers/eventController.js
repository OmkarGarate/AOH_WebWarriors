const Event = require('../models/eventModel')

const createEvent = async (req, res) =>{
    const {category, title, description, date, time, venue, entryfees, createdBy} = req.body;
    const poster = req.file.filename

    try{
        const event = await Event.create({
            category,
            title,
            description, 
            date,
            time,
            venue,
            entryfees,
            poster,
            createdBy
        })

        res.status(200).json(event)
    }catch(error){
        console.error('Error creating the event: ', error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getAllEvents = async (req, res) =>{
    const events = await Event.find({}).sort({createdAt: -1})
    res.status(200).json(events)
}

const getOneEvent = async (req, res) =>{
    const {id} = req.params
    const event = await Event.findById(id)

    if(!event){
        return console.log("No such event found")
    }

    res.status(200).json(event)
}

const deleteEvent = async (req, res) =>{
    const {id} = req.params
    const event = await Event.findOneAndDelete({_id: id})

    if(!event){
        return console.log("No such event found")
    }

    res.status(200).json(event)
}

const updateEvent = async (req, res) =>{
    const {id} = req.params
    const event = await Event.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!event){
        return res.status(404).json({error: "No such Blog"})
    }

    res.status(200).json(event)
}


//post images
const postPic = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const pic = req.file.filename;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(400).json({ error: "No such event" });
        }

        // Add the filename of the uploaded image to the posts array
        event.posts.push(pic);
        await event.save();

        res.status(200).json({ message: "Post picture added successfully", event });
    } catch (error) {
        console.error("Error adding post picture:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

//get posts
const getPic =  async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Assuming `posts` is an array field in the User model
        const posts = event.posts;

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found for this event" });
        }

        // Assuming you want to return the posts as JSON
        res.json(posts);
    } catch (err) {
        console.error("Error retrieving user posts:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};




module.exports = {createEvent, getAllEvents, getOneEvent,updateEvent, deleteEvent, postPic, getPic}