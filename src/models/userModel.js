const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Validator = require("validator");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    validate(value) {
      if (!Validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    min: 7,
  },
  tokens: [
    {
      token: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

UserSchema.statics.findUserByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("unable to login");
  }

  return user;
};

UserSchema.methods.generateAuthToken = async function () {
  const accessToken = jwt.sign({ _id: this._id.toString() }, `${process.env.JWT_ACCESS}`);
  const refreshToken = uuid.v4();

  this.tokens = this.tokens.concat({ token: refreshToken });
  await this.save();
  return { accessToken, refreshToken };
};

const User = Mongoose.model("User", UserSchema);

module.exports = User;
