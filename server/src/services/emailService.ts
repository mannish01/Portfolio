import nodemailer from 'nodemailer';

export interface EmailNotificationPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactNotification = async (
  payload: EmailNotificationPayload
): Promise<boolean> => {
  const { name, email, subject, message } = payload;

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const recipientEmail = process.env.EMAIL_TO || 'manishkumar383904@gmail.com';

  // Check if SMTP credentials are configured
  if (!smtpUser || !smtpPass) {
    console.log(
      'ℹ️ [Email Service] Message saved to MongoDB. Live email delivery requires SMTP_USER and SMTP_PASS in server/.env'
    );
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT || 465) === 465, // true for 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const emailSubject = `📬 [Portfolio Inquiry] ${subject} — from ${name}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0E0C1C; color: #FAF8F3; padding: 24px; }
          .card { max-width: 600px; margin: 0 auto; background-color: #17152D; border: 1px solid rgba(255,255,255,0.15); border-radius: 16px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 24px; }
          .badge { display: inline-block; background: rgba(215,255,100,0.15); color: #D7FF64; border: 1px solid rgba(215,255,100,0.3); border-radius: 20px; padding: 4px 12px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
          .title { font-size: 22px; font-weight: bold; color: #FAF8F3; margin: 12px 0 4px 0; }
          .meta-box { background: rgba(255,255,255,0.04); border-radius: 12px; padding: 16px; margin-bottom: 20px; }
          .meta-item { margin-bottom: 8px; font-size: 14px; }
          .meta-label { color: #FF7058; font-weight: 600; width: 80px; display: inline-block; }
          .meta-val { color: #FAF8F3; }
          .message-title { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: rgba(250,248,243,0.6); margin-bottom: 8px; font-weight: 600; }
          .message-body { background: rgba(0,0,0,0.3); border-left: 3px solid #7957FF; padding: 16px; border-radius: 0 8px 8px 0; font-size: 15px; line-height: 1.6; color: #FAF8F3; white-space: pre-wrap; }
          .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; font-size: 12px; color: rgba(250,248,243,0.5); }
          .btn { display: inline-block; background: linear-gradient(135deg, #7957FF, #FF7058); color: #FAF8F3; text-decoration: none; padding: 12px 24px; border-radius: 24px; font-weight: bold; font-size: 13px; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <span class="badge">New Contact Submission</span>
            <h1 class="title">You received a new inquiry!</h1>
            <p style="margin: 0; color: rgba(250,248,243,0.6); font-size: 13px;">Submitted via Manish Kumar Portfolio</p>
          </div>

          <div class="meta-box">
            <div class="meta-item"><span class="meta-label">From:</span> <span class="meta-val">${name}</span></div>
            <div class="meta-item"><span class="meta-label">Email:</span> <span class="meta-val"><a href="mailto:${email}" style="color: #61DAFB; text-decoration: none;">${email}</a></span></div>
            <div class="meta-item"><span class="meta-label">Subject:</span> <span class="meta-val">${subject}</span></div>
            <div class="meta-item" style="margin-bottom: 0;"><span class="meta-label">Date:</span> <span class="meta-val">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} (IST)</span></div>
          </div>

          <div class="message-title">Message Content:</div>
          <div class="message-body">${message}</div>

          <div style="text-align: center;">
            <a href="mailto:${email}?subject=${encodeURIComponent('Re: ' + subject)}" class="btn">Reply to ${name} →</a>
          </div>

          <div class="footer">
            Delivered by Manish Kumar Portfolio API • Connected to MongoDB Atlas
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"${name} (Portfolio)" <${smtpUser}>`,
      replyTo: email,
      to: recipientEmail,
      subject: emailSubject,
      text: `From: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: htmlContent,
    });

    console.log(`✉️ [Email Service] Live email notification delivered to ${recipientEmail}`);
    return true;
  } catch (error: any) {
    console.error('❌ [Email Service] Failed to send email notification:', error?.message || error);
    return false;
  }
};

