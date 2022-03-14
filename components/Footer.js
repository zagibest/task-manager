import { Box, Link, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box
      h="10vh"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDir={{ md: "row", base: "column" }}
      bg="teal.500"
      color="white"
      w="100%"
    >
      <Text fontSize="md" m="auto">
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
