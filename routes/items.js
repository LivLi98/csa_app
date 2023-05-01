const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");

const item = require("../models");

router.post("/", async (req, res) => {
  const { name, price } = req.body;
  try {
    const basket = await item.create({ name, price });
    res.status(201).json(basket);
  } catch (error) {
    res.status(500).json({ message: "Error creating item", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Item", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const itemInstance = await item.findByPk(req.params.id);

    if (!itemInstance) {
      res.status(404).json({ message: "Item not found" });
    } else {
      res.json(itemInstance);
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Item", error });
  }
});

router.put("/:id", async (req, res) => {
  const { name, price } = req.body;

  try {
    const newItem = {};
    if (name !== undefined) {
      newItem.name = name;
    }
    if (price !== undefined) {
      newItem.price = price;
    }
    const [updated] = await item.update(newItem, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedItem = await item.findByPk(req.params.id);
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating Item", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await item.destroy({
      where: { id: req.params.id },
    });
    res.status(204).send(); // send a 204 (No Content) response to indicate success
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong"); // send a 500 (Internal Server Error) response if an error occurs
  }
});

module.exports = router

   