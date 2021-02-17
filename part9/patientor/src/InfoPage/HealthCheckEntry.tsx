import React from "react";
import { Card, Icon, List } from "semantic-ui-react";
import { HealthCheckEntry as HealthCheck, Diagnosis } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";

const HealthCheckEntry: React.FC<{
  entry: HealthCheck;
  detail: Array<Diagnosis>;
}> = ({ entry, detail }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon size="big" name="user md" />
        </Card.Header>
        {entry.description}
        <Card.Description>
          <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
        </Card.Description>
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

export default HealthCheckEntry;
