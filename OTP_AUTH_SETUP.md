# 🔐 OTP-Only Authentication System

## 🎯 Security Features

This system has been upgraded to use **OTP-only authentication** for maximum security:

- ✅ **No passwords to compromise**
- ✅ **Time-limited OTPs** (10 minutes expiry)
- ✅ **Fixed admin email** (no email enumeration)
- ✅ **Rate limiting** (5 attempts per 15 minutes)
- ✅ **IP-based attack protection**
- ✅ **Secure admin path** (`/secure-panel-x9k2m/`)

## 🔧 How It Works

### 1. **Request OTP**

- Admin clicks "Send OTP to Admin Email"
- System generates 6-digit OTP
- OTP sent to `chhikaraconstructions@gmail.com`
- OTP expires in 10 minutes

### 2. **Verify & Login**

- Admin enters OTP from email
- System validates OTP
- JWT token issued for 7 days
- Admin redirected to dashboard

## 📧 Email Configuration Required

### Backend Environment Variables (Railway):

```env
EMAIL_USER=chhikaraconstructions@gmail.com
EMAIL_PASS=your-gmail-app-password
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secure-jwt-secret
```

### Gmail App Password Setup:

1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Generate App Password for "Mail"
4. Use this password in `EMAIL_PASS`

## 🚀 Admin Access

### Login URL:

```
https://your-domain.com/secure-panel-x9k2m/login
```

### Admin Email:

```
chhikaraconstructions@gmail.com
```

## 🛡️ Security Benefits

1. **No Password Attacks**: No static passwords to brute force
2. **Email-Only Access**: Must have access to admin email
3. **Time-Limited**: OTPs expire quickly
4. **Rate Limited**: Prevents spam/abuse
5. **Obscure URL**: Admin panel not easily discoverable
6. **Audit Trail**: All attempts logged with IP addresses

## 🔍 Monitoring

Check backend logs for:

- `OTP sent to admin email from IP: xxx.xxx.xxx.xxx`
- `Successful OTP login from IP: xxx.xxx.xxx.xxx`
- `Invalid OTP attempt from IP: xxx.xxx.xxx.xxx`

## ⚡ Quick Setup

1. **Set email credentials** in Railway environment variables
2. **Deploy backend** with new auth system
3. **Deploy frontend** with OTP interface
4. **Test login** at `/secure-panel-x9k2m/login`

## 🚨 Important Notes

- **Admin email is fixed**: `admin@chhikaraconstructions.com` (database)
- **OTP delivery email**: `chhikaraconstructions@gmail.com` (Gmail)
- **No user input for email**: More secure, prevents enumeration
- **Password fields removed**: Completely password-free system
