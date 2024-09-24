const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); // for hashing password
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SCREAT = "pratikthoriya$prince";

// Route 1 :- create a user using : POST "api/auth/createuser". .....................
router.post('/createuser', [
  //give validation 
  body('name', 'enter a valid field').isLength({ min: 3 }),
  body('email', 'enter a valid field').isEmail(),
  body('password', 'enter a valid field').isLength({ min: 5 }),
], async (req, res) => {
  let Success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({Success, errors: errors.array() });
  }

  try {
    //check wheether the user with this email exists already.
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ Success,error: "Sorry user with this email already exist" })
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //create a new user from user schema
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })

    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SCREAT);
    Success = true;
    res.json({Success, authToken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Inetrnal server error..");
  }


});

//Route 2 :- Authenticate  a user using : POST "api/auth/login". .....................

router.post('/login',[
  

  body('email', 'enter a valid field').isEmail(),
  body('password', 'Password can not be Blank').exists(),
], async(req,res)=>{

  let Success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password} = req.body;

  try {
    let user = await User.findOne({email});
    if(!user){
      Success = false;
      return res.status(400).json({Success,error:"try to login with correct username..."});
    }

    const passcompare = await bcrypt.compare(password,user.password);
    if(!passcompare){
      return res.status(400).json({error:"try to login with correct password..."});
    }

    //if username & passowrd is correct
    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SCREAT);
    Success = true;
    res.json({ Success,authToken , 'login':'login successfull' })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Inetrnal server error..");
  }

})

//Route 3 :- Get loggedin  user detail : POST "api/auth/showuser". .....................

router.post('/showuser',fetchuser, async (req,res)=>{
  try {
    
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
      res.status(500).send("Inetrnal server error..");
  }
})



module.exports = router;