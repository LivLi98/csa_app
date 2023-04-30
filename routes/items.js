const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");

const item  = require("../models");

router.post("/", async (req, res) => {
  const { name, price } = req.body;
  try {
    const basket = await item.create({ name, price });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error creating item", error });
  }
});


router.get("/", async (req, res) => {
  try {
    const item = await item.findAll();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Item", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id); 

    if (!item) {
      res.status(404).json({ message: "Item not found" });
    } else {
      res.json(item);
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
      newBasket.price = price;
    }
    const [updated] = await item.update(newItem, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedItem = await Item.findByPk(req.params.id);
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
    const deleted = await Item.destroy({
      where: { id: req.params.id },
    });

    if (deleted) {
      res.status(204).json({ message: "Item deleted" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
});

router.post("/", authenticate, async (req, res) => {
})

module.exports = router