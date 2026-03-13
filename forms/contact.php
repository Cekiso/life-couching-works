<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
//   $receiving_email_address = 'nonkululekocekiso1@gmail.com';

//   if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
//     include( $php_email_form );
//   } else {
//     die( 'Unable to load the "PHP Email Form" Library!');
//   }

//   $contact = new PHP_Email_Form;
//   $contact->ajax = true;
  
//   $contact->to = $receiving_email_address;
//   $contact->from_name = $_POST['name'];
//   $contact->from_email = $_POST['email'];
//   $contact->subject = $_POST['subject'];

//   // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  

//   $contact->smtp = array(
//   'host' => 'smtp.gmail.com',
//   'username' => 'yourgmail@gmail.com',
//   'password' => 'your_app_password', //from Google App Password
//   'port' => '587'
// );

  

//   $contact->add_message( $_POST['name'], 'From');
//   $contact->add_message( $_POST['email'], 'Email');
//   $contact->add_message( $_POST['message'], 'Message', 10);

//   echo $contact->send();
// API URL
<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
//   $receiving_email_address = 'nonkululekocekiso1@gmail.com';

//   if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
//     include( $php_email_form );
//   } else {
//     die( 'Unable to load the "PHP Email Form" Library!');
//   }

//   $contact = new PHP_Email_Form;
//   $contact->ajax = true;
  
//   $contact->to = $receiving_email_address;
//   $contact->from_name = $_POST['name'];
//   $contact->from_email = $_POST['email'];
//   $contact->subject = $_POST['subject'];

//   // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  

//   $contact->smtp = array(
//   'host' => 'smtp.gmail.com',
//   'username' => 'yourgmail@gmail.com',
//   'password' => 'your_app_password', //from Google App Password
//   'port' => '587'
// );

  

//   $contact->add_message( $_POST['name'], 'From');
//   $contact->add_message( $_POST['email'], 'Email');
//   $contact->add_message( $_POST['message'], 'Message', 10);

//   echo $contact->send();
// ?>
// <?php
// // Enable error reporting for debugging (remove in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// // Check if form was submitted via POST
// if ($_SERVER["REQUEST_METHOD"] != "POST") {
//     http_response_code(403);
//     die("Invalid request method.");
// }

// // Sanitize and validate input
// $name = isset($_POST["name"]) ? strip_tags(trim($_POST["name"])) : '';
// $email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : '';
// $phone = isset($_POST["phone"]) ? strip_tags(trim($_POST["phone"])) : '';
// $helpType = isset($_POST["helpType"]) ? strip_tags(trim($_POST["helpType"])) : '';
// $contactMethod = isset($_POST["contactMethod"]) ? strip_tags(trim($_POST["contactMethod"])) : '';
// $message = isset($_POST["message"]) ? strip_tags(trim($_POST["message"])) : '';

// // Validate required fields
// if (empty($name) || empty($message) || empty($helpType)) {
//     http_response_code(400);
//     die("Please fill in all required fields.");
// }

// // Validate email
// if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//     http_response_code(400);
//     die("Please enter a valid email address.");
// }

// // Phone validation function (South African formats only)
// function validatePhoneNumber($phone) {
//     if (empty($phone)) {
//         return false;
//     }
    
//     // Remove spaces, dashes, and parentheses
//     $cleaned = preg_replace('/[\s\-\(\)]/', '', $phone);
    
//     // Check for valid South African formats:
//     // +27XXXXXXXXX (country code + 9 digits)
//     // 0XXXXXXXXX (10 digits starting with 0)
//     $pattern = '/^(\+27[0-9]{9}|0[0-9]{9})$/';
    
//     return preg_match($pattern, $cleaned);
// }

// // Validate phone number if contact method is phone or WhatsApp
// if ($contactMethod === 'phone' || $contactMethod === 'whatsapp') {
//     if (empty($phone)) {
//         http_response_code(400);
//         die("Phone number is required when selecting Phone or WhatsApp as contact method.");
//     }
    
//     if (!validatePhoneNumber($phone)) {
//         http_response_code(400);
//         die("Please enter a valid South African phone number (e.g., +27821234567 or 0821234567).");
//     }
// }

// // Set recipient email
// $recipient = "info@life-coachingworks.com";

// // OPTION 1: Try PHP mail() function first (works on most shared hosting)
// function sendWithPHPMail($recipient, $helpType, $name, $email, $phone, $contactMethod, $message) {
//     $email_subject = "New Contact Form: " . $helpType;
    
//     $email_content = "Name: $name\n";
//     $email_content .= "Email: $email\n";
    
//     // Include phone number if provided
//     if (!empty($phone)) {
//         $email_content .= "Phone: $phone\n";
//     }
    
//     $email_content .= "Help Type: $helpType\n";
//     $email_content .= "Preferred Contact Method: $contactMethod\n\n";
//     $email_content .= "Message:\n$message\n";
    
//     $email_headers = "From: $name <$email>\r\n";
//     $email_headers .= "Reply-To: $email\r\n";
//     $email_headers .= "X-Mailer: PHP/" . phpversion();
    
//     return mail($recipient, $email_subject, $email_content, $email_headers);
// }

// // OPTION 2: Use PHPMailer with SMTP (more reliable, requires PHPMailer library)
// function sendWithSMTP($recipient, $helpType, $name, $email, $phone, $contactMethod, $message) {
//     // Check if PHPMailer is available
//     if (!file_exists('PHPMailer/PHPMailer.php')) {
//         return false;
//     }
    
//     require 'PHPMailer/PHPMailer.php';
//     require 'PHPMailer/SMTP.php';
//     require 'PHPMailer/Exception.php';
    
//     $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    
//     try {
//         // SMTP Configuration
//         $mail->isSMTP();
//         $mail->Host = 'smtp.gmail.com';
//         $mail->SMTPAuth = true;
//         $mail->Username = 'info@life-coachingworks.com'; // Your Gmail
//         $mail->Password = 'your_app_password_here'; // Get from https://myaccount.google.com/apppasswords
//         $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
//         $mail->Port = 587;
        
//         // Recipients
//         $mail->setFrom($email, $name);
//         $mail->addAddress($recipient);
//         $mail->addReplyTo($email, $name);
        
//         // Content
//         $mail->isHTML(false);
//         $mail->Subject = "New Contact Form: " . $helpType;
        
//         $body = "Name: $name\n\nEmail: $email\n\n";
        
//         // Include phone number if provided
//         if (!empty($phone)) {
//             $body .= "Phone: $phone\n\n";
//         }
        
//         $body .= "Help Type: $helpType\n\nPreferred Contact Method: $contactMethod\n\nMessage:\n$message";
        
//         $mail->Body = $body;
        
//         $mail->send();
//         return true;
//     } catch (Exception $e) {
//         error_log("PHPMailer Error: {$mail->ErrorInfo}");
//         return false;
//     }
// }

// // Try sending email with available methods
// $sent = false;

// // Try SMTP first (if configured)
// if (file_exists('PHPMailer/PHPMailer.php')) {
//     $sent = sendWithSMTP($recipient, $helpType, $name, $email, $phone, $contactMethod, $message);
// }

// // Fallback to PHP mail() if SMTP failed or unavailable
// if (!$sent) {
//     $sent = sendWithPHPMail($recipient, $helpType, $name, $email, $phone, $contactMethod, $message);
// }

// // Return response
// if ($sent) {
//     echo "OK";
// } else {
//     http_response_code(500);
//     echo "Failed to send email. Please try again or contact us directly at info@life-coachingworks.com";
// }
// ?>