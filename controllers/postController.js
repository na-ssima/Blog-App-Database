const Post = require('../models/post')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const validationResult = require("express-validator");

const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.secretKey;


module.exports = {

  getAllPosts:(req,res)=>{
      Post.find({}).then((posts)=>{
        res.send(posts);
    }).catch((error)=>{
        res.status(500).send(error);
    })
  },

  getPost:(req,res)=>{
    const post = req.params.id
    Post.findOne({_id: post}).then((posts)=>{
      res.send(posts);
    }).catch((error)=>{
      res.status(500).send(error)
    })
  },

  createPost:(req, res)=>{
    Post.create(req.body).then((post)=>{
      res.status(201).send(post)
    }).catch((error)=>{
      res.status(400).send(error)
    })
  },

  updatePost:(req,res)=>{
    const postId = req.params.id
    const newTitle = req.body.title
    Post.findOneAndUpdate({_id: postId},
      {$set: {title: newTitle}})
      .then((post)=>{
        if(post){
          console.log('Update post:', post)
        }
        res.status(404).send('post not found')
      }).catch((error)=>{
        console.error('Error updating name', error)
        res.status(500).send(error)
      })
  },

  deletePost:(req,res)=>{
    const postid= req.params.id;
    Post.findOneAndDelete({_id:postid}).then((post) => {
        if (post) {
            return res.send('post deleted:');
        }
        res.status(404).send('post not found');
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send(error);
    });
},


  registerUser:async(req,res)=>{
    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;
    try{
        hashpassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
        const user = new User({
          email: req.body.email,
          password: hashpassword,
        })
        const saveUser = await user.save();
        res.status(201).send(saveUser);

    }catch(error){
      res.status(400).send(error)
    }
  },

  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Username or password is incorrect', errors);
        return res.redirect('/');
      }

      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = authMiddleware.generateToken(user);

      res.status(201).json({
        message: 'Success',
        token,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
}
