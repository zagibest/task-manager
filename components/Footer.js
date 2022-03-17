import { Box, Link, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box
      h="8vh"
      display="flex"
      alignItems="center"
      bg="teal.500"
      color="whiteAlpha.700"
      w="100%"
    >
      <Text fontSize="sm" m="auto">
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
    </Box>
  );
};
