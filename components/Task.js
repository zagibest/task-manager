import {
  Box,
  Text,
  Circle,
  Flex,
  Button,
  Divider,
  Image,
} from "@chakra-ui/react";
import { FaCheck, FaTrash } from "react-icons/fa";
export default function Task(props) {
  let color, imgSrc, svgHeight, svgMargin;
  if (props.platformValue === "SISI") {
    color = "blue.200";
    imgSrc = "./sisi.svg";
    svgHeight = "4";
    svgMargin = "2";
  } else if (props.platformValue === "TEAMS") {
    color = "purple.200";
    imgSrc = "./teams.svg";
    svgHeight = "5";
    svgMargin = "1";
  } else {
    color = "gray.200";
  }

  let completed;
  if (props.completed) {
    completed = 0.5;
  } else {
    completed = 1;
  }

  var date2 = new Date(props.date);
  var date1 = new Date();
  let dayColor;

  var Difference_In_Time = date2.getTime() - date1.getTime();

  var Difference_In_Days =
    Math.floor(Difference_In_Time / (1000 * 3600 * 24)) + 1;

  if (Difference_In_Days < 0) {
    Difference_In_Days = "Хугацаа дууссан";
    dayColor = "red.500";
  } else if (Difference_In_Days == 0) {
    Difference_In_Days = "Өнөөдөр";
    dayColor = "teal.500";
  } else {
    Difference_In_Days = Difference_In_Days + " хоног";
    dayColor = "teal.500";
  }

  return (
    <Box
      boxShadow="base"
      borderRadius="lg"
      w={{ md: "lg", base: "95%" }}
      mb="5"
      bg="white"
      position="relative"
    >
      <Box p="5" opacity={completed}>
        <Flex justifyContent="space-between">
          <Text fontSize="xl" as="b">
            {props.taskName}
          </Text>

          <Circle bg={color} w="24" fontSize="smaller" h="10">
            <Image src={imgSrc} display="inline" mr={svgMargin} h={svgHeight} />
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
              {props.date} •{" "}
              <Text color={dayColor} display="inline" fontWeight="semibold">
                {Difference_In_Days}
              </Text>
            </Text>
          </Box>
          <Box display="flex" flex="1" justifyContent="flex-end">
            <Button
              mr="2"
              _hover={{
                bg: "teal.500",
                color: "white",
              }}
              onClick={() =>
                props.toggleCompleted(props.taskId, props.completed)
              }
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
