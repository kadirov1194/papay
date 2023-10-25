let productController = module.exports;

productController.getAllProducts = async (req, res) => {
  try {
    console.log("GET: cont/getAllProducts");
  } catch {
    console.log(`ERROR, cont/getAllProducts, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

//=================addNewProduct===================================
productController.addNewProduct = async (req, res) => {
  try {
    console.log("POST: cont/addNewProduct");
    console.log(req.member);
    //TODO: product creation develop
  } catch {
    console.log(`ERROR, cont/addNewProduct, ${err.message}`);
  }
};

//=====================updateChosenProduct===========================
productController.updateChosenProduct = async (req, res) => {
  try {
    console.log("POST: cont/updateChosenProduct");
  } catch {
    console.log(`ERROR, cont/updateChosenProduct, ${err.message}`);
  }
};
