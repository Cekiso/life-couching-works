# LCW
# life-couching-works
# Life Coaching Works - Booking System Setup Guide

## 📋 Files Overview

### Required Files:
1. **form-handler.php** - Combined backend handler (API + email)
2. **main.js** - JavaScript for both contact form and booking system
3. **contact.html** - Contact form page
4. **waiting-room.html** - Time slot booking page
5. **db-schema.sql** - Database structure (from first artifact)

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Database Setup (Optional - works without it too)

```sql
-- Create database
CREATE DATABASE waiting_room_db;

-- Run the SQL from "Database Schema (MySQL)" artifact
-- This creates tables: time_slots, enquiries, bookings
```

### Step 2: Configure form-handler.php

```php
// Line 14-17: Database credentials
$host = 'localhost';
$dbname = 'waiting_room_db';
$username = 'root';           // Your MySQL username
$password = '';               // Your MySQL password

// Line 20: Email recipient (already set!)
$recipient = "info@life-coaching-works.com";

// Line 433-435: SMTP (optional, for better email delivery)
$mail->Username = 'info@life-coaching-works.com';
$mail->Password = 'your_app_password';  // Gmail app password
```

### Step 3: Upload Files to Server

```
your-website/
├── contact.php
├── validate.js
├── contact.html
├── booking.html
└── (your other files)
```

### Step 4: Update Form Actions

Both forms already point to `form-handler.php`:
```html
<!-- contact.html - line 49 -->
<form action="form-handler.php" method="POST" class="php-email-form">

<!-- main.js - line 8 -->
const API_URL = 'form-handler.php';
```

### Step 5: Test!

1. **Test Contact Form:**
   - Go to `contact.html`
   - Fill out form
   - Select "Book a Free Discovery Call"
   - Submit → Should redirect to `waiting-room.html`

2. **Test Booking System:**
   - Go to `waiting-room.html`
   - Select a date
   - Choose a time slot
   - Click "Confirm Booking"
   - Check your email!

---

## 🎯 How It Works

### Contact Form Flow:
1. User fills contact form
2. JavaScript validates input
3. Submits to `form-handler.php`
4. PHP saves to database (if available)
5. PHP sends email to you
6. If "Discovery Call" selected → Redirects to booking page
7. User data stored in sessionStorage

### Booking System Flow:
1. User selects date
2. JavaScript fetches available slots from API
3. Real-time capacity checking
4. User selects time slot
5. Confirms booking
6. PHP checks availability again
7. Saves to database
8. Sends confirmation email to you

---

## 📧 Email Notifications

You'll receive two types of emails:

### Contact Form Email:
```
=================================
NEW CONTACT FORM SUBMISSION
=================================

Name: John Doe
Email: john@example.com
Phone: +1234567890
Help Type: Book a Free Discovery Call
Preferred Contact Method: email
Submission Time: 2025-11-14 10:30:00

Message:
--------------------------------
I'd like to learn more about coaching
--------------------------------
```

### Booking Email:
```
=================================
NEW BOOKING REQUEST
=================================

Name: John Doe
Email: john@example.com
Phone: +1234567890
Program: discovery-call

BOOKING DETAILS:
Date: 2025-11-20
Time: 09:00 AM

Message:
--------------------------------
Looking forward to our session!
--------------------------------

Submission Time: 2025-11-14 10:30:00
```

---

## 🔧 Advanced Configuration

### Without Database (Email Only Mode):
- System still works!
- Shows static time slots
- Sends emails only
- You manually track bookings

### With Database (Recommended):
- Real-time availability tracking
- Prevents double-booking
- Automatic capacity management
- Full booking history

### Using SMTP (Better Email Delivery):
1. Download PHPMailer from https://github.com/PHPMailer/PHPMailer
2. Extract to `PHPMailer/` folder
3. Get Gmail App Password: https://myaccount.google.com/apppasswords
4. Update credentials in `form-handler.php` (line 433-435)

---

## 🐛 Troubleshooting

### Emails Not Sending:
```php
// Check PHP mail is enabled
<?php
if (function_exists('mail')) {
    echo "mail() is available";
} else {
    echo "mail() is NOT available - use SMTP";
}
?>
```

### Database Connection Failed:
- System will continue without database
- Check credentials in `form-handler.php`
- Verify database exists

### Slots Not Loading:
- Check browser console for errors
- Verify `API_URL` in `main.js` is correct
- Make sure database tables exist

### Form Not Submitting:
- Check form `action` attribute
- Verify file paths are correct
- Check browser console for JavaScript errors

---

## 📱 Features

✅ Contact form with conditional fields  
✅ Real-time slot availability  
✅ Capacity tracking (10 people per slot)  
✅ Prevents overbooking  
✅ Email notifications  
✅ Session data persistence  
✅ Responsive design  
✅ Works with/without database  
✅ CORS enabled for API calls  
✅ Form validation  
✅ Error handling  
✅ Toast notifications  
✅ Loading states  

---

## 🎨 Customization

### Change Colors:
```css
/* In waiting-room.html and contact.html */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* Change to your brand colors */
```

### Change Time Slots:
```sql
-- In database
UPDATE time_slots SET capacity = 15 WHERE id = 1;
INSERT INTO time_slots (time_slot, capacity) VALUES ('06:00 PM', 10);
```

### Change Email Template:
Edit functions in `form-handler.php`:
- `sendBookingEmail()` - line 293
- `sendContactEmail()` - line 320

---

## 🔐 Security Notes

- Form inputs are sanitized with `strip_tags()`
- Email validated with `FILTER_VALIDATE_EMAIL`
- SQL queries use prepared statements
- CORS configured for security
- Error messages don't expose sensitive info

---

## 📞 Support

If you have issues:
1. Check error logs in server
2. Enable error reporting (line 3 of PHP file)
3. Check browser console
4. Verify all file paths
5. Test database connection

---

## ✨ Optional Enhancements

Want to add more features? Consider:
- Email confirmation to users (auto-reply)
- SMS notifications via Twilio
- Google Calendar integration
- Payment processing for paid sessions
- Recurring bookings
- Cancellation system
- Admin dashboard

---

**That's it! Your booking system is ready to go! 🎉**