import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && !user.isGuest && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const guestLogin = async (req, res) => {
  try {
    // Generate random guest identity
    const guestId = Math.random().toString(36).substring(7);
    const username = `Guest_${guestId}`;
    const email = `guest_${guestId}@checksy.local`;
    const password = await bcrypt.hash(guestId, 10);
    
    const guestExpiry = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now

    const user = await User.create({
      username,
      email,
      password,
      isGuest: true,
      guestExpiry
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        isGuest: true,
        guestExpiry: user.guestExpiry,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Failed to create guest session' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
