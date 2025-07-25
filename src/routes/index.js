const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

const authCtrl = require("../controllers/auth.controller");
const balanceCtrl = require("../controllers/balance.controller");
const topupCtrl = require("../controllers/topup.controller");
const paymentController = require("../controllers/payment.controller");
const transactionController = require("../controllers/transaction.controller");
const upload = require("../middlewares/upload.middleware");
const userController = require('../controllers/user.controller');
const profileController = require("../controllers/profile.controller");
const bannerController = require('../controllers/banner.controller');
const serviceController = require('../controllers/service.controller');

// Auth
router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);

// User Profile
router.get('/profile', auth, userController.getProfile);
router.put("/profile/update", auth, profileController.updateProfile)
router.put(
  "/profile/image",
  auth,
  upload.single('profile_image'),
  profileController.updateProfileImage
);

// Banners & Services
router.get('/banner', bannerController.getBannerList);
router.get('/services', auth, serviceController.getServiceList);


// Transactions
router.get("/balance", auth, balanceCtrl.getBalance);
router.post("/topup", auth, topupCtrl.topup);
router.post(
  "/payment/:service_code",
  auth,
  paymentController.createTransaction
);
router.post("/transaction", auth, transactionController.createTransaction);
router.get(
  "/transaction/history",
  auth,
  paymentController.getTransactionHistory
);
module.exports = router;
