const db = require('../db/pg');
exports.createUser = (name, email, hashed, profileImageUrl) => {

  db.query('INSERT INTO users(email, password, name, profile_image) VALUES($1,$2,$3, $4)', [email, hashed, name, profileImageUrl]);}
exports.findUserByEmail = (email) =>
  db.query('SELECT * FROM users WHERE email=$1', [email]).then(r => r.rows[0]);
