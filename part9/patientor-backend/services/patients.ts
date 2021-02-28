import data from "../data/new_patients";
import { NonSsnPatient, NewPatient, Patient, Entry } from "../types";
import { parseGender } from "../utils";

const getAll = (): NonSsnPatient[] => {
  return data.map(
    ({ id, name, dateOfBirth, gender, occupation }) =>
      ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
      } as Patient)
  );
};

const addPatient = (patient: NewPatient): Patient => {
  parseGender(patient.gender);

  const newPatient = {
    ...patient,
    id: (Math.random() * 10000).toString(),
    entries: [],
  };

  data.push(newPatient);

  return newPatient;
};

const getPatientInfo = (id: string): Patient => {
  return { ...(data.filter((e) => e.id === id)[0] as Patient) };
};

const addEntry = (id: string, entry: Entry): Patient => {
  let target = data.filter((e) => e.id === id)[0];
  target.entries.push({ ...entry, id: (Math.random() * 10000).toString() });
  return target;
};

export default {
  getAll,
  addPatient,
  getPatientInfo,
  addEntry,
};
