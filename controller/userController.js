const bcrypt = require("bcrypt");
const { client } = require("../utils");
const { writeAuditLog } = require("../helper");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await client.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role,
      },
    });
    await writeAuditLog(name, "User created");
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await client.user.findUnique({
    where: {
      email,
    },
  });
  if (!user || !bcrypt.compare(password, user.password)) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, "secret");
  res.json({
    success: true,
    message: "Logged in successfully",
    token,
    user,
  });
};

const sendOtp = async (req, res) => {
  const otp = "123456";
  res.status(200).json({
    success: true,
    message: "OTP sent successfully",
    otp,
  });
};

const verifyOtp = async (req, res) => {
  const { email, role, name, otp } = req.body;
  try {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      if (otp == 123456) {
        const token = jwt.sign({ id: user.id, role: user.role }, "secret");
        await writeAuditLog(user.name, "User logged in");
        return res.status(200).json({
          success: true,
          message: "OTP verified successfully",
          token,
          user,
        });
      }
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (!user) {
      const newUser = await client.user.create({
        data: {
          email,
          role,
          name,
        },
      });
      const token = jwt.sign({ id: newUser.id, role: newUser.role }, "secret");
      await writeAuditLog(newUser.name, "User logged in");
      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        token,
        user: newUser,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { createUser, loginUser, sendOtp, verifyOtp };
