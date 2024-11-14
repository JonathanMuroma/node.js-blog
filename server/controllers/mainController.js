const Post = require("../models/Post");

//get homepage
const main_home = async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple blog created with NodeJS, Express & MongoDB",
    };

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();

    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: "/",
    });

    res.render("index", { locals, data });
  } catch (error) {
    console.log(error);
  }
};

const main_post = async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });
    const locals = {
      title: data.title,
      description: "Simple blog created with NodeJS, Express & MongoDB",
    };
    res.render("post", { locals, data, currentRoute: `/post/${slug}` });
  } catch (error) {
    console.log(error);
  }
};

//search post
const main_search = async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple blog created with NodeJS, Express & MongoDB",
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", { locals, data });
  } catch (error) {
    console.log(error);
  }
};

//get about page
const main_about = (req, res) => {
  res.render("about", { currentRoute: "/about" });
};

module.exports = { main_home, main_post, main_search, main_about };
