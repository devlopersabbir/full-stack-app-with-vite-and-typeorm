import { Request, Response } from "express";
import { Books } from "../entity/Books";

class BookController {
  // for get all books
  public static async index(req: Request, res: Response) {
    try {
      const books = await Books.find();
      res.status(200).json(books);
    } catch (error: any) {
      if (error) {
        return res.status(500).json({ message: "Server error" });
      }
    }
  }

  //   for create new books
  public static async store(req: Request, res: Response) {
    const { title, body, price, author, image } = req.body;
    if (!title || !body || !price || !author || !image)
      return res.status(400).json({ message: "All input fill is required!" });
    try {
      const books = Books.create({
        title,
        body,
        price,
        author,
        image,
      });
      await books.save();
      res.status(201).json(books);
    } catch (error: any) {
      if (error) {
        return res.status(500).json({ message: "Server error" });
      }
    }
  }

  // update books
  public static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, body, price, author, image } = req.body;
    try {
      const book = await Books.findOne({ where: { uuid: id } });
      if (!book) return res.status(404).json({ message: "Books not found!" });

      book.title = title;
      book.body = body;
      book.price = price;
      book.author = author;
      book.image = image;
      await Books.save(book);
      res.json(book);
    } catch (error: any) {
      if (error) {
        return res.status(500).json({ message: "Server error" });
      }
    }
  }

  // delete books
  public static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const book = await Books.findOne({ where: { uuid: id } });
      if (!book) return res.status(404).json({ message: "Books not found!" });
      await Books.remove(book);
      res.status(200).json({ message: "Books deleted successfully!" });
    } catch (error: any) {
      if (error) {
        return res.status(500).json({ message: "Server error" });
      }
    }
  }
}

export default BookController;
