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
<?php
// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(403);
    die("Invalid request method.");
}

// Sanitize and validate input
$name = isset($_POST["name"]) ? strip_tags(trim($_POST["name"])) : '';
$email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : '';
$subject = isset($_POST["subject"]) ? strip_tags(trim($_POST["subject"])) : '';
$message = isset($_POST["message"]) ? strip_tags(trim($_POST["message"])) : '';

// Validate required fields
if (empty($name) || empty($message) || empty($subject)) {
    http_response_code(400);
    die("Please fill in all required fields.");
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    die("Please enter a valid email address.");
}

// Set recipient email
$recipient = "nonkululekocekiso1@gmail.com";

// OPTION 1: Try PHP mail() function first (works on most shared hosting)
function sendWithPHPMail($recipient, $subject, $name, $email, $message) {
    $email_subject = "New Contact Form: " . $subject;
    
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";
    
    $email_headers = "From: $name <$email>\r\n";
    $email_headers .= "Reply-To: $email\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();
    
    return mail($recipient, $email_subject, $email_content, $email_headers);
}

// OPTION 2: Use PHPMailer with SMTP (more reliable, requires PHPMailer library)
function sendWithSMTP($recipient, $subject, $name, $email, $message) {
    // Check if PHPMailer is available
    if (!file_exists('PHPMailer/PHPMailer.php')) {
        return false;
    }
    
    require 'PHPMailer/PHPMailer.php';
    require 'PHPMailer/SMTP.php';
    require 'PHPMailer/Exception.php';
    
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    
    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'nonkululekocekiso1@gmail.com'; // Your Gmail
        $mail->Password = 'your_app_password_here'; // Get from https://myaccount.google.com/apppasswords
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        
        // Recipients
        $mail->setFrom($email, $name);
        $mail->addAddress($recipient);
        $mail->addReplyTo($email, $name);
        
        // Content
        $mail->isHTML(false);
        $mail->Subject = "New Contact Form: " . $subject;
        $mail->Body = "Name: $name\n\nEmail: $email\n\nMessage:\n$message";
        
        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("PHPMailer Error: {$mail->ErrorInfo}");
        return false;
    }
}

// Try sending email with available methods
$sent = false;

// Try SMTP first (if configured)
if (file_exists('PHPMailer/PHPMailer.php')) {
    $sent = sendWithSMTP($recipient, $subject, $name, $email, $message);
}

// Fallback to PHP mail() if SMTP failed or unavailable
if (!$sent) {
    $sent = sendWithPHPMail($recipient, $subject, $name, $email, $message);
}

// Return response
if ($sent) {
    echo "OK";
} else {
    http_response_code(500);
    echo "Failed to send email. Please try again or contact us directly at info@life-coaching-works.com";
}
?>