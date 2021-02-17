import express from 'express';
import diagnosis from "../services/diagnosis";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(diagnosis.getDiagnoses());
});

export default router;