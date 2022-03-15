import { Box, Button, Text } from "@chakra-ui/react";

export const Navbar = (props) => {
  return (
    <Box
      h={{ md: "10vh", base: "15vh" }}
      display="flex"
      justifyContent={{ md: "space-between", base: "space-evenly" }}
      alignItems="center"
      flexDir={{ md: "row", base: "column" }}
      bg="teal.500"
      color="white"
      w="100%"
    >
      <Text fontWeight="bold" ml={{ md: "10", base: 0 }} fontSize="lg">
        {props.name}
        <Text display="inline" fontWeight="normal">
          {" "}
          rocks!
        </Text>
      </Text>
      <Button
        onClick={props.logout}
        mr={{ md: "10", base: 0 }}
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
