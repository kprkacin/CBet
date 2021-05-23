import React, { useCallback } from 'react';
import { Col, Form, FormGroupProps } from 'react-bootstrap';
import { Control, Controller } from 'react-hook-form';

export const SelectField: React.FC<SelectFieldProps> = ({
  control,
  name,
  label,
  type,
  placeholder,
  isInvalid,
  errorMessage,
  options,
  error,
  getOption,
  ...formGroupProps
}) => {
  const handleOption = useCallback(
    (opt: any) => {
      if (!opt) {
        return '';
      }
      if (!getOption) {
        return opt.toString() || '';
      }
      return getOption(opt);
    },
    [getOption]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={(props) => (
        <Form.Group {...formGroupProps}>
          <Form.Label column sm={2}>
            {label}
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              style={error ? { border: '1px solid red' } : undefined}
              custom
              type={type}
              placeholder={placeholder}
              isInvalid={isInvalid}
              value={JSON.stringify(props.field.value)}
              onChange={(e) => props.field.onChange(JSON.parse(e.target.value))}
            >
              <option hidden></option>
              {options.map((opt, i) => (
                <option key={i} value={JSON.stringify(opt)}>
                  {handleOption(opt)}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Form.Text style={{ color: 'red' }}>{errorMessage}</Form.Text>
        </Form.Group>
      )}
    />
  );
};

interface SelectFieldProps extends FormGroupProps {
  control: Control;
  name: string;
  options: any[];
  getOption?: (opt: any) => string;
  label?: string;
  type?: string;
  placeholder?: string;
  isInvalid?: boolean;
  error?: boolean;
  errorMessage?: string;
}
