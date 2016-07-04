var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");

var SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    displayName: {type: String},
    bio: {type: String}
});

var noop = function () {
};

userSchema.pre("save", function (next) {
    var user = this;

    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, noop, function (err, hashedPassword) {
            if (err) {
                return next(err);
            }
            user.password = hashedPassword;
            next();
        });
    });
});

userSchema.methods.checkPassword = function (guess, done) {
    bcrypt.compare(guess, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
};

userSchema.methods.name = function () {
    return this.displayName || this.username;
};

var User = mongoose.model("User", userSchema);

module.exports = User;
