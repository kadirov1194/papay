const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");
const restaurantController = require("./controllers/restaurantController");
const orderController = require("./controllers/orderController");

/******************************************
 *             REST API                   *
 ******************************************/

// memberlarga tegishli routerlar
// router.get("/", memberController.home);
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);
router.get(
  "/member/:id",
  memberController.retrieveAuthMember,
  memberController.getChosenMember
);

router.post(
  "/products",
  memberController.retrieveAuthMember,
  productController.getAllProducts
);

router.get(
  "/products/:id",
  memberController.retrieveAuthMember,
  productController.getChosenProduct
);

//Restaurant related routers
router.get(
  "/restaurants",
  memberController.retrieveAuthMember,
  restaurantController.getRestaurants
);

router.get(
  "/restaurants/:id",
  memberController.retrieveAuthMember,
  restaurantController.getChosenRestaurant
);

// Order related routers
router.post(
  "/orders/create",
  memberController.retrieveAuthMember,
  orderController.createOder
);

// // boshqa routerlar
// router.get("/menu", (req, res) => {
//   res.send("Menu sahifasidasiz");
// });

// router.get("/community", (req, res) => {
//   res.send("Jamiyat sahifasidasiz");
// });

module.exports = router;
