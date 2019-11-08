exports.up = function(knex) {
  return (
    knex.schema
      //Projects table
      .createTable("projects", tbl => {
        tbl.increments();
        tbl
          .string("project_name", 255)
          .notNullable()
          .unique();
        tbl.string("project_description", 255);
        tbl
          .boolean("complete")
          .notNullable()
          .defaultTo(0);
      })
      //Resources table
      .createTable("resources", tbl => {
        tbl.increments();
        tbl
          .string("resource_name", 255)
          .notNullable()
          .unique();
        tbl.string("resource_description", 255);
      })
      //tasks table
      .createTable("tasks", tbl => {
        tbl.increments();
        tbl
          .string("task_description", 500)
          .notNullable()
          .unique();

        tbl.string("task_notes", 500);

        tbl
          .boolean("complete")
          .notNullable()
          .defaultTo(0);

        // foreign key for Project id
        tbl
          .integer("project_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("projects")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
      //Projects_Resources table
      .createTable("project_resources", tbl => {
        tbl.increments();

        // foreign key for Project id
        tbl
          .integer("project_id")
          .unsigned()
          .references("id")
          .inTable("projects")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");

        // Foreign Key for Resources id
        tbl
          .integer("resource_id")
          .unsigned()
          .references("id")
          .inTable("resources")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
  );
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
