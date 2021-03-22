const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Todo = require("../models/Todo");
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const multer = require('multer');
const uuidv4 = require('uuid');
const multer  = require('multer');



const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null,Date.now() + '-' +file.originalname);
  },
});

const upload = multer({ storage: storage });



uploadRouter.post('/upload',upload.single('pan_image'),(req, res) => {
  console.log(req.body);
  const newImage = new User({
    pan_image:req.body.pan_image

  });
  newImage.save();

  res.status(200).json({
    message: { msgBody: "Image Can't Upload", msgError: true },
  });
});



const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "NoobCoder",
      sub: userID,
    },
    "NoobCoder",
    { expiresIn: "1h" }
  );
};

userRouter.post("/register", (req, res) => {
  const {
    username,
    password,
    parent_username,
    email,
    phone
  } = req.body; 
  const role = "user";
  const kyc_verified = "0";
  const bank_verified = "0";

  User.findOne({ username }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    if (user)
      res.status(400).json({
        message: { msgBody: "Username is already taken", msgError: true },
      });
    else {
      const newUser = new User({
        username,
        password,
        parent_username,
        email,
        phone,
        role,
        kyc_verified,
        bank_verified
      });
      newUser.save((err) => {
        console.log(err);
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else
          res.status(201).json({
            message: {
              msgBody: "Account successfully created",
              msgError: false,
              user:user
            },
          });
      });
    }
  });
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.cookie("Userid", _id);
      res.status(200).json({ isAuthenticated: true, user: { username, role,_id } });
    }
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

userRouter.post(
  "/todo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const todo = new Todo(req.body);
    todo.save((err) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        req.user.todos.push(todo);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "Error has occured", msgError: true },
            });
          else
            res.status(200).json({
              message: {
                msgBody: "Successfully created todo",
                msgError: false,
              },
            });
        });
      }
    });
  }
);

userRouter.get(
  "/todos",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("todos")
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else {
          res.status(200).json({ todos: document.todos, authenticated: true });
        }
      });
  }
);

userRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      res
        .status(200)
        .json({ message: { msgBody: "You are an admin", msgError: false } });
    } else
      res.status(403).json({
        message: { msgBody: "You're not an admin,go away", msgError: true },
      });
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
);
userRouter.post("/upline_verify", (req, res) => {
  const username  = req.body.parent_username;
  User.findOne({ username }, (err, user) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Enter correct Upline ID", msgError: true },
      });
    if (user)
      res.status(200).json({
        message: { msgBody: "Sucessfully Validated",pUser:user.username, msgError: false },
      });
  });
});

  
    
  

userRouter.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      console.log(req.body);
      const id = req.body.id;
      const result = User.findById(id, (err, user) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error updating user", msgError: true },
          });
        else 
        res.status(200).json({user:user,
        message: { msgBody: "User Sucessfully Updated", msgError: false},
      });
      });
    } catch {}
  }
);





// userRouter.post(
//   "/update_user", uploadOptions.single('image'),
//   (req, res) => {
//     try {
//       const id = req.body._id;
//       const dval = req.body;
//       const fileName = req.file.filename
//       const result = User.findByIdAndUpdate(id, dval, filename, { new: true },(err, user) => {
//         if (err)
//           res.status(500).json({
//             message: { msgBody: "Error updating user", msgError: true },
//           });
//         else 
//         res.status(200).json({
//         message: { msgBody: "User Sucessfully Updated", msgError: false,user:user},
//       });
//       });
//     } catch {}
//   }
// );




userRouter.post(
  "/update_user",
  (req, res) => {
    try {
      const id = req.body._id;
      const dval = req.body;
      const result = User.findByIdAndUpdate(id, dval, { new: true },(err, user) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error updating user", msgError: true },
          });
        else 
        res.status(200).json({
        message: { msgBody: "User Sucessfully Updated", msgError: false,user:user},
      });
      });
    } catch {}
  }
);





module.exports = userRouter;
