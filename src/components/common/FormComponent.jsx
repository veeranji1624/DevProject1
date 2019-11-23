import React from 'react'
import PropTypes from 'prop-types'
import { errors } from './Validator'
import {
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap'

const FormComponent = ({
  labelClass,
  group,
  label,
  type,
  name,
  value,
  change,
  blur,
  placeholder,
  error,  
  required
}) => {
  //console.log(errors);
  return(
  <FormGroup className={group || ''}>
    {label?<Label className={labelClass}>{label}</Label>:null}
    <Input
      type={type}
      name={name}
      value={value}
      className={`form-control-sm ${errors[name] && 'is-invalid'}`}
      onChange={change}
      onBlur={blur}
      placeholder={placeholder}
      required={required}
    />
    {error && <FormText className="error">{error}</FormText>}
    {errors[name] && <FormText className="error">{errors[name]}</FormText>}
  </FormGroup>
  )
}

FormComponent.propTypes = {
  group: PropTypes.string,
  labelClass: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  inputClass: PropTypes.string,
  change: PropTypes.func.isRequired,
  placeholder: PropTypes.string,  
}
FormComponent.defaultProps = {
  type: 'text',
  labelClass: 'bold',
  inputClass: 'form-control',  
}

export default FormComponent;