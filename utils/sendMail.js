import sgMail from "@sendgrid/mail";
import { SENDGRID_API_KEY, EMAIL_FORM } from "../config/env.config.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

sgMail.setApiKey(SENDGRID_API_KEY);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async ({ to, subject, templateName, templateData }) => {
  const templatePath = path.join(__dirname, `../template/${templateName}.ejs`);

  const html = await ejs.renderFile(templatePath, templateData);

  const msg = {
    to,
    from: EMAIL_FORM,
    subject,
    html,
  };

  await sgMail.send(msg);
};

export default sendEmail;
