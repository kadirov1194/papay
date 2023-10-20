const Member = require("../models/Member");

let restaurantController = module.exports;
//-------------------------------------------------------

restaurantController.getMyRestaurantData = async (req, res) => {
  try {
    console.log("GET: cont/getSignupMyRestaurant");
    // TODO: Get my restaurant Product

    res.render("restaurant-menu");
  } catch {
    console.log(`Error, cont/getSignupMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
//---------------------------------------------------

restaurantController.getSignupMyRestaurant = async (req, res) => {
  try {
    // MANTIQ: Bizga render qilishi kk. Yani signup pageni berishi kk
    console.log("GET: cont/getSignupMyRestaurant");
    res.render("signup");
  } catch {
    console.log(`Error, cont/getSignupMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.signupProcess = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    const data = req.body,
      member = new Member(),
      new_member = await member.signupData(data);

    req.session.member = new_member;
    res.redirect("/resto/products/menu");

    // SESSION
    // res.json({ state: "succeed", data: new_member });
  } catch (err) {
    console.log(`Error, cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

//---------------login-------------------------------

restaurantController.getLoginMyRestaurant = async (req, res) => {
  try {
    // MANTIQ: Bizga render qilishi kk. Yani signup pageni berishi kk
    console.log("GET: cont/getLoginMyRestaurant");
    res.render("login-page");
  } catch {
    console.log(`Error, cont/getLoginMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.loginProcess = async (req, res) => {
  try {
    console.log("POST: cont/login");
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data);

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/resto/products/menu");
    });
  } catch (err) {
    console.log(`Error, cont/login, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

//----------------------------------------------------
restaurantController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout sahifasidasiz");
};

//----------------------checkSessions------------------------
restaurantController.checkSessions = (req, res) => {
  if (req.session?.member) {
    res.json({ state: "succeed", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "You are not authenticated" });
  }
};
