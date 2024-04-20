import { Router } from "express";
// import { usersRouteMiddleware } from "../middlewares/userMiddleware.js";
import {
  createShortenedUrl,
  deleteLink,
  getAllLinks,
  getSingleLink,
  visitLink,
} from "../controllers/LinkController.js";
import { usersRouteMiddleware } from "../middlewares/userMiddleware.js";

const router = Router();

router.get("/links", usersRouteMiddleware, getAllLinks);
router.post("/links", usersRouteMiddleware, createShortenedUrl);
router.get("/links/:shortCode", usersRouteMiddleware, getSingleLink);
router.delete("/links/:shortCode", usersRouteMiddleware, deleteLink);
router.get("/links/visit/:shortCode", visitLink);

export default router;
