const { User } = require("../../models");

const handleSignup = async (req, res) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;

    const newUser = await User.create({
      first_name,
      last_name,
      username,
      email,
      password,
    });

    // req.session.save(() => {
    //   (req.session.isLoggedIn = true),
    //     (req.session.userId = newUser.id),
    //     (req.session.username = newUser.username),
    // });
    res.status(201).json({ success: "User has been created!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

module.exports = handleSignup;