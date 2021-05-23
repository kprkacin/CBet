import { yupResolver } from '@hookform/resolvers/yup'
import *  as yup from 'yup';

export const yupLoginSchema = yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().required(),
})

export const yupRegisterSchema = yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().required(),
})
