const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = process.env.SENDGRID_API_KEY


sgMail.setApiKey(sendgridAPIKey)


const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email,
    from: 'svetlana.shinka@gmail.com',
    subject: 'Welcome to the App!',
    text: `Welcome to the app ${name}. Thanks for joining`,
    html: `<strong>Welcome to the app ${name}. Thanks for joining</strong>`
  }
  sgMail.send(msg)
  .then((res) => {
    console.log(res)
  })
  .catch((error) => {
    console.error(error)
  })
}

const goodbyeEmail = (email, name) => {
  const msg = {
    to: email,
    from: 'svetlana.shinka@gmail.com',
    subject: 'Sorry to see you go',
    text: `Goodbye ${name}. I hope to see you back some time soon`,
    html: `<strong>Goodbye ${name}. I hope to see you back some time soon.</strong>`
  }
  sgMail.send(msg)
  .then((res) => {
    console.log(res)
  })
  .catch((error) => {
    console.error(error)
  })
}

module.exports = {
  sendWelcomeEmail,
  goodbyeEmail
}




