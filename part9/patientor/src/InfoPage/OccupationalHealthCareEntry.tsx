import React from "react";
import { Card, Icon, List } from "semantic-ui-react";
import {
  OccupationalHealthCareEntry as OccupationalHealthCare,
  Diagnosis,
} from "../types";

const OccupationalHealthCareEntry: React.FC<{
  entry: OccupationalHealthCare;
  detail: Array<Diagnosis>;
}> = ({ entry, detail }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon size="big" name="stethoscope" />{" "}
          {entry.employerName}
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>
      {detail && (
        <Card.Content extra>
          <List>
            {detail &&
              detail.map((e, idx) => (
                <List.Item key={idx}>
                  <List.Header>
                    {e.code} - {e.name}
                  </List.Header>
                </List.Item>
              ))}
          </List>
        </Card.Content>
      )}
    </Card>
  );
};

export default OccupationalHealthCareEntry;
