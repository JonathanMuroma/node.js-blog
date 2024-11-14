const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;

//Admin page
const admin_index = async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Simple blog created with NodeJS, Express & MongoDB",
    };
    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
};

//Login
const admin_login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials, no user" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

//Dashboard
const admin_dashboard = async (req, res) => {
  try {
    const locals = {
      title: "Dashboard",
      description: "Simple blog created with NodeJS, Express & MongoDB",
    };
    const data = await Post.find();
    res.render("admin/dashboard", { data, locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
};

//Add blog post page
const admin_add_post_get = async (req, res) => {
  try {
    const locals = {
      title: "Add Post",
      description: "Simple blog created with NodeJS, Express & MongoDB",
    };
    // const data = await Post.find();
    res.render("admin/add-post", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
};

//Create/Post a new blog post
const admin_add_post_post = async (req, res) => {
  try {
    try {
      const newPost = new Post({ title: req.body.title, body: req.body.body });
      await Post.create(newPost);
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

//Edit a blog post page
const admin_edit_post_get = async (req, res) => {
  try {
    const locals = {
      title: "Edit Post",
      description: "Simple blog created with NodeJS, Express & MongoDB",
    };
    const data = await Post.findOne({ _id: req.params.id });

    res.render("admin/edit-post", { locals, data, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
};

//Edit/Put blog post
const admin_edit_post_put = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    });

    res.redirect(`/edit-post/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

//Delete a post
const admin_delete_post = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

//Logout
const admin_logout = (req, res) => {
  res.clearCookie("token");
  // res.json({ message: "Logout successful" });
  res.redirect("/");
};

//Register a user
const admin_register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: "User Created", user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "User already in use" });
      }
      res.status(500).json({ meggase: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  admin_index,
  admin_login,
  admin_dashboard,
  admin_add_post_get,
  admin_add_post_post,
  admin_edit_post_get,
  admin_edit_post_put,
  admin_delete_post,
  admin_logout,
  admin_register,
};
