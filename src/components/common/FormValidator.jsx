export const FormValidator = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(item => {
    item.length > 0 && (valid = false);
  });
  
  Object.values(rest).forEach(item => {    
    item === '' && (valid = false);
  });
  return valid;
}

export const emailChecker = RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);

export const textChecker = RegExp(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/);

export const numChecker = RegExp(/^[0-9]+$/);