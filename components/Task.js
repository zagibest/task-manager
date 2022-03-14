import { Box, Text, Circle, Flex, Button, Divider } from "@chakra-ui/react";
import { FaCheck, FaTrash } from "react-icons/fa";
export default function Task(props) {
  let color;
  if (props.platformValue === "SISI") {
    color = "blue.200";
  } else if (props.platformValue === "TEAMS") {
    color = "purple.200";
  } else {
    color = "gray.200";
  }
  var date2 = new Date(props.date);
  var date1 = new Date();

  var Difference_In_Time = date2.getTime() - date1.getTime();

  var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));

  return (
    <Box
      boxShadow="base"
      borderRadius="lg"
      w={{ md: "lg", base: "95%" }}
      mb="5"
      bg="white"
    >
      <Box p="5">
        <Flex justifyContent="space-between">
          <Text fontSize="xl" as="b">
            {props.taskName}
          </Text>

          <Circle bg={color} w="20" fontSize="smaller" h="10">
            {props.platformValue}
          </Circle>
        </Flex>
        <Flex justifyContent="space-between" pt="5">
          <Text>{props.taskDetail}</Text>
        </Flex>
        <Divider py="2" />
        <Flex pt="5">
          <Box flex="1" display="flex" alignItems="center">
            <Text fontSize="sm">
              {props.date} • {Difference_In_Days} хоног
            </Text>
          </Box>
          <Box display="flex" flex="1" justifyContent="flex-end">
            <Button
              onClick={props.toggle}
              mr="2"
              _hover={{
                bg: "teal.500",
                color: "white",
              }}
            >
              <FaCheck />
            </Button>
            <Button
              onClick={() => props.deleteData(props.taskId)}
              _hover={{
                bg: "red.500",
                color: "white",
              }}
            >
              <FaTrash />
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
