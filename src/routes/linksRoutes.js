import { Router } from "express";
// import { usersRouteMiddleware } from "../middlewares/userMiddleware.js";
import {
  createShortenedUrl,
  getAllLinks,
  visitLink,
} from "../controllers/LinkController.js";
import { usersRouteMiddleware } from "../middlewares/userMiddleware.js";

const router = Router();

router.get("/links", usersRouteMiddleware, getAllLinks);
router.post("/links", usersRouteMiddleware, createShortenedUrl);
router.get("/links/:shortCode", visitLink);

export default router;
