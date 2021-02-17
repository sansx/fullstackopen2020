import diagnoses from "../data/diagnoses.json";
import { Diagnosis } from "../types";

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};