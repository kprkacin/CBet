import React from 'react';
import { Col, Form, FormGroupProps } from 'react-bootstrap';
import { Control, Controller } from 'react-hook-form';

export const TextField: React.FC<TextFieldProps> = ({
  control,
  name,
  className,
  label,
  type,
  placeholder,
  isInvalid,
  error,
  errorMessage,
  ...formGroupProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={(props) => (
        <Form.Group {...formGroupProps}>
          {label && (
            <Form.Label column sm={2}>
              {label}
            </Form.Label>
          )}
          <Col sm={10}>
            <Form.Control
              style={error ? { border: '1px solid red' } : undefined}
              type={type}
              placeholder={placeholder}
              isInvalid={isInvalid}
              value={props.field.value}
              onChange={(e) => props.field.onChange(e.target.value)}
            />
          </Col>
          <Form.Text style={{ color: 'red' }}>{errorMessage}</Form.Text>
        </Form.Group>
      )}
    />
  );
};

export interface TextFieldProps extends FormGroupProps {
  control: Control;
  name: string;
  className?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  isInvalid?: boolean;
  error?: boolean;
  errorMessage?: string;
}
