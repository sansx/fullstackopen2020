import {
  Gender,
  NewPatient,
  Entry,
  EntryTypes,
} from "./types";

export const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

export const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const parseString = (param: any): string => {
  if (!param || !isString(param)) {
    throw new Error("Incorrect or missing : " + param);
  }
  return param;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

export const toNewPatient = (obj: any): NewPatient => {
  return {
    name: parseString(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    gender: parseGender(obj.gender),
    occupation: parseString(obj.occupation),
    ssn: parseString(obj.ssn),
  };
};

export const parseEntryType = (entryType: string) => {
  if (!EntryTypes.includes(entryType)) {
    throw new Error("Incorrect or missing entry type: " + entryType);
  }
  return entryType;
};

export const parseHealthCheckRating = (rate: string | number) => {
  if (!Number(rate) && rate < 0 && rate > 3) {
    throw new Error("Incorrect or missing rate: " + rate);
  }
  return rate;
};

export const parseSickLeave = (duration: any) => {
  if (!duration) throw new Error("Missing sick leave");
  return {
    startDate: parseDate(duration.startDate),
    endDate: parseDate(duration.endDate),
  };
};

export const parseDischarge = (discharge: any) => {
  if (!discharge) throw new Error("Missing discharge");
  return {
    date: parseDate(discharge.date),
    criteria: parseString(discharge.criteria),
  };
};

export const toNewEntry = (entry: any): Entry => {
  const newBaseEntry: any = {
    type: parseEntryType(entry.type),
    description: parseString(entry.description),
    date: parseDate(entry.date),
    specialist: parseString(entry.specialist),
  };

  if (entry.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = entry.diagnosisCodes;
  }

  switch (entry.type) {
    case "HealthCheck":
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
    case "OccupationalHealthcare":
      let newEntry = {
        ...newBaseEntry,
        employerName: parseString(entry.employerName),
      };
      if (entry.sickLeave) {
        newEntry.sickLeave = parseSickLeave(entry.sickLeave);
      }
      return newEntry;
    case "Hospital":
      return { ...newBaseEntry, discharge: parseDischarge(entry.discharge) };
    default:
      throw new Error(
        ("Incorrect or missing entry type: " + entry.type) as any
      );
  }
};
