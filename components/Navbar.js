import {
  Box,
  Button,
  Text,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export const Navbar = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const { toggleColorMode } = useColorMode();

  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  // const textColor = useColorModeValue("whiteAlpha.900", "black");
  return (
    <Box
      h="20"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="teal.500"
      color="whiteAlpha.900"
      // color={textColor}
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

      <Box mr={{ md: "10", base: "5" }}>
        <Button mr={{ base: "2", md: "4" }} variant="outline">
          Ашиглах заавар
        </Button>
        {darkMode ? (
          <Button
            mr={{ base: "2", md: "4" }}
            variant="outline"
            onClick={() => {
              handleClick();
              toggleColorMode();
            }}
          >
            <FaSun />
          </Button>
        ) : (
          <Button
            mr={{ base: "2", md: "4" }}
            variant="outline"
            onClick={() => {
              handleClick();
              toggleColorMode();
            }}
          >
            <FaMoon />
          </Button>
        )}

        <Button variant="outline" mr={{ base: "2", md: "4" }}>
          🇺🇸
        </Button>
        <Button
          onClick={props.logout}
          mr={{ md: "10", base: "5" }}
          color="white"
          // border="2px"
          variant="outline"
          bg="transparent"
          _hover={{
            bg: "white",
            color: "teal.500",
          }}
        >
          Гарах
        </Button>
      </Box>
    </Box>
  );
};
