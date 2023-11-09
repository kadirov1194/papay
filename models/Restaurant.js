const assert = require("assert");
const MemberModel = require("../schema/member_model"); // schema modelni chaqirib olish
const Definer = require("../lib/mistake");
class Restaurant {
  constructor() {
    this.memberModel = MemberModel; // Member Schema modelni chaqirib olamiz
  }

  async getAllRestaurantsData() {
    try {
      const result = await this.memberModel
        .find({
          mb_type: "RESTAURANT",
        })
        .exec();

      assert(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
  async updateRestaurantByAdmin(update_data) {
    try {
      const id = shapeIntoMongooseObjectId(update_data?.id);
      const result = await this.memberModel
        .findByIdAndUpdate({ _id: id }, update_data, {
          runValidators: true,
          lean: true,
          returnDocument: "after",
        })
        .exec();
      assert(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Restaurant;