import express from "express";
import {
  createRace,
  getRace,
  deleteRace,
  getAllRaces,
  updateRace,
} from "../controllers/race.controller.js";

const router = express.Router();

router.post("/create", createRace); // Endpoint do tworzenia rasy
router.get("/:id", getRace); // Endpoint do pobierania rasy
router.get("/getall", getAllRaces); // Endpoint do pobierania wszystkich ras
router.delete("/delete/:id", deleteRace); // Endpoint do usuwania rasy
router.patch("/update/:id", updateRace); // Endpoint do edycji rasy

export default router;
