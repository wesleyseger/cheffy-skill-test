const welcomeMail = (name) => {
  return `Hi ${name}, \n\nWe're excited to have you get started! \n\nThank you, \nTeam Cheffy`
}

const resetPasswordMail = (name, link) => {
  return `Hello ${name}, \n\nA request has been received to change the password for your Cheffy account. \n\nPlease, click the link below to reset your password: \n${link} \n\nIf you did not intiate this request, please contact us. \n\nThank you, \nTeam Cheffy`
}

export { welcomeMail, resetPasswordMail }