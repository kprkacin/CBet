import React from 'react';
import { Form } from 'react-bootstrap';
import { Control, Controller } from 'react-hook-form';

export const TextFieldVertical: React.FC<TextFieldProps> = ({
  control,
  name,
  className,
  label,
  type,
  placeholder,
  isInvalid,
  error,
  errorMessage,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={(props) => (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control
            style={error ? { border: '1px solid red' } : undefined}
            className={className}
            type={type}
            placeholder={placeholder}
            isInvalid={isInvalid}
            value={props.field.value}
            onChange={(e) => props.field.onChange(e.target.value)}
          />
          <Form.Text style={{ color: 'red' }}>{errorMessage}</Form.Text>
        </Form.Group>
      )}
    />
  );
};

export interface TextFieldProps {
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
