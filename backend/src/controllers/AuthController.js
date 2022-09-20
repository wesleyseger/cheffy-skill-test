import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { getHashPassword, createNewUser, getUser, getTokenByUser, insertToken, updatePassword, getUserByToken, deleteToken } from '../database/Authentication.js';
import sendEmail from '../utils/sendEmail.js';
import { resetPasswordMail, welcomeMail } from '../utils/templateMails.js';

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
}

async function generateHash(password) {
  return await bcrypt.hash(password, 10);
}

const login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  try {
    let hashedPassword = await getHashPassword(username);
    let match = await bcrypt.compare(password, hashedPassword)

    if (match) {
      const token = generateAccessToken({ username: username });
      const user = await getUser(username);
      res.json({ auth: true, user: user, token: 'Bearer ' + token });
    }
    else res.status(401).json({ auth: false, token: null })
  } catch (err) {
    res.status(401).json({ auth: false, token: null })
  }
}

const signUp = async (req, res) => {
  let name = req.body.name;
  let username = req.body.email;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;

  try {
    if (password !== confirmPassword) {
      res.status(400).send({ success: false, error: `Confirm password didn't match` });
    }

    if (!name || !username || !password || !confirmPassword) {
      res.status(400).send({ success: false, error: `Fill all fields to create account` });
    }
    else {
      let hashPassword = await generateHash(password);
      let createdUser = await createNewUser(name, username, hashPassword);
      sendEmail(username, 'Welcome to Cheffy!', welcomeMail(name))
      res.send({ success: true, created_id: createdUser });
    }
  }
  catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      res.status(400).send({ success: false, error: 'User already exists' })
  }
}

const forgetPassword = async (req, res) => {
  let username = req.body.email;

  try {
    let user = await getUser(username);
    if (user) {

      let token = await getTokenByUser(user.username);
      if (!token) {
        let newToken = crypto.randomBytes(32).toString("hex");
        await insertToken(user.username, newToken);
        token = newToken;
      }

      console.log(token);

      let link = `${process.env.BASE_URL}/password-reset/${token}`;
      sendEmail(user.username, 'Reset password', resetPasswordMail(user.name, link));
    }
    res.send(200)

  }
  catch (err) {
    console.log(err);
    res.send(400)
  }
}

const resetPassword = async (req, res) => {
  const token = req.body.token;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword

  try {
    let user = await getUserByToken(token);

    if (password !== confirmPassword) {
      res.status(400).send({ success: false, error: `Confirm password didn't match` });
    }
    else if (!password || !confirmPassword || !token) {
      res.send(400).send({ success: false, error: `Fill all fields to continue` });
    }
    else if (!user) {
      res.status(400).send({ success: false, error: `Invalid or expired token` })
    }

    else {
      let hashPassword = await generateHash(password);
      let result = await updatePassword(token, hashPassword);
      await deleteToken(user.username)
      res.sendStatus(200);
    }
  }
  catch (err) {
    res.send(err);
  }
}

export default { login, signUp, forgetPassword, resetPassword };