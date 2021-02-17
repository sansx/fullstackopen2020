import {Gender, NewPatient } from './types'

export const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseString = (param: any): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing : ' + param);
  }
  return param;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

export const toNewPatient = (obj: any): NewPatient => {
  return {
    name: parseString(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    gender: parseGender(obj.gender),
    occupation: parseString(obj.occupation),
    ssn: parseString(obj.ssn) 
  };  
}
