const fs = require("fs");

const Sauce = require("../models/Sauce_models");

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    userId: sauceObject.userId,
    name: sauceObject.name,
    manufacturer: sauceObject.manufacturer,
    description: sauceObject.description,
    mainPepper: sauceObject.mainPepper,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    heat: sauceObject.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });

  sauce
    .save()
    .then(() =>
      res.status(201).json({ message: "Sauce enregistrée ! Miam !!" })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file // utilisation d'un opérateur ternaire pour voir si l'objet existe ou non
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Réponse modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1]; // on découpe l'URL avec comme séparateur /images/ comme ça , ça renvoi 1 tableau avec 2 éléments (1: l url avant /images/ et 2: le nom du fichier). Donc on sélectionne le 2eme élément du tableau
      fs.unlink(`images/${filename}`, () => {
        // fs.unlink fonction de suppression du fichier  avec fs
        Sauce.deleteOne({ _id: req.params.id }) // une fois le fichier supprimé on supprime l'objet dans la base
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.addAVote = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const sauceId = req.params.id;

  Sauce.findOne({ _id: sauceId }).then((sauce) => {
    switch (like) {
      case 1:
        Sauce.updateOne(
          { _id: sauceId },
          { $inc: { likes: +1 }, $push: { usersLiked: userId } }
        )
          .then(() =>
            res
              .status(200)
              .json({ message: "Vote enregistrée,  merci pour ce like :D " })
          )
          .catch(
            (error) =>
              res.status(400).json({ error }) && console.log("big problem")
          );
        break;
      case 0:
        if (sauce.usersLiked.includes(userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            { $inc: { likes: -1 }, $pull: { usersLiked: userId } }
          )
            .then(() =>
              res
                .status(200)
                .json({ message: "Vous avez changé d'avis, c'est noté :( " })
            )
            .catch((error) => res.status(400).json({ error }));
        } else if (sauce.usersDisliked.includes(userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } }
          )
            .then(() =>
              res
                .status(200)
                .json({ message: "Vous avez changé d'avis, c'est noté :( " })
            )
            .catch((error) => res.status(400).json({ error }));
        }
        break;
      case -1:
        Sauce.updateOne(
          { _id: sauceId },
          { $inc: { dislikes: +1 }, $push: { usersDisliked: userId } }
        )
          .then(() =>
            res.status(200).json({
              message: "Vote enregistrée, désolé que vous n'aimiez pas  :( ",
            })
          )
          .catch(
            (error) =>
              res.status(400).json({ error }) && console.log("big problem")
          );
        break;
      default:
        console.log(err);
    }
  });
};
