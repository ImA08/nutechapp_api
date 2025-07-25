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
router.post("/api/register", authCtrl.register);
router.post("/api/login", authCtrl.login);

// User Profile
router.get('/api/profile', auth, userController.getProfile);
router.put("/api/profile/update", auth, profileController.updateProfile)
router.put(
  "/api/profile/image",
  auth,
  upload.single('profile_image'),
  profileController.updateProfileImage
);

// Banners & Services
router.get('/api/banner', bannerController.getBannerList);
router.get('/api/services', auth, serviceController.getServiceList);


// Transactions
router.get("/api/balance", auth, balanceCtrl.getBalance);
router.post("/api/topup", auth, topupCtrl.topup);
router.post(
  "/api/payment/:service_code",
  auth,
  paymentController.createTransaction
);
router.post("/api/transaction", auth, transactionController.createTransaction);
router.get(
  "/api/transaction/history",
  auth,
  paymentController.getTransactionHistory
);
module.exports = router;
