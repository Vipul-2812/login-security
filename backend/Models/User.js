

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        enum: ['user', 'admin'], // Only 'user' or 'admin' as valid values
        default: 'user', // Default to 'user' if not specified
    },
   
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
