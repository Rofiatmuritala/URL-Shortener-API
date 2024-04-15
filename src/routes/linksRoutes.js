import { Router } from "express";
// import { usersRouteMiddleware } from "../middlewares/userMiddleware.js";
import {
  createShortenedUrl,
  getAllLinks,
  visitLink,
} from "../controllers/LinkController.js";

const router = Router();

router.get("/links", getAllLinks);
router.post("/links", createShortenedUrl);
router.get("/links/:shortCode", visitLink);

export default router;
