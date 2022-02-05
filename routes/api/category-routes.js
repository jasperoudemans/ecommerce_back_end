const router = require("express").Router();
const { Category, Product } = require("../../models");

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({ include: [{ model: Product }] })
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: { id: req.params.id },
    include: [{ model: Product }],
  })
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err).status(400);
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  console.log(req.body);
  console.log(req.params.id);
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.send();
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
