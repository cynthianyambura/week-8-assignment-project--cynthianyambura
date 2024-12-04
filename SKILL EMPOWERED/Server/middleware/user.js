const bcrypt = require('bcrypt');

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

User.prototype.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
