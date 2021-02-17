import express from 'express';
import patients from '../services/patients'
import { toNewPatient } from '../utils'
const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patients.getAll());
})

router.post('/', (req, res) => {
  try {
    res.json(patients.addPatient(toNewPatient(req.body)));
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  console.log(id);

  res.json(patients.getPatientInfo(id))

})

export default router;