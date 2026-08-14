import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { fullName, email, subject, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER || "neelam@mentor-krish.com";
  const smtpPass = process.env.SMTP_PASS;
  const notificationEmail = process.env.NOTIFICATION_EMAIL || "neelam@mentor-krish.com";

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const adminMailOptions = {
        from: `"Mentor Krish Website" <${smtpUser}>`,
        to: notificationEmail,
        replyTo: email,
        subject: `[Inquiry] ${subject || "General Inquiry"} - ${fullName}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; color: #0F172A; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 12px; background-color: #FFFFFF;">
            <div style="border-bottom: 2px solid #C81E1E; padding-bottom: 12px;">
              <h2 style="color: #0F172A; margin: 0; font-size: 20px;">New Contact Inquiry Message</h2>
              <p style="color: #64748B; margin: 4px 0 0 0; font-size: 13px;">Mentor Krish Academic Portal</p>
            </div>

            <div style="margin-top: 20px; font-size: 14px; line-height: 1.6;">
              <p style="margin: 4px 0;"><strong>Sender Name:</strong> ${fullName}</p>
              <p style="margin: 4px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #C81E1E;">${email}</a></p>
              <p style="margin: 4px 0;"><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
              
              <div style="background-color: #F8FAFC; border-left: 4px solid #C81E1E; padding: 16px; margin-top: 16px; border-radius: 4px;">
                <p style="margin: 0; font-weight: bold; color: #475569; font-size: 12px; uppercase;">Message Payload:</p>
                <p style="margin: 8px 0 0 0; color: #0F172A; whitespace: pre-line;">${message}</p>
              </div>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(adminMailOptions);
      return res.status(200).json({ success: true, message: "Contact message sent successfully!" });
    } catch (error) {
      console.error("Nodemailer contact error:", error);
      return res.status(500).json({ success: false, message: "Failed to send message", details: error.message });
    }
  } else {
    return res.status(500).json({ success: false, message: "SMTP credentials unconfigured" });
  }
}
