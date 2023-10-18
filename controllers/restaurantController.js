const Member = require("../models/Member");

let restaurantController = module.exports;

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

    res.json({ state: "succeed", data: new_member });
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

    res.json({ state: "succeed", data: result });
  } catch (err) {
    console.log(`Error, cont/login, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout sahifasidasiz");
};
