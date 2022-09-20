import * as yup from 'yup';

let signUpSchema = yup.object().shape({
  email: yup.string().email('Insert a valid E-mail').required('E-mail is a required field'),
  name: yup.string().required('Name is a required field').min(3, "The name must contain at least 3 characters"),
  password: yup.string().required('Password is a required field').min(8, "The password must contain at least 8 characters"),
  confirmPassword: yup.string().required('Confirm Password is a required field').oneOf([yup.ref('password'), null], `The password don't match`),
});

const validateSignUp = async (form, setErrorMessage) => {
  try {
    const valid = await signUpSchema.validate(form);
    if (valid) return true;
  }
  catch (err) {
    setErrorMessage(err.message)
    return false;
  }
}




let forgetPasswordSchema = yup.object().shape({
  email: yup.string().email('Insert a valid E-mail').required('E-mail is a required field'),
});

const validateForgetPassword = async (form, setErrorMessage) => {
  try {
    const valid = await forgetPasswordSchema.validate(form);
    if (valid) return true;
  }
  catch (err) {
    setErrorMessage(err.message)
    return false;
  }
}

let resetPasswordSchema = yup.object().shape({
  password: yup.string().required('Password is a required field').min(8, "The password must contain at least 8 characters"),
  confirmPassword: yup.string().required('Confirm Password is a required field').oneOf([yup.ref('password'), null], `The password don't match`)
});

const validateResetPassword = async (form, setErrorMessage) => {
  try {
    const valid = await resetPasswordSchema.validate(form);
    if (valid) return true;
  }
  catch (err) {
    setErrorMessage(err.message)
    return false;
  }
}


export { validateSignUp, validateForgetPassword, validateResetPassword }