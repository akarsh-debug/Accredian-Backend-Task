import prisma from "../config/database.js";
import nodemailer from "nodemailer";
import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^\+?\d{10,15}$/.test(phone);

const sendMail = async (senderId, receiverId, userName, friendName) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER_ID,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOption = {
      from: senderId,
      to: [senderId, receiverId],
      subject: `${userName} Referred You To Accredian`,
      text: `Hi ${friendName}, I am inviting you to Accredian. Check it out here: https://accredian.com`,
    };

    await transport.sendMail(mailOption);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

export const createReferral = async (req, res) => {
  try {
    const {
      referee_name,
      referee_email,
      referee_phone,
      vertical,
      program,
      referrer_name,
      referrer_email,
      referrer_phone,
    } = req.body;

    // Trim and Validate Inputs
    if (![referee_name, referee_email, referee_phone, referrer_name, referrer_email, referrer_phone,].every(Boolean)) {
      return res.status(400).json({ status: 400, message: "Required fields missing" });
    }

    if (!validateEmail(referee_email) || !validateEmail(referrer_email)) {
      return res.status(422).json({ status: 422, message: "Invalid Email Format" });
    }

    if (!validatePhone(referee_phone) || !validatePhone(referrer_phone)) {
      return res.status(422).json({ status: 422, message: "Invalid Phone Format" });
    }

    // Use a Prisma transaction for atomicity
    await prisma.$transaction(async (tx) => {
      const existingReferral = await tx.referral.findFirst({
        where: {
          referrer_email: referrer_email,
          referee_email: referee_email
        }
      });

      if (existingReferral) {
        throw new Error("Referral already exists");
      }

      // Create the new referral
      await tx.referral.create({
        data: {
          referee_name,
          referee_email,
          referee_phone,
          vertical,
          program,
          referrer_name,
          referrer_email,
          referrer_phone
        }
      });
    });

    await sendMail(referrer_email, referee_email, referrer_name, referee_name);
    return res.status(201).json({ status: 201, message: "Referral Created Successfully" });
  } catch (error) {
      if (error.message === "Referral already exists") {
        return res.status(409).json({ status: 409, message: "Referral already exists" });
      }
        
    console.error("Error creating referral:", error);
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};
