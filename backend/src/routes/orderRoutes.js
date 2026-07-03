import express from 'express';
import sendEmail from '../utils/sendEmail';


await sendEmail({
  to: user.email,
  subject: "Welcome!",
  text: "Thanks for signing up.",
});



