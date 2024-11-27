const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }

    user = new User({ name, email, password, role })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err
        res.json({ token, user: payload.user })
      },
    )
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err
        res.json({ token, user: payload.user })
      },
    )
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find() // Fetch all users from MongoDB
    res.status(200).json(users) // Send the users as a response
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch users' })
  }
}
