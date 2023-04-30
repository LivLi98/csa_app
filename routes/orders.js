const express = require("express");
const router = express.Router();

const { authenticate } = require("../middlewares/auth");
const { Order } = require("../models");


router.post("/", async (req, res) => {
  const { name, price } = req.body;
  try {
    const order = await Order.create({ name, price });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll(); 
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id); 

    if (!order) {
      res.status(404).json({ message: "Order not found" });
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving order", error });
  }
});


router.put("/:id", async (req, res) => {
  const { name, price } = req.body;

  try {
    const newOrder = {};
    if (name !== undefined) {
      newOrder.name = name;
    }
    if (price !== undefined) {
      newOrder.price = price;
    }
    const [updated] = await Order.update(newOrder, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedOrder= await Basket.findByPk(req.params.id);
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Order.destroy({
      where: { id: req.params.id },
    });

    if (deleted) {
      res.status(204).json({ message: "Basket deleted" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
});

router.post("/", authenticate, async (req, res) => {
})

module.exports = router