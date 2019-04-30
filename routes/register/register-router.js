const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../data/dbConfig');

router.post('/', async (req, res) => {
  try {
    let user = req.body;
    if (!user.username || !user.password || !user.email) {
      res.status(400).json({ message: "please fill in all fields" });
    } else {
      user.password = bcrypt.hashSync(user.password, 12);
      const id = await db('users').insert(user).returning("id");
      if (id > 0) {
        res.status(201).json({ message: "Registration Complete", registered: true });
      } else {
        res.status(500).json({ message: "Pick a new username please" })
      }

    }
  } catch (error) {
    res.status(500).json({ message: "internal server error", error: error });
  }
});

router.post('/oauth', async (req, res) => {
  try {
    let user = req.body;
    if (!user.name || !user.email) {
      res.status(400).json({ message: "please fill in all fields" });
    } else {
      const id = await db('usersOAuth').insert(user).returning("id");
      if (id > 0) {
        let {token, name, email} = user;
        res.status(200).json({ token, name, email });  
      } else {
        res.status(500).json({ message: "Pick a new username please" })
      }

    }
  } catch (error) {
    res.status(500).json({ message: "internal server error", error: error });
  }
});

module.exports = router;