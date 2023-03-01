const express = require("express")
const router = express.Router()
const indexController = require("./controllers/indexController")

router.get("/",indexController.getIndexPage)
router.post("/send",indexController.postMessege)
router.get("/refresh",indexController.refresh)

module.exports = router