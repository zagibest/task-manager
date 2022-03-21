import {
  Box,
  Text,
  Circle,
  Flex,
  Button,
  Divider,
  Image,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCheck, FaTrash } from "react-icons/fa";
export default function Task(props) {
  let color, imgSrc, svgHeight;
  if (props.platformValue === "SISI") {
    color = "blue.200";
    imgSrc = "./images/sisi.svg";
    svgHeight = "5";
  } else if (props.platformValue === "TEAMS") {
    color = "purple.200";
    imgSrc = "./images/teamz.svg";
    svgHeight = "6";
  } else {
    color = "gray.200";
    imgSrc = "./images/book.svg";
    svgHeight = "5";
  }

  let completed;
  if (props.completed) {
    completed = 0.7;
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
  } else if (Difference_In_Days == 1) {
    Difference_In_Days = "Маргааш";
    dayColor = "teal.500";
  } else {
    Difference_In_Days = Difference_In_Days + " хоног";
    dayColor = "teal.500";
  }

  //colors
  const cardBg = useColorModeValue("white", "gray.700");
  const cardText = useColorModeValue("black", "whiteAlpha.900");
  const dateText = useColorModeValue("blackAlpha.700", "whiteAlpha.900");

  return (
    <Box
      boxShadow="base"
      borderRadius="lg"
      w={{ md: "lg", base: "95%" }}
      mb="5"
      bg={cardBg}
      position="relative"
      color={cardText}
    >
      <Box p="5" opacity={completed}>
        <Flex justifyContent="space-between">
          <Text fontSize={{ md: "xl", base: "lg" }} as="b">
            {props.taskName}
          </Text>
          <Tooltip label={props.platformValue}>
            <Circle bg={color} w="12" fontSize="smaller" h="10">
              <Image src={imgSrc} display="inline" h={svgHeight} />
            </Circle>
          </Tooltip>
        </Flex>
        <Flex justifyContent="space-between" pt="5">
          <Text fontSize={{ md: "16", base: "16" }}>{props.taskDetail}</Text>
        </Flex>
        <Divider py="2" />
        <Flex pt="5">
          <Box flex="1" display="flex" alignItems="center">
            <Text fontSize="sm" color={dateText}>
              {props.date} •{" "}
              <Text color={dayColor} display="inline" fontWeight="semibold">
                {Difference_In_Days}
              </Text>
            </Text>
          </Box>
          <Box
            display="flex"
            flex="1"
            justifyContent="flex-end"
            color={dateText}
          >
            <Button
              mr="2"
              _hover={{
                bg: "teal.500",
                color: "white",
              }}
              onClick={() =>
                props.toggleCompleted(
                  props.taskId,
                  props.completed,
                  props.platformValue
                )
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
