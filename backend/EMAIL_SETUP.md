# Email Setup Instructions for Contact Form

Your contact form is already fully implemented and ready to send emails to `chhikaraconstructions@gmail.com`. You just need to configure the email settings.

## Step 1: Create .env file

Create a `.env` file in the `backend` directory with the following content:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/construction_firm

# Server Configuration
PORT=5001
NODE_ENV=development

# Email Configuration (for contact form)
EMAIL_USER=chhikaraconstructions@gmail.com
EMAIL_PASS=your-gmail-app-password-here
COMPANY_EMAIL=chhikaraconstructions@gmail.com

# JWT Secret (generate a strong random string)
JWT_SECRET=your-strong-random-secret-key-here-make-it-long-and-complex
```

## Step 2: Gmail App Password Setup

1. Go to your Gmail account settings
2. Enable 2-factor authentication if not already enabled
3. Go to "Security" > "App passwords"
4. Generate a new app password for "Mail"
5. Replace `your-gmail-app-password-here` in the .env file with the generated password

## Step 3: JWT Secret Setup

Replace `your-strong-random-secret-key-here-make-it-long-and-complex` with a strong random string:

- Use at least 32 characters
- Mix letters, numbers, and symbols
- Example: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6`

## Step 4: Test the Contact Form

1. Start the backend server: `npm run dev`
2. Start the frontend: `npm start`
3. Go to the contact page and submit a test message
4. Check your email inbox for the contact form submission

## How It Works

The contact form will:

1. Send a notification email to `chhikaraconstructions@gmail.com` with the contact details
2. Send an auto-reply to the customer confirming receipt of their message
3. Display success/error notifications in the frontend

## Current Features

✅ Complete contact form with validation
✅ Email notifications to company email
✅ Auto-reply to customers
✅ Professional email templates
✅ Error handling and user feedback
✅ Responsive design
✅ Business hours and contact information display

## For GitHub Deployment

**IMPORTANT**: Never commit your `.env` file to GitHub!

1. The `.env` file is already included in `.gitignore`
2. For collaborators, they need to create their own `.env` file using the template above
3. For production deployment, set these environment variables in your hosting platform

## Troubleshooting

If emails aren't sending:

1. Verify the Gmail app password is correct
2. Check that 2-factor authentication is enabled
3. Ensure the EMAIL_USER email address is correct
4. Check server logs for any error messages
