const { Post } = require('../models');

const postData = [
    {
        title: "Why MVC is Important",
        content: "MVC allows developers too maintain a true separation of concerns, devisiong their code between the model layer for data, the View layer for design, and the Controller layer for application logic",
        creator_name: "Sal",
        creator_id: 1,
    },
    {
        title: "Authentication vs. Authorization",
        content: "There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.",
        creator_name: "Sal",
        creator_id: 1,
    },
    {
        title: "Object Relational Mapping",
        content: "I have really loved learning about ORMs. It's really simplified the way I create queries in SQL!",
        creator_name: "Lernantino",
        creator_id: 3,
    },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;