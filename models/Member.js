const MemberModel = require("../schema/member_model"); // schema modelni chaqirib olish
const Definer = require("../lib/mistake");
class Member {
  constructor() {
    this.memberModel = MemberModel;
  }
  async signupData(input) {
    try {
      const new_member = new this.memberModel(input);
      let result;

      try {
        result = await new_member.save();
      } catch (mongo_err) {
        console.log(mongo_err);
        throw new Error(Definer.auth_err1);
      }

      result.mb_password = "";
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;
