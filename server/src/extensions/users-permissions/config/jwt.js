const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  jwt: {
    options: {
      expiresIn: "7d",
      secret: process.env.JWT_SECRET || "defaultSecret",
    },
    payload: (user) => {
      const sanitizedUser = sanitizeEntity(user, {
        model: strapi.query("user", "users-permissions").model,
      });
      if (
        sanitizedUser &&
        sanitizedUser.id &&
        sanitizedUser.username &&
        sanitizedUser.email &&
        sanitizedUser.role &&
        sanitizedUser.role.name
      ) {
        console.log("Work")
        return {
          id: sanitizedUser.id,
          username: sanitizedUser.username,
          email: sanitizedUser.email,
          role: sanitizedUser.role.name,
        };
      } else {
        console.log("Not work");
        return {};
      }
    },
  },
};
