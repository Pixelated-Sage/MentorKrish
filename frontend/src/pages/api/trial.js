import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { fullName, email, phoneNumber, course, preferredDate, preferredTime, message } = req.body;

  if (!fullName || !email || !phoneNumber || !preferredDate || !preferredTime) {
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

      // 1. Admin Email Notification to neelam@mentor-krish.com
      const adminMailOptions = {
        from: `"Mentor Krish Admissions" <${smtpUser}>`,
        to: notificationEmail,
        replyTo: email,
        subject: `[Trial Booking] ${fullName} - ${course || "SAT Prep"}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; color: #0F172A; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 12px; background-color: #FFFFFF;">
            <div style="border-bottom: 2px solid #C81E1E; padding-bottom: 12px; mb-16;">
              <h2 style="color: #0F172A; margin: 0; font-size: 20px;">New Free Trial Session Request</h2>
              <p style="color: #64748B; margin: 4px 0 0 0; font-size: 13px;">Mentor Krish Academic Portal</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
              <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: bold; width: 35%; color: #475569;">Student Name:</td><td style="padding: 10px 0; color: #0F172A; font-weight: bold;">${fullName}</td></tr>
              <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: bold; color: #475569;">Email Address:</td><td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #C81E1E; font-weight: bold;">${email}</a></td></tr>
              <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: bold; color: #475569;">Phone Number:</td><td style="padding: 10px 0; font-weight: bold; color: #0F172A;">${phoneNumber}</td></tr>
              <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: bold; color: #475569;">Academic Program:</td><td style="padding: 10px 0; font-weight: bold; color: #C81E1E;">${course || "Digital SAT Prep"}</td></tr>
              <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: bold; color: #475569;">Preferred Date:</td><td style="padding: 10px 0; font-weight: bold; color: #0F172A;">${preferredDate}</td></tr>
              <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: bold; color: #475569;">Preferred Time Slot:</td><td style="padding: 10px 0; font-weight: bold; color: #0F172A;">${preferredTime}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: bold; color: #475569;">Target Goals / Notes:</td><td style="padding: 10px 0; color: #334155;">${message || "N/A"}</td></tr>
            </table>

            <div style="margin-top: 24px; padding-top: 16px; border-t: 1px solid #E2E8F0; font-size: 12px; color: #94A3B8; text-align: center;">
              Logged automatically by Mentor Krish Web Engine.
            </div>
          </div>
        `,
      };

      // 2. Student Automated Confirmation Copy
      const studentMailOptions = {
        from: `"Ms. Neelam Sharma | Mentor Krish" <${smtpUser}>`,
        to: email,
        subject: `Confirmation: Your Free Trial Session Request with Mentor Krish`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; color: #0F172A; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 12px; background-color: #FFFFFF;">
            <div style="border-bottom: 2px solid #C81E1E; padding-bottom: 12px;">
              <h2 style="color: #0F172A; margin: 0; font-size: 20px;">Free Trial Booking Received</h2>
              <p style="color: #64748B; margin: 4px 0 0 0; font-size: 13px;">Mentor Krish SAT & Admissions Institute</p>
            </div>

            <div style="margin-top: 20px; font-size: 14px; line-height: 1.6; color: #334155;">
              <p>Dear <strong>${fullName}</strong>,</p>
              <p>Thank you for requesting a 1-on-1 Free Trial Session for the <strong>${course}</strong> program with Mentor Krish.</p>
              <p>Our academic team has logged your preferred slot:</p>
              
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin: 16px 0;">
                <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>Requested Date:</strong> ${preferredDate}</p>
                <p style="margin: 0; font-size: 13px;"><strong>Requested Time Slot:</strong> ${preferredTime}</p>
              </div>

              <p>Our lead mentor will reach out to you directly at <strong>${phoneNumber}</strong> to confirm your slot and provide diagnostic session instructions.</p>
              <p>Warm regards,<br/><strong>Ms. Neelam Sharma</strong><br/>Founder & Lead Mentor<br/><a href="https://mentorkrish.in" style="color: #C81E1E;">mentorkrish.in</a></p>
            </div>
          </div>
        `,
      };

      // Dispatch both emails
      await transporter.sendMail(adminMailOptions);
      try {
        await transporter.sendMail(studentMailOptions);
      } catch (studentErr) {
        console.warn("Student copy delivery note:", studentErr.message);
      }

      return res.status(200).json({ success: true, message: "Trial booking dispatched cleanly!" });
    } catch (error) {
      console.error("Nodemailer dispatch error:", error);
      return res.status(500).json({ success: false, message: "Failed to send email", details: error.message });
    }
  } else {
    return res.status(500).json({ success: false, message: "SMTP credentials unconfigured" });
  }
}
