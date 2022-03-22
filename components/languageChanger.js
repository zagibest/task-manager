import { Box, Button } from "@chakra-ui/react";

import { useRouter } from "next/router";

export const languageChanger = () => {
  const router = useRouter();
  const { locale } = router;
  const [lang, setLang] = useState(false);

  const changeLangMob = () => {
    setLang(!lang);
    if (lang) {
      locale = "en";
    } else {
      locale = "mn";
    }
    router.push(router.pathname, router.asPath, { locale });
  };
  return (
    <Box>
      {lang ? (
        <Button
          onClick={changeLangMob}
          mr={{ base: "2", md: "4" }}
          variant="outline"
          _focus={{ bg: "teal.500" }}
        >
          🇺🇸
        </Button>
      ) : (
        <Button
          onClick={changeLangMob}
          mr={{ base: "2", md: "4" }}
          variant="outline"
          _focus={{ bg: "teal.500" }}
        >
          🇲🇳
        </Button>
      )}
    </Box>
  );
};
