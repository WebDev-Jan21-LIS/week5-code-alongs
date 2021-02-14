const bcrypt = require('bcryptjs');
const plainPassword = 'cat';

const saltRounds = 10;
let salt = bcrypt.genSaltSync(saltRounds);
console.log(`Salt ${salt}`);
const hashedPassword = bcrypt.hashSync(plainPassword, salt);
console.log(`my hashed password is ${hashedPassword}`);
const verifyPassword = bcrypt.compareSync(plainPassword, hashedPassword);
const notVerifiedPassword = bcrypt.compareSync('gato', hashedPassword);

console.log(verifyPassword);
console.log(notVerifiedPassword);

