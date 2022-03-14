import { Box, Button, Text } from "@chakra-ui/react";

export const Navbar = (props) => {
  return (
    <Box
      h={{ md: "10vh", base: "15vh" }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDir={{ md: "row", base: "column" }}
      bg="teal.500"
      color="white"
      w="100%"
    >
      <Text
        fontWeight="bold"
        ml={{ md: "10", base: 0 }}
        mt={{ md: 0, base: "4" }}
        fontSize="xl"
      >
        {props.name}
        <Text display="inline" fontWeight="normal">
          {" "}
          rocks!
        </Text>
      </Text>
      <Button
        onClick={props.logout}
        mr={{ md: "10", base: 0 }}
        mb={{ md: 0, base: "4" }}
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
