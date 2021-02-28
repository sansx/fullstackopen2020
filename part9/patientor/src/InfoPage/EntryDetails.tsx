import React, { useEffect, useState } from "react";
import { Entry } from "../types";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthCareEntry from "./OccupationalHealthCareEntry";
import HospitalEntry from "./HospitalEntry";
import { useStateValue } from "../state";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  const [detail, setDetail] = useState<any>();

  useEffect(() => {
    if (
      entry.diagnosisCodes &&
      entry.diagnosisCodes.length > 0 &&
      diagnoses.length > 0
    ) {
      let arr: any = [];
      entry.diagnosisCodes.forEach((e) => {
        arr.push(...diagnoses.filter((res) => res.code === e));
      });
      arr.length > 0 && setDetail(arr);
    }
    // eslint-disable-next-line
  }, [diagnoses]);

  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} detail={detail} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthCareEntry entry={entry} detail={detail} />;
    case "Hospital":
      return <HospitalEntry entry={entry} detail={detail} />;
    default:
      return assertNever(entry);
  }
};

const assertNever: React.FC = (entry: any) => {
  return <div>entry not found:{JSON.stringify(entry)}</div>;
};

export default EntryDetails;
