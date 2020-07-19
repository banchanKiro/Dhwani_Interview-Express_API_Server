exports.up = function (knex) {
  return knex.raw(`
  CREATE OR REPLACE VIEW child_view AS 
    SELECT c.id AS id, c.name AS name, c.sex AS sex, c.dob AS dob, 
      c.father AS father, c.mother AS mother, c.created_at AS created_at, 
      c.updated_at AS updated_at, d.id AS district_id, d.name AS district,
      s.id AS state_id, s.name AS state
    FROM child c 
    INNER JOIN district d ON d.id = c.district
    INNER JOIN state s ON s.id = d.state;
  `);
};

exports.down = function (knex) {
  knex.raw(`DROP VIEW child_view;`);
};
