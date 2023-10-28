const express = require("express");
const router_bssr = express.Router();
const restaurantController = require("./controllers/restaurantController");
const productController = require("./controllers/productController");
//const { uploadProductImage } = require("./utils/upload-multer");
const uploader_product = require("./utils/upload-multer")("products");

/******************************************
 *             BSSR EJS                   *
 ******************************************/

// restaurant va adminlarga  tegishli routerlar

router_bssr.get("/", restaurantController.home);

router_bssr
  .get("/sign-up", restaurantController.getSignupMyRestaurant)
  .post("/sign-up", restaurantController.signupProcess);

router_bssr
  .get("/login", restaurantController.getLoginMyRestaurant)
  .post("/login", restaurantController.loginProcess);

router_bssr.get("/logout", restaurantController.logout);

router_bssr.get("/check-me", restaurantController.checkSessions);

router_bssr.get("/products/menu", restaurantController.getMyRestaurantProducts); //Login bolgan restaranlar getMyR.. ga borishi kerak
router_bssr.post(
  "/products/create",
  restaurantController.validateAuthRestaurant, // Sessionni tekshiryapti
  uploader_product.array("product_images", 5),
  productController.addNewProduct
);
router_bssr.post(
  "/products/edit/:id",
  restaurantController.validateAuthRestaurant,
  productController.updateChosenProduct
); //tovar edit va id si kirib kelishi kk
//va productController dan updateChosenProduct metodga borishi kk

module.exports = router_bssr;
