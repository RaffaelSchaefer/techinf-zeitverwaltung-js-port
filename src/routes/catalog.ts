import express from "express";
import position_controller from "../controller/position_controller.js";

const router = express.Router()

router.get('/', (req, res, next) => {res.send("Hallo Welt")})

router.get('/positions', position_controller.list)
router.get('/positions/:id', position_controller.read)
router.post('/positions/create', position_controller.create)
router.post('/positions/update/:id', position_controller.update)
router.post('/positions/delete/:id', position_controller.delete)

export const catalogRouter = router
