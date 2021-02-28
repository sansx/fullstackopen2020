import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Icon, Loader, Button } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/src/generic";

import { useParams } from "react-router-dom";
import { Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";

export enum GenderIcon {
  male = "mars",
  female = "venus",
  other = "genderless",
}

const PatientListPage: React.FC = () => {
  const [{ patientsInfo }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  
  useEffect(() => {
    getInfo();
    // eslint-disable-next-line
  }, [dispatch]);

  const getInfo = async () => {
    if (patientsInfo[id]) {
      return setPatient(patientsInfo[id]);
    }
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    console.log("get:", data);
    dispatch(updatePatient(data));
    setPatient(data);
  };

  if (!patient) {
    return (
      <div className="App">
        <Container textAlign="center">
          <Loader active inline="centered" content="Loading..." />
        </Container>
      </div>
    );
  }

  const submitNewEntry = async (values: Entry) => {
    const body = { ...values };

    if (body.type === "OccupationalHealthcare") {
      if (!body.sickLeave?.endDate && !body.sickLeave?.startDate) {
        body.sickLeave = undefined;
      }
    }

    try {
      const { data: returnedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        body
      );
      
      dispatch(updatePatient(returnedPatient));
      setPatient(returnedPatient);
      closeModal();
    } catch (e) {
      console.error(e.response?.data);

      let errorMessage = "Oops! Something went wrong!";

      if (e.response?.status >= 400 && e.response?.status < 500) {
        errorMessage = e.response.data.error;
      }

      setError(errorMessage);
    }
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const genderIcon = {
    male: "mars",
    female: "venus",
    other: "genderless",
  };

  return (
    <div className="App">
      <Container textAlign="left">
        <h2>
          {patient.name}{" "}
          <Icon name={genderIcon[patient.gender] as SemanticICONS} />{" "}
        </h2>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={()=>setModalOpen(true)}>Add New Entry</Button>
        <div>
          {" "}
          ssn: <span style={{ fontSize: "16px" }}>{patient.ssn}</span>{" "}
        </div>
        <div>
          {" "}
          occupation:{" "}
          <span style={{ fontSize: "16px" }}>{patient.occupation}</span>{" "}
        </div>
        <h3>entries</h3>
        {patient.entries.length === 0 && <div>entry not found</div>}
        <div>
          {" "}
          {patient.entries.map((e) => (
            <EntryDetails entry={e} key={e.id}></EntryDetails>
          ))}{" "}
        </div>
      </Container>
    </div>
  );
};

export default PatientListPage;
