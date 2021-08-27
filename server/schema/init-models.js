var DataTypes = require("sequelize").DataTypes;
var _article = require("./article");
var _category = require("./category");
var _comment = require("./comment");
var _ip = require("./ip");
var _reply = require("./reply");
var _tag = require("./tag");
var _user = require("./user");

function initModels(sequelize) {
  var article = _article(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var ip = _ip(sequelize, DataTypes);
  var reply = _reply(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  ip.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(ip, { as: "ips", foreignKey: "userId"});

  return {
    article,
    category,
    comment,
    ip,
    reply,
    tag,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
