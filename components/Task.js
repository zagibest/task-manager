import { Box, Text, Circle, Flex, Button, Divider } from "@chakra-ui/react";
import { FaEdit, FaCheck, FaTrash } from "react-icons/fa";

export default function Task(props) {
  let color;
  if (props.platformValue === "SISI") {
    color = "blue.200";
  } else if (props.platformValue === "TEAMS") {
    color = "purple.200";
  } else {
    color = "gray.200";
  }
  return (
    <Box
      boxShadow="base"
      borderRadius="lg"
      w={{ md: "lg", base: "95%" }}
      mb="5"
    >
      <Box p="5">
        <Flex justifyContent="space-between">
          <Text fontSize="xl" as="b">
            {props.taskName}
          </Text>

          <Circle bg={color} w="20" fontSize="smaller">
            {props.platformValue}
          </Circle>
        </Flex>
        <Flex justifyContent="space-between" pt="5">
          <Text>{props.taskDetail}</Text>
        </Flex>
        <Divider py="2" />
        <Flex pt="5">
          <Box flex="1" display="flex" alignItems="center">
            <Text fontSize="sm">{props.date} • 5 хоног</Text>
          </Box>
          <Box display="flex" flex="1" justifyContent="flex-end">
            <Button onClick={props.toggle} mr="2">
              <FaCheck />
            </Button>
            <Button onClick={props.delete}>
              <FaTrash />
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
