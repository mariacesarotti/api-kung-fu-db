import { Router } from "express";
import * as PosturaController from "../controllers/posturas-controller";

const router = Router();

router.get("/posturas", PosturaController.getPostura);
router.get("/posturas/:id", PosturaController.getPosturaById);
router.get("/posturas/:kati", PosturaController.getFullKati);
router.post("/posturas", PosturaController.createPostura);
router.patch("/posturas/:id", PosturaController.updatePosturaById);
router.delete("/posturas/:id", PosturaController.deletePosturaById);

export default router;
