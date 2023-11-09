const express = require("express");
const router_bssr = express.Router();
const restaurantController = require("./controllers/restaurantController");
const productController = require("./controllers/productController");
const uploader_product = require("./utils/upload-multer")("products");
const uploader_members = require("./utils/upload-multer")("members");

/******************************************
 *             BSSR EJS                   *
 ******************************************/

// restaurant va adminlarga  tegishli routerlar

router_bssr.get("/", restaurantController.home);

router_bssr
  .get("/sign-up", restaurantController.getSignupMyRestaurant)
  .post(
    "/sign-up",
    uploader_members.single("restaurant_img"),
    restaurantController.signupProcess
  );

router_bssr
  .get("/login", restaurantController.getLoginMyRestaurant) //getLoginMyRestaurant pagega yuboradi, kerakli EJSga yuborish
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

router_bssr.get(
  "/all-restaurant",
  restaurantController.validateAdmin,
  restaurantController.getAllRestaurants
);

router_bssr.post(
  "/all-restaurant/edit",
  restaurantController.validateAdmin,
  restaurantController.updateRestaurantByAdmin
);

module.exports = router_bssr;
