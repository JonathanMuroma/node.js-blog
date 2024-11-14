const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

router.get("", mainController.main_home);

router.get("/post/:id", mainController.main_post);

router.post("/search", mainController.main_search);

router.get("/about", mainController.main_about);

module.exports = router;

// function insertPostData() {
//   Post.insertMany([
//     {
//       title: "Building a blog",
//       body: "This is the body text",
//     },
//     {
//       title: "Websiting",
//       body: "I am body text",
//     },
//     {
//       title: "Fullstacking this nood",
//       body: "Featuring body text here",
//     },
//     {
//       title: "Send nodes",
//       body: "Body text is displayed here",
//     },
//     {
//       title: "Learning to become fullstack",
//       body: "The body text is placed here",
//     },
//     {
//       title: "Learning to be human in this world",
//       body: "Body text still remains here, after all this time",
//     },
//   ]);
// }
