import { Box, Link, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box
      h="8vh"
      display="flex"
      alignItems="center"
      bg="teal.500"
      color="whiteAlpha.800"
      w="100%"
      justifyContent="space-evenly"
    >
      <Text fontSize="sm">
        Crafted with ❤️ by
        <Link
          display="inline"
          href="https://zagi.live/"
          _hover={{
            color: "white",
          }}
        >
          <Text fontWeight="bold" display="inline">
            {" "}
            Zagi
          </Text>
        </Link>
      </Text>
      <Link
        href="mailto:zagig35@gmail.com"
        _hover={{
          color: "white",
        }}
      >
        <Text fontSize="sm">Холбогдох</Text>
      </Link>
    </Box>
  );
};
