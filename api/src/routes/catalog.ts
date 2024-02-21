import express from "express";
import position_controller from "../controller/position_controller.js";
import card_controller from "../controller/card_controller.js";
import user_controller from "../controller/user_controller.js"

const router = express.Router()

router.get('/', (req, res, next) => {res.send("Hallo Welt")})

router.get('/positions', position_controller.list)
router.get('/positions/:id', position_controller.read)
router.post('/positions/create', position_controller.create)
router.post('/positions/update/:id', position_controller.update)
router.post('/positions/delete/:id', position_controller.delete)

router.get('/cards', card_controller.list)
router.get('/cards/:uid', card_controller.read)
router.post('/cards/create', card_controller.create)
router.post('/cards/update/:uid', card_controller.update)
router.post('/cards/delete/:uid', card_controller.delete)

router.get('/users', user_controller.list)
router.get('/users/:id', user_controller.read)
router.post('/users/create', user_controller.create)
router.post('/users/update/:id', user_controller.update)
router.post('/users/delete/:id', user_controller.delete)

export const catalogRouter = router
