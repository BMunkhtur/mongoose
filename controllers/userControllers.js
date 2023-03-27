const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  const { name, email, profileImg } = req.body;
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  try {
    // if (!name || !email || !password) {
    //   res
    //     .status(400)
    //     .json({ message: "Нэр, имэйл эсвэл нууц үг байхгүй байна." });
    // }

    const user = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json({ message: "Амжилттай бүртгэгдлээ", user });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id} -хоосон байна.` });
  }

  try {
    const user = await User.findById(`${id}`);
    if (!user) {
      res.status(400).json({ message: `${id} -тэй хэрэглэгч олдохгүй байна.` });
    }

    res.status(200).json({ message: `${id} тэй хэрэглэгч олдлоо`, user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id} -хоосон байна.` });
  }

  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      res.status(400).json({ message: `${id} -тэй хэрэглэгч олдсонгүй.` });
    }
    res.status(200).json({ message: `${id} тэй хэрэглэгч шинэчлэгдлээ`, user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id} -тэй хэрэглэгч олдсонгүй.` });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: `${id} тэй хэрэглэгч устгагдлаа`, user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  console.log("--------------", req.body);
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    console.log("user", user);
    if (!user) {
      res.status(400).json({ message: `Имэйл эсвэл нууц үг буруу байна` });
    }

    const checkPass = bcrypt.compareSync(req.body.password, user.password);
    console.log(checkPass);

    if (!checkPass) {
      res.status(400).json({ message: `Имэйл эсвэл нууц үг буруу байна` });
    }

    const { password, _id, name, email, role } = user;

    const token = jwt.sign(
      { _id, name, email, role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 36000,
      }
    );

    res.status(200).json({ message: `Амжилттай нэвтэрлээ`, user, token });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(200).json({ message: `Амжилттай бүртгэгдлээ`, user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
