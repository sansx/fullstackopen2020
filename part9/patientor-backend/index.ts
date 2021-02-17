import express from 'express';
import diagnoses from './routes/diagnoses';
import patients from './routes/patients'

const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())


app.get('/api/ping', (_req, res) => {
  res.send("pong")
})

app.use('/api/patients', patients);
app.use('/api/diagnoses', diagnoses);




const PORT = 3001;

app.listen(PORT, () => {
  console.log(`the app has running on port: ${PORT}`);
})
