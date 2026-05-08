const moonoose = require('mongoose');

const userSchema = new moonoose.Schema({
    googleId: String,
    displayName: String,
    email: String,
    image: String,
}, { timestamps: true });

const userDb = new moonoose.model('users', userSchema);

module.exports = userDb;