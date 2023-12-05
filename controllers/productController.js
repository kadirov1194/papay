const Product = require("../models/Product");
const assert = require("assert");
const Definer = require("../lib/mistake");

let productController = module.exports;

productController.getAllProducts = async (req, res) => {
  try {
    console.log("POST: cont/getAllProducts");
    const product = new Product();
    const result = await product.getAllproductsData(req.member, req.body);
    res.json({ state: "succeed", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getAllProducts, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

productController.getChosenProduct = async (req, res) => {
  try {
    console.log("POST: cont/getChosenProduct");
    const product = new Product(); //Product service modeldan instance olyapmiz
    const id = req.params.id;
    const result = await product.getChosenProductData(req.member, id);
    res.json({ state: "succeed", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getChosenProduct, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

/****************************************
 * BSSR RELATED METHODS
 ****************************************/

//=================addNewProduct===================================
productController.addNewProduct = async (req, res) => {
  try {
    console.log("POST: controller/addNewProduct");
    // console.log("Request files: ", req.files);
    assert.ok(req.files, Definer.general_err3);
    // console.log(req.member);
    const product = new Product();
    let data = req.body;

    data.product_images = req.files.map((ele) => {
      return ele.path.replace(/\\/g, "/");
    });

    const result = await product.addNewProductData(data, req.member);

    const html = `<script>
                    alert('new dish added successfully');
                    window.location.replace('/resto/products/menu');
                  </script>`;
    res.end(html);
    //Constructs an HTML response containing a JavaScript alert and a redirection to the product menu page and sends it as the response.
  } catch (err) {
    console.log(`Error, controller/addNewProduct, ${err.message}`);
  }
};
//=====================updateChosenProduct===========================
productController.updateChosenProduct = async (req, res) => {
  try {
    console.log("POST: controller/updateChosenProduct");
    const product = new Product(); //product Schema model OBJECT dan Instance hosil qildik
    const id = req.params.id; // params ni ichidan product id ni oldik
    const result = await product.updateChosenProductData(
      id,
      req.body,
      req.member._id
    );
    await res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, controller/updateChosenProduct, ${err.message}`);
    // res.json({ state: "fail", message: err.message });
  }
};
