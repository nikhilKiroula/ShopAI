import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

const sendEmail = async ({ to, subject, html }) => {
    const info = await transporter.sendMail({
        from: `"ShopAI" <${process.env.MAIL_FROM}>`,
        to,
        subject,
        html,
    });

    console.log("Mail sent:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);

    return info;
};

export { sendEmail };