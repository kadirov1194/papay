const assert = require("assert");
const Order = require("../models/Order");

let orderController = module.exports;
const Definer = require("../lib/mistake");

orderController.createOder = async (req, res) => {
  try {
    console.log(`POST: cont/createOder`);
    assert.ok(req.member, Definer.auth_err5);

    // console.log(req.body);

    const order = new Order();
    const result = await order.createOrderData(req.member, req.body);

    res.json({ state: "success", data: new_member });
  } catch (err) {
    console.log(`ERROR, cont/createOder, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
