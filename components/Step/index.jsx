import React from "react";
import { Heading, Text, Box } from "native-base";

function Step(props) {
  const { count, title, description } = props;

  return (
    <Box key={title} mb="8">
      <Heading>
        {count}. {title}
      </Heading>
      <Text>{description}</Text>
    </Box>
  );
}

export default Step;
