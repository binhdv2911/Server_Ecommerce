const User = require("../model/user");
const Profile = require("../model/profile");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signToken = (user) => {
  return (
    "Bearer " +
    jwt.sign(
      {
        fullName: user.fullName,
        age: user.age,
        birthday: user.birthday,
        _id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    )
  );
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({
        resultCd: 1,
        message: "Account does not exist",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        resultCd: 2,
        message: "Password is incorrect",
      });
    }
    const token = signToken(user);
    return res.status(200).json({
      resultCd: 0,
      username: user.username,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      resultCd: -1,
      message: "Cannot connect to server",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      users: users,
    });
  } catch (error) {
    console.log("abcd");
  }
};

exports.register = async (req, res) => {
  const { username, password, fullname, birthDate, age } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({
        message: "Account already exist",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    const newProfile = new Profile({
      user: newUser._id,
      fullname: fullname,
      birthDate: birthDate,
      age: age,
    });

    await newProfile.save();

    return res.status(200).json({
      resultCd: 0,
      username: newUser.username,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Cannot connect to server",
    });
  }
};

exports.profile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const profile = await Profile.findOne({ user: user._id });
    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      _id: profile._id,
      user: profile.user,
      fullname: profile.fullname,
      birthDate: profile.birthDate,
      age: profile.age,
      __v: profile.__v,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Cannot connect to server",
    });
  }
};
