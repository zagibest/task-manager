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
import { useRouter } from "next/router";

import en from "../locales/en";
import mn from "../locales/mn";

export const HomeNavbar = () => {
  const [lang, setLang] = useState(false);
  const router = useRouter();
  const { locale } = router;
  const language = locale === "mn" ? mn : en;
  const [darkMode, setDarkMode] = useState(false);
  const { toggleColorMode } = useColorMode();

  const changeLanguage = (e) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  const changeLangMob = () => {
    setLang(!lang);

    if (lang) {
      locale = "en";
    } else {
      locale = "mn";
    }
    router.push(router.pathname, router.asPath, { locale });
  };

  const textColor = useColorModeValue("black", "whiteAlpha.900");

  return (
    <Box
      h="20"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      //   bg="teal.500"
      color={textColor}
      w="100%"
      position="absolute"
      top="0"
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

      <Box mr={{ md: "10", base: "5" }} color={textColor} display="flex">
        <Button mr={{ base: "2", md: "4" }} variant="outline">
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

        {lang ? (
          <Button
            onClick={changeLangMob}
            mr={{ base: "2", md: "4" }}
            variant="outline"
          >
            🇺🇸
          </Button>
        ) : (
          <Button
            onClick={changeLangMob}
            mr={{ base: "2", md: "4" }}
            variant="outline"
          >
            🇲🇳
          </Button>
        )}
      </Box>
    </Box>
  );
};
