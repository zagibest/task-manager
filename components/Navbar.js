import { Box, Button, Text, Image } from "@chakra-ui/react";

export const Navbar = (props) => {
  return (
    <Box
      h="10vh"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="teal.500"
      color="white"
      w="100%"
    >
      <Box
        ml={{ md: "10", base: "5" }}
        h="100%"
        display="flex"
        alignItems="center"
      >
        <Image src={props.photo} h="50%" mr="2" borderRadius="full" />
        <Text fontWeight="bold" fontSize={{ md: "lg", base: "md" }}>
          {props.name}
          <Text display="inline" fontWeight="normal">
            {" "}
            rocks!
          </Text>
        </Text>
      </Box>

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
