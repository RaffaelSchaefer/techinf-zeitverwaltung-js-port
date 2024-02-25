//TODO Sort Get path alphabetical

import express from "express";

import position_controller from "../controller/position_controller.js";
import card_controller from "../controller/card_controller.js";
import user_controller from "../controller/user_controller.js";
import address_controller from "../controller/address_controller.js";
import log_controller from "../controller/log_controller.js"

const router = express.Router()

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

router.get('/address', address_controller.list)
router.get('/address/:id', address_controller.read)
router.post('/address/create', address_controller.create)
router.post('/address/update/:id', address_controller.update)
router.post('/address/delete/:id', address_controller.delete)

router.get('/logs', log_controller.list)
router.get('/logs/:id', log_controller.read)
router.post('/logs/create', log_controller.create)
router.post('/logs/update/:id', log_controller.update)
router.post('/logs/delete/:id', log_controller.delete)

export const catalogRouter = router
