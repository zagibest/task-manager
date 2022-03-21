import { Box, Button, Text, Image, Link } from "@chakra-ui/react";

export const Navbar = (props) => {
  return (
    <Box
      h="20"
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
        <Link href="/">
          <Text fontWeight="bold" fontSize={{ md: "lg", base: "md" }}>
            NUMO
          </Text>
        </Link>
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
