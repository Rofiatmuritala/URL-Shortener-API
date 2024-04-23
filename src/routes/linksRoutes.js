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

router.get("/api/links", usersRouteMiddleware, getAllLinks);
router.post("/api/links", usersRouteMiddleware, createShortenedUrl);
router.get("/api/links/:shortCode", usersRouteMiddleware, getSingleLink);
router.delete("/api/links/:shortCode", usersRouteMiddleware, deleteLink);
router.get("/:shortCode", visitLink);

export default router;
