import {
  Box,
  Button,
  Text,
  Link,
  useColorMode,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaSun, FaMoon, FaBars } from "react-icons/fa";

export const Navbar = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const { toggleColorMode } = useColorMode();

  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  const textColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const bgColor = useColorModeValue("whiteAlpha.900", "gray.700");
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

      <Box mr={{ md: "10", base: "5" }} display={{ base: "none", md: "block" }}>
        <Button
          mr={{ base: "2", md: "4" }}
          variant="outline"
          _hover={{ color: "teal.500", bg: "whiteAlpha.900" }}
        >
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
            _hover={{ color: "teal.500", bg: "whiteAlpha.900" }}
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
          // border="2px"
          variant="outline"
          _hover={{
            bg: "white",
            color: "teal.500",
          }}
          color="whiteAlpha.900"
        >
          Гарах
        </Button>
      </Box>
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          display={{ md: "none", base: "block" }}
          mr="2"
        >
          <FaBars />
        </MenuButton>
        <MenuList bg={bgColor} color={textColor}>
          <MenuItem>
            <Button mr={{ base: "2", md: "4" }} variant="outline">
              Ашиглах заавар
            </Button>
          </MenuItem>
          <MenuItem>
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
          </MenuItem>
          <MenuItem>
            <Button variant="outline" mr={{ base: "2", md: "4" }}>
              🇺🇸
            </Button>
          </MenuItem>
          <MenuItem>
            {" "}
            <Button
              onClick={props.logout}
              mr={{ md: "10", base: "5" }}
              color={textColor}
              // border="2px"
              variant="outline"
              bg={bgColor}
              _hover={{
                bg: "white",
                color: "teal.500",
              }}
            >
              Гарах
            </Button>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
