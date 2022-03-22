//chakra ui
import {
  Box,
  Button,
  Text,
  Link,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
//react hooks
import { useState } from "react";
//icons
import { FaSun, FaMoon, FaBars } from "react-icons/fa";
//router
import { useRouter } from "next/router";
//language imports
import en from "../locales/en";
import mn from "../locales/mn";

import { languageChanger } from "./languageChanger";

export const Navbar = (props) => {
  const router = useRouter();
  // const { locale } = router;
  const language = mn;
  // const [lang, setLang] = useState(false);

  //changing language function

  const [darkMode, setDarkMode] = useState(false);
  const { toggleColorMode } = useColorMode();

  //changing color mode function
  const handleClick = () => {
    setDarkMode(!darkMode);
  };

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
        <Box display="flex">
          <Button
            mr={{ base: "2", md: "4" }}
            variant="outline"
            _hover={{ color: "teal.500", bg: "whiteAlpha.900" }}
            display="inline"
            _focus={{ bg: "teal.500" }}
          >
            {language.usageButtonText}
          </Button>
          {darkMode ? (
            <Button
              mr={{ base: "2", md: "4" }}
              variant="outline"
              onClick={() => {
                handleClick();
                toggleColorMode();
              }}
              _focus={{ bg: "teal.500" }}
              _hover={{ color: "teal.500", bg: "whiteAlpha.900" }}
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
              _focus={{ bg: "teal.500" }}
            >
              <FaMoon />
            </Button>
          )}
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
            _focus={{ bg: "teal.500" }}
          >
            {language.logOutButtonText}
          </Button>
        </Box>
      </Box>
      <Menu>
        <MenuButton
          as={Button}
          variant="outline"
          display={{ md: "none", base: "block" }}
          _focus={{ bg: "teal.500" }}
          _hover={{ bg: "teal.500" }}
          fontSize="lg"
          mr="4"
        >
          <FaBars />
        </MenuButton>
        <MenuList color="whiteAlpha.900" bg="teal.500">
          <MenuItem _focus={{ bg: "teal.500" }} _hover={{ bg: "teal.500" }}>
            <Button variant="outline" w="100%">
              {language.usageButtonText}
            </Button>
          </MenuItem>
          <MenuItem _focus={{ bg: "teal.500" }} _hover={{ bg: "teal.500" }}>
            {darkMode ? (
              <Button
                w="100%"
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
                w="100%"
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
          <MenuItem _focus={{ bg: "teal.500" }} _hover={{ bg: "teal.500" }}>
            <Button
              onClick={props.logout}
              w="100%"
              // border="2px"
              variant="outline"
              _hover={{
                bg: "white",
                color: "teal.500",
              }}
            >
              {language.logOutButtonText}
            </Button>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
