const Definer = require("../lib/mistake");
const Member = require("../models/Member");
const Product = require("../models/Product");
const assert = require("assert");

let restaurantController = module.exports;

restaurantController.home = (req, res) => {
  try {
    console.log("GET: cont/home");
    res.render("home-page");
  } catch (err) {
    console.log(`Error, cont/home, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

//-------------------------------------------------------
// LOGIN BOLGAN RESTARANLAR
restaurantController.getMyRestaurantProducts = async (req, res) => {
  try {
    console.log("GET: cont/getMyRestaurantProducts");
    // TODO: Get my restaurant Product
    const product = new Product(); // Product(); classdan object yaratdik
    const data = await product.getAllProductsDataResto(res.locals.member); //res.locals.member ichidan datani olyapmiz
    res.render("restaurant-menu", { restaurant_data: data });
  } catch (err) {
    console.log(`Error, cont/getMyRestaurantProducts, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
//---------------------------------------------------

restaurantController.getSignupMyRestaurant = async (req, res) => {
  try {
    // MANTIQ: Bizga render qilishi kk. Yani signup pageni berishi kk
    console.log("GET: cont/getSignupMyRestaurant");
    res.render("signup");
  } catch (err) {
    console.log(`Error, cont/getSignupMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.signupProcess = async (req, res) => {
  try {
    console.log("POST: cont/signupProcess");

    assert(req.file, Definer.general_err3);

    let new_member = req.body;
    new_member.mb_type = "RESTAURANT";
    new_member.mb_image = req.file.path;

    const member = new Member();
    const result = await member.signupData(new_member);
    assert(result, Definer.general_err1);

    req.session.member = result;
    res.redirect("/resto/products/menu");
  } catch (err) {
    console.log(`Error, cont/signupProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

//---------------login-------------------------------

restaurantController.getLoginMyRestaurant = async (req, res) => {
  try {
    // MANTIQ: Bizga render qilishi kk. Yani signup pageni berishi kk
    console.log("GET: cont/getLoginMyRestaurant");
    res.render("login-page");
  } catch (err) {
    console.log(`Error, cont/getLoginMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.loginProcess = async (req, res) => {
  try {
    console.log("POST: cont/loginProcess");
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data);

    req.session.member = result;
    req.session.save(function () {
      result.mb_type === "ADMIN"
        ? res.redirect("/resto/all-restaurant")
        : res.redirect("/resto/products/menu");
    });
  } catch (err) {
    console.log(`Error, cont/loginProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

//----------------------------------------------------
restaurantController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout sahifasidasiz");
};
//============================================================
// Kirib kelayotgan sessionni tekshiradi, TYPE: RESTAURANT
restaurantController.validateAuthRestaurant = (req, res, next) => {
  if (req.session?.member?.mb_type === "RESTAURANT") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "fail",
      message: "only authenticated members with restaurant type",
    });
};

//----------------------checkSessions------------------------
restaurantController.checkSessions = (req, res) => {
  if (req.session?.member) {
    res.json({ state: "succeed", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "You are not authenticated" });
  }
};
