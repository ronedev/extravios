const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

//Crear y guardar un nuevo post
exports.createPost = (req, res) => {
  //Validacion de request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
    return;
  }

  //Crear el post
  const post = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  //Guardar post en la base de datos
  Post.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Somo error ocurred while creating the Post.",
      });
    });
};

//Get all Posts desde la base de datos
exports.getAllPosts = (req, res) => {
  const limit = 2
  const page = req.query.page ? req.query.page : 1
  const offset = limit * (page - 1)

  console.log('page',req.query.page)
  
  const title = req.query.title;
  console.log('title',title)
  let condition = title ? { title: { [Op.like]: `%${title}%` }, published: true } : {published: true};

  Post.findAndCountAll({ offset: offset, limit: limit,where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while getting all posts.",
      });
    });
};

//Get un post en particular en base a su id
exports.getOnePost = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting Post whit id: " + id,
      });
    });
};

//Update un post en particular en base a un id
exports.updatePost = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Post with id: ${id}. Maybe Post was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Post with id: " + id,
      });
    });
};

// Eliminar un Post con un id especificado en request
exports.deletePost = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete Post with id:${id}. Maybe post was not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Post with id: " + id,
      });
    });
};

// Get all published Post
exports.getAllPublishedPosts = (req, res) =>{
    Post.findAll({where: {published:  true}})
        .then(data =>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials"
            })
        })
}
//En este proyecto no se aplicara la opcion de eliminar TODOS los posts
// Sin embargo seria asi:
// exports.deleteAllPosts = (req, res) => {
//   Post.destroy({
//     where: {},
//     truncate: false,
//   })
//     .then((nums) => {
//       res.send({ message: `${nums} Posts were deleted successfully` });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while removing all posts",
//       });
//     });
// };
