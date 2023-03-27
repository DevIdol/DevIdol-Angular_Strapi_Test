module.exports = {
  routes: [
    {
      method: "GET",
      path: "/users",
      handler: "user.find",
      config: {
        // policies: ["plugins::users-permissions.permissions"],
      },
    },
    {
      method: "GET",
      path: "/users/:id",
      handler: "user.findOne",
      config: {
        policies: ["plugins::users-permissions.permissions"],
      },
    },
    {
      method: "POST",
      path: "/users",
      handler: "user.create",
      config: {
        policies: ["plugins::users-permissions.permissions"],
      },
    },
    {
      method: "PUT",
      path: "/users/:id",
      handler: "user.update",
      config: {
        policies: ["plugins::users-permissions.permissions"],
      },
    },
    {
      method: "DELETE",
      path: "/users/:id",
      handler: "user.delete",
      config: {
        policies: ["plugins::users-permissions.permissions"],
      },
    },
  ],
};
