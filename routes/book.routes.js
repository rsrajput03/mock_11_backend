const express = require("express");
const { BookModel } = require("../models/book.model");

const bookRouter = express.Router();

bookRouter.post("/books", async (req, res) => {
  const payload = req.body;
  try {
    const book = new BookModel(payload);
    await book.save();
    res.status(201).send({ message: "Book has been added" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

bookRouter.get("/books", async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).send(books);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

bookRouter.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const books = await BookModel.findById({ _id: id });
    res.status(200).send(books);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

bookRouter.get("/books?category=fiction", async (req, res) => {
  try {
    const books = await BookModel.find({ category: "fiction" });
    res.status(200).send(books);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

bookRouter.get("/books?author=Corey&category=fiction", async (req, res) => {
  try {
    const books = await BookModel.find({ author: "Corey",category: "fiction" })
    res.status(200).send(books);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

bookRouter.patch("/books/:id", async (req, res) => {
    const payload = req.body
    const { id } = req.params;
    try {
      await BookModel.findByIdAndUpdate({ _id: id },payload);
      res.status(204).send({ message: "Book has been updated" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  });


bookRouter.delete("/books/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await BookModel.findByIdAndDelete({ _id: id });
      res.status(202).send({ message: "Book has been deleted" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  });




module.exports = { bookRouter };
