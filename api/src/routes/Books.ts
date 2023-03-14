import { Request, Response, Router } from "express";
import BookController from "../controllers/bookControllers";

const routes = Router();

routes.get("/", BookController.index);
routes.post("/", BookController.store);
routes.put("/:id", BookController.update);
routes.delete("/:id", BookController.delete);

export default routes;
