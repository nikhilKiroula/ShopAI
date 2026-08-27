import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
    const { data, error } = await resend.emails.send({
        from: `ShopAI <${process.env.MAIL_FROM}>`,
        to,
        subject,
        html,
    });

    if (error) {
        console.error("Email sending failed:", error);
        throw new Error("Failed to send email");
    }

    console.log("Mail sent successfully:", data);
};

export { sendEmail };