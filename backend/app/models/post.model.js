//Este modelo de sequelize representa como si fuese la tabla Post de MySQL
//Ademas de los campos que se especifican (title, description, published) tambien se crean por default
//el id, createdAt, updatedAt

module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Post;
};