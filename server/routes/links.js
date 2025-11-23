import express from "express";
import { LinkController } from "../controllers/linkController.js";

const router = express.Router();

router.post("/", LinkController.create);
router.get("/", LinkController.getAll);
router.get("/:code", LinkController.getOne);
router.delete("/:code", LinkController.delete);

export default router;
