const assert = require("assert");
const { shapeIntoMongooseObjectId } = require("../lib/config");
const ProductModel = require("../schema/product_model");
const Definer = require("../lib/mistake");

class Product {
  constructor() {
    this.productModel = ProductModel;
  }

  async getAllProductsDataResto(member) {
    try {
      member._id = shapeIntoMongooseObjectId(member._id); //mongodb objectga aylantirib beradi
      const result = await this.productModel.find({
        restaurant_member_id: member._id,
      }); //Schema modeldan olyapti

      assert.ok(result, Definer.general_err1);
      console.log("result", result);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async addNewProductData(data, member) {
    try {
      data.restaurant_mb_id = shapeIntoMongooseObjectId(member._id);

      const new_product = new this.productModel(data);
      const result = await new_product.save();

      assert.ok(result, Definer.product_err1);

      return result;
    } catch (err) {
      throw err;
    }
  }

  async updateChosenProductData(id, updated_data, mb_id) {
    try {
      id = shapeIntoMongooseObjectId(id);
      mb_id = shapeIntoMongooseObjectId(mb_id);

      const result = await this.productModel
        .findOneAndUpdate(
          {
            _id: id,
            restaurant_member_id: mb_id,
          },
          updated_data,
          {
            runValidators: true,
            lean: true,
            returnDocument: "after",
          }
        )
        .exec();

      //natijani tekshiramiz. Agar natija Update bolmagan bo'lsa: err
      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;