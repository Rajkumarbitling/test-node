const router = require("express").Router();
const jwt = require("jsonwebtoken");

const dummyUsers = [
  {
    email: "test@gmail.com",
    password: "test123",
  },
];
const secretKey = "secretKey";

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({
        message: "User Registration Unsuccessful",
    });
    return;
  }

  const user = {
    email,
    password,
  };

  dummyUsers.push(user);

  res.status(200).json({
    message: "User Registered Successfully",
  });
});

router.post("/logout", (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(401).json({
      message: "Token is Mandatory",
    });
    return;
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({
        message: "Invalid Token",
      });
      return;
    }
    res.status(200).json({
      message: "Logout Successful",
    });
  });
});

router.post("/forgot-password", (req, res) => {
  // TODO: Implement Forgot Password Logic
  const { email } = req.body;

  if (!email) {
    res.status(400).json({
      message: "Email is required",
    });
    return;
  }

  const user = dummyUsers.find((user) => user.email === email);

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  // In a real application, you would generate a unique token and send a password reset email
  // For this example, we'll just simulate the process

  const resetToken = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

  // Here you would typically send an email with a link containing the reset token
  // For demonstration, we'll just return the token in the response

  res.status(200).json({
    message: "Password reset instructions sent",
    resetToken: resetToken,
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).json({
        message: "Email and Password is Mandatory",
    });
    return;
  }

  const user = dummyUsers.filter((user) => user.email === email);

  if (user.length === 0) {
    res.status(401).json({
      message: "Invalid User",
    });
    return;
  }

  if (user[0].password !== password) {
    res.status(401).json({
      message: "Invalid Passowrd",
    });
    return;
  }

  const token = jwt.sign(user[0], secretKey);

  res.status(200).json({
    token,
    message: "Login Successful",
  });
});

module.exports = router;
