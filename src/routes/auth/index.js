const { Router } = require('express');
const { encrypt, comparePasswords, hashPassword } = require('../../services/auth');
const validate = require('../../middleware/validate');
const loginRequest = require('../../requests/auth/login');
const registerRequest = require('../../requests/auth/register');
const { User } = require('../../models');

const router = Router();

const responseWrongPass = res => res.status(400).send({ message: 'Invalid email/password.' });
const responseUserExists = res => res.status(400).send({ message: 'User already exists.' });
const responseUserCreated = res => res.status(200).send({ messsage: 'User successfully created' });

router.post('/login', validate(loginRequest), async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      raw: true,
    });

    if (!user) {
      return responseWrongPass(res);
    }
    if (!(await comparePasswords(password, user.password))) {
      return responseWrongPass(res);
    }

    delete user.password;
    const token = encrypt(user);

    return res.status(200).send({ user, token });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Internal server error.' });
  }
});

router.post('/register', validate(registerRequest), async (req, res) => {
  try {
    const {
      email, password, firstName, lastName,
    } = req.body;

    const userExists = await User.findOne({
      where: { email },
      raw: true,
    });

    if (userExists) {
      return responseUserExists(res);
    }

    await User.create({
      email,
      firstName,
      lastName,
      password: hashPassword(password),
    });

    return responseUserCreated(res);
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Internal server error.' });
  }
});

module.exports = router;
