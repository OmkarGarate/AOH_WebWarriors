const express = require('express');
const { signupUser, loginCollege, loginUser, getUsers, getUser, updateProfile, registerUser} = require('../controllers/userControllers');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const User = require('../models/userModel');

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

// if(userProfile.length>0)
// {
//     console.log("uploaded Profile Image")
// }


// Routes
router.get('/allusers', getUsers);
router.get('/singleuser/:id', getUser);
router.post('/signup',signupUser);
router.post('/loginuser', loginUser);
router.post('/logincollege', loginCollege);
// router.post('/registerUser/:id', registerUser);
router.post('/registerUser/:id', async (req, res) => {
    try {
      const { id } = req.params; // Get the user ID from the URL parameters
      // Find the user by ID
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Increment the registered field by 1
      user.registered += 1;
      console.log(user.registered)
      // Save the updated user document
      await user.save();
      // Send a success response
      res.status(200).json({ message: 'User registration count updated successfully' });
    } catch (error) {
      console.error('Error updating user registration count:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Route to update user profile with file upload
router.patch('/updateprofile/:id', upload.single('uploaded_file'), updateProfile);

// router.post('/updateprofile/:id', uploadProf.single('uploaded_file'), updateProfile);

module.exports = router;
