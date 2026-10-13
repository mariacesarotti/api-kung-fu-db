import { Router } from "express";
import * as PosturaController from "../controllers/posturas-controller";

const router = Router();

// filter with ?faixa= and ?kati=
router.get("/posturas", PosturaController.getPostura);
router.get("/posturas/:id", PosturaController.getPosturaById);
router.post("/posturas", PosturaController.createPostura);
router.patch("/posturas/:id", PosturaController.updatePosturaById);
router.delete("/posturas/:id", PosturaController.deletePosturaById);

export default router;
