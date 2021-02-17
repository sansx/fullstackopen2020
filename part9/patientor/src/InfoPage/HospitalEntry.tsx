import React from "react";
import { Card, Icon, List } from "semantic-ui-react";
import { HospitalEntry as Hospital, Diagnosis } from "../types";

const HospitalEntry: React.FC<{ entry: Hospital; detail: Diagnosis[] }> = ({
  entry,
  detail,
}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon size="big" name="hospital" />
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

export default HospitalEntry;
