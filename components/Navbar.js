import { Box, Button, Text } from "@chakra-ui/react";

export const Navbar = (props) => {
  return (
    <Box
      h="10vh"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      // flexDir={{ md: "row", base: "column" }}
      bg="teal.500"
      color="white"
      w="100%"
    >
      <Text
        fontWeight="bold"
        ml={{ md: "10", base: "5" }}
        fontSize={{ md: "lg", base: "md" }}
      >
        {props.name}
        <Text display="inline" fontWeight="normal">
          {" "}
          rocks!
        </Text>
      </Text>
      <Button
        onClick={props.logout}
        mx={{ md: "10", base: "5" }}
        color="white"
        border="2px"
        bg="transparent"
        _hover={{
          bg: "white",
          color: "teal.500",
        }}
      >
        Гарах
      </Button>
    </Box>
  );
};
