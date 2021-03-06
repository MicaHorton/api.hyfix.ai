const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    console.log(user);

    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    } 
    throw Error('incorrect email');
            
}

const User = mongoose.model('User', userSchema);
module.exports = User;

