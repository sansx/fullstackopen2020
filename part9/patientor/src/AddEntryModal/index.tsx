import React, { useState } from "react";
import { Modal, Segment, Dropdown, DropdownProps } from "semantic-ui-react";
import { EntryTypes, Entry } from "../types";
import AddEntryFormWrapper from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Entry) => void;
  error?: string;
}

const options = [
  {
    key: "HealthCheck",
    value: "HealthCheck",
    text: "Health Check",
  },
  {
    key: "OccupationalHealthcare",
    value: "OccupationalHealthcare",
    text: "Occupational Health Care",
  },
  { key: "Hospital", value: "Hospital", text: "Hospital" },
];

const baseInitialValues = {
  description: "",
  date: "",
  specialist: "",
};

const entry_init = {
  HealthCheck: {
    type: "HealthCheck",
    healthCheckRating: 0,
  },
  OccupationalHealthcare: {
    type: "OccupationalHealthcare",
    employerName: "",
    sickLeave: { startDate: "", endDate: "" },
  },
  Hospital: {
    type: "Hospital",
    discharge: { date: "", criteria: "" },
  },
};

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [entryType, setEntryType] = useState<EntryTypes>("HealthCheck");

  const handleChange = (
    _e: React.SyntheticEvent,
    { value }: DropdownProps
  ): void => {
    if (value) setEntryType(value as EntryTypes);
  };

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`${error}`}</Segment>}
        <Dropdown
          fluid
          onChange={handleChange}
          options={options}
          selection
          value={entryType}
        />
        <AddEntryFormWrapper
          entryType={entryType}
          initialValues={
            { ...baseInitialValues, ...entry_init[entryType] } as Entry
          }
          onCancel={onClose}
          onSubmit={onSubmit}
        />
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
