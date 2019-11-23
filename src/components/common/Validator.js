const emailChecker = RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);

const textChecker = RegExp(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/);

const numChecker = RegExp(/^[0-9]+$/);

export let errors = {};

export const refresh = () => {
  errors = {};
}

export const Validator = ({ name, value, type, required}) => {
  errors[name] = '';  

  if(required) {
    errors[name] = value.trim().length > 0? false: 'This field is mandatory';
    if(errors[name]){
      errors.pending = false
    }
  }
  switch(type) {
    case 'text':
      errors[name] = value.length? textChecker.test(value)? false: 'Use only alphabets, numbers and spaces': errors[name];
      break;
    case 'number':
      errors[name] = value.length? numChecker.test(value) || value === '' ? false: 'Enter numbers only': errors[name];
      break;
    case 'email':
      errors[name] = value.length? emailChecker.test(value) || value === '' ? false: 'Email is not valid': errors[name];
      break;
    case 'date':
      errors[name] = errors[name].length > 0? errors[name]: false;
      break;
    default:
      errors[name] = false;
  }

  return errors;
}

export const submitValidator = (data) => {
  //errors.valid = true;
  for (let i = 0; i < data.length; i++){
    if(data[i].type !== 'select-one' && data[i].type !== 'submit' ){
      Validator(data[i]);      
      let ob = Object.values(errors).filter(item => item !== false);      
      if(ob.length > 0){
        if(ob[0] === true){
          errors.valid = true;
        }else{
          errors.valid = false;
        }
      }else{
        errors.valid = true;
      }
    }    
  }  
  return errors;
}