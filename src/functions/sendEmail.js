const handlebars = require('handlebars');
const { transporter } = require('../config/email');

const sendEmail = async (file, proprieties, { name, email }, subject) => {
  const compiler = handlebars.compile(file)
  const emailString = compiler(proprieties)
  transporter.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
    to: `${name} <${email}>`,
    subject: subject,
    html: emailString
  });
};

module.exports = {
  sendEmail
}