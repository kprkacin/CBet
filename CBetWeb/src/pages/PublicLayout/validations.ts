import * as yup from 'yup';

export const yupLoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const yupRegisterSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  country: yup.object().shape({ id: yup.number().required() }),
  password: yup.string().required(),
});
