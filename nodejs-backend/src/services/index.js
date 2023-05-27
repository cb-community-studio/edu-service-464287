const users = require("./users/users.service.js");
const school = require("./school/school.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(school);
  // ~cb-add-configure-service-name~
};
