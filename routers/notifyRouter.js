const router = require("express").Router();
const notifyCtrl = require("../controllers/notifyCtrl");
const auth = require("../middlewares/auth");

router.post("/notify", auth, notifyCtrl.createNotify);

router.delete("/notify/:id", auth, notifyCtrl.removeNotify);

router.get("/notifies", auth, notifyCtrl.getNotifies);

router.patch("/isReadNotify/:id", auth, notifyCtrl.isReadNotify);

router.delete("/deleteAllNotifies", auth, notifyCtrl.deleteAllNotifies);

module.exports = router;
