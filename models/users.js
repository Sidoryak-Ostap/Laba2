const {Schema, model} = require('mongoose');


const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {type: String, required: true},
    apiKey: {type: String, required: true, unique: true}
})


const User = new model('users', schema, 'users');

module.exports = {User}
