const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Create a transporter using Gmail (you can change this to your email provider)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || "chhikaraconstructions@gmail.com",
    pass: process.env.EMAIL_PASS || "your-app-password",
  },
});

// POST /api/contact - Send contact form email
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message:
          "Please provide all required fields: name, email, subject, and message",
      });
    }

    // Email content for the company
    const companyEmailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
      <hr>
      <p><em>This email was sent from the CHHIKARA CONSTRUCTIONS contact form.</em></p>
    `;

    // Email content for the customer (auto-reply)
    const customerEmailContent = `
      <h2>Thank you for contacting CHHIKARA CONSTRUCTIONS!</h2>
      <p>Dear ${name},</p>
      <p>Thank you for reaching out to us. We have received your message and will get back to you within 24 hours during business days.</p>
      
      <h3>Your Message Summary:</h3>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
      
      <hr>
      <h3>Contact Information:</h3>
      <p><strong>Phone:</strong> +91 8588890900, +91 8572072364</p>
      <p><strong>Email:</strong> chhikaraconstructions@gmail.com</p>
      <p><strong>Address:</strong> D-1, Baraf Khana Road, Jhajjar-124103, Haryana</p>
      <p><strong>Emergency Line:</strong> +91 8588890900</p>
      
      <p>Best regards,<br>
      Vishal Chhikara</p>
    `;

    // Send email to company
    const companyMailOptions = {
      from: `"CHHIKARA CONSTRUCTIONS Contact Form" <${
        process.env.EMAIL_USER || "chhikaraconstructions@gmail.com"
      }>`,
      to: process.env.COMPANY_EMAIL || "chhikaraconstructions@gmail.com",
      subject: `New Contact Form: ${subject}`,
      html: companyEmailContent,
      replyTo: email,
    };

    // Send auto-reply to customer
    const customerMailOptions = {
      from: `"CHHIKARA CONSTRUCTIONS" <${
        process.env.EMAIL_USER || "chhikaraconstructions@gmail.com"
      }>`,
      to: email,
      subject: `Thank you for contacting CHHIKARA CONSTRUCTIONS - ${subject}`,
      html: customerEmailContent,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

    res.status(200).json({
      message: "Message sent successfully! We will get back to you soon.",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      message: "Failed to send message. Please try again later.",
    });
  }
});

module.exports = router;
