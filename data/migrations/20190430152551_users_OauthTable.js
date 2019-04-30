exports.up = function(knex) {
    return knex.schema.createTable("usersOAuth", user => {
      user.increments("id");
  
      user
        .string("name", 128)
        .notNullable()
  
      user.string("email", 128).unique();
      user.string("provider");
      user.integer("provider_id")
      user.string("provider_pic")
      user.string("token");

    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("userOAuth");
  };
  