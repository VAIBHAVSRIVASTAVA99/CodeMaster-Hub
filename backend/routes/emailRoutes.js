const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Email = require('../models/Email');
const {
  fetchRandomLeetCodeQuestion,
  fetchRandomCodeforcesQuestion,
  fetchRandomCodeChefQuestion
} = require('../services/problemService');
const mongoose = require('mongoose');

router.post('/store-email', async (req, res) => {
  try {
    const { email, platform } = req.body;
    
    if (!email || !platform) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and platform are required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid email format'
      });
    }

    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection is not ready');
    }

    const savedEmail = await Email.findOneAndUpdate(
      { email },
      { email },
      { upsert: true, new: true }
    );

    let fetchQuestion;
    if (platform === 'LeetCode') {
      fetchQuestion = fetchRandomLeetCodeQuestion;
    } else if (platform === 'Codeforces') {
      fetchQuestion = fetchRandomCodeforcesQuestion;
    } else if (platform === 'Codechef') {
      fetchQuestion = fetchRandomCodeChefQuestion;
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid platform selected'
      });
    }

    if (typeof fetchQuestion !== 'function') {
      throw new Error(`Question fetcher for ${platform} is not properly initialized`);
    }
    
    const question = await fetchQuestion();
    if (!question) {
      throw new Error(`Failed to fetch question from ${platform}`);
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email service not configured');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Welcome! ${platform} Question`,
      html: `
        <h1>${platform} Question</h1>
        <p><strong>${question.title}</strong></p>
        <p>Difficulty: ${question.difficulty}</p>
        <p><a href="${question.url}" target="_blank">Solve this problem</a></p>
      `,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });

    return res.status(200).json({
      status: 'success',
      message: `Welcome email sent to ${email} with a ${platform} coding problem.`,
      data: question,
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message || 'An error occurred while processing your subscription'
    });
  }
});

module.exports = router;
