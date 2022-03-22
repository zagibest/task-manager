import { useUser } from "@/lib/firebase/useUser";
import {
  Box,
  Flex,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  useToast,
  Image,
  SlideFade,
  Tooltip,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import Task from "@/components/Task";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/initFirebase";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { Navbar } from "@/components/Navbar";
import FirebaseAuth from "@/components/auth/FirebaseAuth";
import { FaPlus, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Footer } from "@/components/Footer";
import { HomeNavbar } from "@/components/HomeNavbar";
//language change
import en from "../locales/en";
import mn from "../locales/mn";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { locale } = router;
  const language = locale === "mn" ? mn : en;
  const { user, logout } = useUser();
  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();

  const [platformValue, setValue] = useState("1");
  const [taskName, setTaskName] = useState("");
  const [taskDetail, setTaskDetail] = useState("");
  const [startDate, setStartDate] = useState();
  const [data, setData] = useState();
  const [stats, setStats] = useState();
  const [filter, setFilter] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const toast = useToast();
  const [cardOpen, setCardOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  //colors
  const textColor = useColorModeValue("black", "whiteAlpha.900");
  const bgColor = useColorModeValue("white", "blackAlpha.500");
  const bgColorSigned = useColorModeValue("gray.50", "blackAlpha.200");
  const textColorSigned = useColorModeValue("black", "whiteAlpha.900");
  const bgColorCard = useColorModeValue("white", "gray.700");
  const colorButton = useColorModeValue("gray.300", "gray.700");

  let buttonCol, buttonCol2, shadow, shadow2;
  if (buttonActive) {
    buttonCol = "teal.500";
    buttonCol2 = colorButton;

    shadow = "base";
    shadow2 = "none";
  } else {
    buttonCol = colorButton;
    buttonCol2 = "teal.500";
    shadow = "none";
    shadow2 = "base";
  }

  const sendData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "admin", user.id, "datas"), {
        taskName: taskName,
        taskDetail: taskDetail,
        value: platformValue,
        taskDate: startDate,
        completed: false,
      });

      onFormClose();
      setStartDate("");
      setTaskName("");
      setTaskDetail("");
      showToast();
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      const q = query(
        collection(db, "admin", user?.id, "datas"),
        orderBy("taskDate")
      );
      const q2 = query(collection(db, "admin", user?.id, "stats"));

      const unsub = onSnapshot(q, (querySnapshot) => {
        let tmpArray = [];
        querySnapshot.forEach((doc) => {
          tmpArray.push({ ...doc.data(), id: doc.id });
        });
        setData(tmpArray);
        setLoading(false);
      });
      const unsub2 = onSnapshot(q2, (querySnapshot) => {
        let tmpArray = [];
        querySnapshot.forEach((doc) => {
          tmpArray.push({ ...doc.data(), id: doc.id });
        });
        setStats(tmpArray);
      });

      return () => {
        unsub();
        unsub2();
      };
    }
  }, [user]);
  let sum = 0,
    statsId = "userStatsId",
    sumOfTeams = 0,
    sumOfSisi = 0,
    sumOfOther = 0;
  stats?.map((item) => {
    statsId = item.id;
    sum = item.sumOfCompleted;
    sumOfSisi = item.sumOfSisi;
    sumOfTeams = item.sumOfTeams;
    sumOfOther = item.sumOfOther;
  });

  const deleteData = (taskId) => {
    deleteDoc(doc(db, "admin", user.id, "datas", taskId));
  };

  const toggleCompleted = (taskId, completed, platformValue) => {
    updateDoc(doc(db, "admin", user.id, "datas", taskId), {
      completed: !completed,
    });
    if (platformValue === "SISI") {
      sumOfSisi++;
    } else if (platformValue === "TEAMS") {
      sumOfTeams++;
    } else {
      sumOfOther++;
    }
    if (!completed && taskId != currentId) {
      sum++;
      setDoc(doc(db, "admin", user.id, "stats", statsId), {
        sumOfCompleted: sum,
        sumOfSisi: sumOfSisi,
        sumOfTeams: sumOfTeams,
        sumOfOther: sumOfOther,
      });
    }
  };
  const t = 0,
    t2 = 0;
  const Cards = data?.map((item) => {
    if (item.completed == true) {
      t++;
    } else {
      t2++;
    }
    if (filter && item.completed) {
      return (
        <Task
          key={item.id}
          taskId={item.id}
          taskName={item.taskName}
          taskDetail={item.taskDetail}
          platformValue={item.value}
          date={item.taskDate}
          completed={item.completed}
          deleteData={deleteData}
          toggleCompleted={toggleCompleted}
        />
      );
    } else if (!filter && !item.completed) {
      return (
        <Task
          key={item.id}
          taskId={item.id}
          taskName={item.taskName}
          taskDetail={item.taskDetail}
          platformValue={item.value}
          date={item.taskDate}
          completed={item.completed}
          deleteData={deleteData}
          toggleCompleted={toggleCompleted}
        />
      );
    }
  });

  const showToast = () => {
    toast({
      title: "Амжилттай",
      description: "Даалгавар амжилттай нэмэгдлээ.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const toggleCard = () => {
    setCardOpen(!cardOpen);
  };

  if (user) {
    return (
      <Box minH="90vh">
        <Box
          display="flex"
          flexDir="column"
          // alignItems="center"
          minH="100vh"
          w="100%"
          bg={bgColorSigned}
          pb="10"
        >
          <Navbar name={user.name} logout={() => logout()} photo={user.photo} />
          <Box
            display="flex"
            flexDir={{ md: "row-reverse", base: "column" }}
            alignItems={{ base: "center", md: "normal" }}
            justifyContent="center"
            color={textColorSigned}
          >
            <Box
              display="flex"
              flexDir="column"
              flex="3"
              // w={{ md: "50%", base: "96%" }}
              w="96%"
              alignItems="center"
              mt="10"
            >
              <Box w={{ md: "lg", base: "95%" }} display="flex" mb="5">
                <Button
                  color="whiteAlpha.900"
                  bg={buttonCol2}
                  flex="1"
                  onClick={() => {
                    setFilter(false);
                    setButtonActive(false);
                  }}
                  borderRadius="0"
                  borderLeftRadius="8"
                  _focus={{
                    bg: { buttonCol2 },
                  }}
                  _hover={{
                    bg: { buttonCol2 },
                  }}
                  boxShadow={shadow2}
                  position="relative"
                >
                  {language.doButtonText}
                  {t2 != 0 && (
                    <Box
                      position="absolute"
                      top="-2"
                      left="0"
                      bg="pink.500"
                      borderRadius="full"
                      h="6"
                      w="6"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text display="inline" fontWeight="bold" fontSize="lg">
                        {t2 != 0 && t2}
                      </Text>
                    </Box>
                  )}
                </Button>
                <Button
                  color="whiteAlpha.900"
                  bg={buttonCol}
                  borderRadius="5, 0"
                  flex="1"
                  onClick={() => {
                    setFilter(true);
                    setButtonActive(true);
                  }}
                  borderRightRadius="8"
                  _focus={{
                    bg: { buttonCol },
                  }}
                  _hover={{
                    bg: { buttonCol2 },
                  }}
                  boxShadow={shadow}
                >
                  {language.doneButtonText}
                </Button>
              </Box>
              <Box w={{ md: "lg", base: "95%" }} display="flex">
                <Button
                  onClick={onFormOpen}
                  _hover={{
                    bg: "teal.500",
                    color: "white",
                  }}
                  leftIcon={<FaPlus />}
                  w="100%"
                >
                  {language.addAssignmentButton}
                </Button>
              </Box>
              <Box
                mt="5"
                w="100%"
                display="flex"
                flexDir="column"
                alignItems="center"
              >
                {Cards}
                {loading && <Spinner color="teal.500" thickness="5px" />}
                {t2 == 0 && !loading && sum != 0 && !filter && (
                  <Box
                    w={{ md: "lg", base: "95%" }}
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    opacity=".9"
                  >
                    <Text
                      fontWeight="light"
                      fontSize="md"
                      mb="5"
                      color="teal.500"
                    >
                      Хийх даалгавар байхгүй байна.
                    </Text>
                    <Image src="./images/new.gif" h="100%" borderRadius="10" />
                  </Box>
                )}
              </Box>
            </Box>
            <Box
              flex="2"
              display="flex"
              w="96%"
              alignItems={{ base: "center", md: "flex-end" }}
              flexDir="column"
            >
              <Box
                bg={bgColorCard}
                w={{ md: "sm", base: "95%" }}
                display="flex"
                boxShadow="base"
                mx="4"
                mt="10"
                borderRadius="10"
                flexDir="column"
                alignItems="center"
                color={textColorSigned}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  h="10vh"
                  w="96%"
                >
                  <Box display="flex" p="4" alignItems="center" h="20">
                    <Image
                      src={user.photo}
                      h="100%"
                      mr="2"
                      borderRadius="full"
                    />
                    <Text
                      fontWeight="bold"
                      fontSize={{ md: "lg", base: "md" }}
                      ml="2"
                    >
                      {user.name}
                    </Text>
                  </Box>
                  {cardOpen ? (
                    <Button variant="ghost" onClick={toggleCard}>
                      <FaChevronUp />
                    </Button>
                  ) : (
                    <Button variant="ghost" onClick={toggleCard}>
                      <FaChevronDown />
                    </Button>
                  )}
                </Box>
                {cardOpen && (
                  <Box h="90%" w="90%" mt="2">
                    <Tooltip
                      label="Хийсэн хэсэгт байгаа даалгаварууд"
                      placement="top-start"
                    >
                      <Text
                        fontWeight="light"
                        alignItems="center"
                        display="flex"
                        justifyContent="space-between"
                        mt="2"
                      >
                        {language.doneText}
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          pl="2"
                          color="teal.500"
                        >
                          {t}
                        </Text>
                      </Text>
                    </Tooltip>
                    <Tooltip
                      label="Устсан болон устаагүй бүх цаг үеийн хийсэн даалгавар"
                      placement="top-start"
                    >
                      <Text
                        fontWeight="light"
                        alignItems="center"
                        display="flex"
                        justifyContent="space-between"
                        mt="2"
                      >
                        {language.allDoneText}
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          pl="2"
                          color="teal.500"
                        >
                          {sum}
                        </Text>
                      </Text>
                    </Tooltip>
                    <Tooltip
                      label="Даалгавар явуулсны дараа шинжлэгдэнэ"
                      placement="top-start"
                    >
                      <Text
                        fontWeight="light"
                        alignItems="center"
                        display="flex"
                        justifyContent="space-between"
                        mt="2"
                      >
                        {language.sisiAssignment}
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          pl="2"
                          color="teal.500"
                        >
                          {sumOfSisi}
                        </Text>
                      </Text>
                    </Tooltip>
                    <Tooltip
                      label="Даалгавар явуулсны дараа шинжлэгдэнэ"
                      placement="top-start"
                    >
                      <Text
                        fontWeight="light"
                        alignItems="center"
                        display="flex"
                        justifyContent="space-between"
                        mt="2"
                      >
                        {language.teamsAssignment}
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          pl="2"
                          color="teal.500"
                        >
                          {sumOfTeams}
                        </Text>
                      </Text>
                    </Tooltip>
                    <Tooltip
                      label="Даалгавар явуулсны дараа шинжлэгдэнэ"
                      placement="top-start"
                    >
                      <Text
                        fontWeight="light"
                        alignItems="center"
                        display="flex"
                        justifyContent="space-between"
                        mt="2"
                        pb="5"
                      >
                        {language.otherAssignment}
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          pl="2"
                          color="teal.500"
                        >
                          {sumOfOther}
                        </Text>
                      </Text>
                    </Tooltip>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          <Modal isOpen={isFormOpen} onClose={onFormClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{language.addAssignmentButton}</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl isRequired>
                  <FormLabel>{language.taskName}</FormLabel>
                  <Input onChange={(data) => setTaskName(data.target.value)} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>{language.taskDetail}</FormLabel>
                  <Input
                    onChange={(data) => setTaskDetail(data.target.value)}
                  />
                </FormControl>
                <RadioGroup onChange={setValue} pt="5">
                  <Box>
                    <Radio value="SISI" pr="4">
                      Sisi
                    </Radio>
                    <Radio value="TEAMS" pr="4">
                      Teams
                    </Radio>
                    <Radio value="БУСАД">{language.taskOther}</Radio>
                  </Box>
                </RadioGroup>
                <FormControl mt={4} isRequired>
                  <FormLabel>{language.taskDate}</FormLabel>
                  <Box border="1px" borderColor="gray.300" borderRadius="md">
                    <Input
                      type="date"
                      colorScheme="teal"
                      onChange={(data) => setStartDate(data.target.value)}
                      placeholder="2022/12/31"
                    />
                  </Box>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="teal"
                  mr={3}
                  onClick={sendData}
                  isLoading={loading}
                  loadingText="Нэмж байна"
                >
                  {language.addText}
                </Button>
                <Button onClick={onFormClose}>{language.closeText}</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <Footer />
      </Box>
    );
  } else
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        minH="100vh"
        flexDir="column"
        w="100%"
        bg={bgColor}
        color={textColor}
        overflow="hidden"
      >
        <HomeNavbar />
        <Box
          display="flex"
          flexDir={{ md: "row", base: "column" }}
          mx="2"
          textAlign="center"
          alignItems="center"
          my="5"
          mt={{ md: "10", base: "20" }}
        >
          <Box
            flex="1"
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box w={{ md: "80%", base: "90%" }} textAlign="center">
              <SlideFade
                direction="top"
                in={true}
                transition={{ enter: { duration: 0.4, delay: 0.3 } }}
              >
                <Text
                  mt={{ md: "-10", base: "10" }}
                  fontSize={{ md: "5xl", base: "4xl" }}
                  fontWeight="900"
                  color={textColor}
                  fontFamily="heading"
                >
                  {language.homeTop}
                </Text>
              </SlideFade>
              <SlideFade
                direction="top"
                in={true}
                transition={{ enter: { duration: 0.4, delay: 0.5 } }}
              >
                <Text
                  fontSize={{ md: "7xl", base: "6xl" }}
                  fontWeight="900"
                  bgGradient="linear(to-l, teal.400, teal.500)"
                  bgClip="text"
                  mt="-5"
                  fontFamily="heading"
                >
                  {language.homeBottom}
                </Text>
              </SlideFade>
            </Box>
            <Box
              w={{ md: "80%", base: "90%" }}
              mb={{ md: "10", base: "5" }}
              mt="2"
            >
              <SlideFade
                direction="top"
                in={true}
                transition={{ enter: { duration: 0.4, delay: 0.5 } }}
              >
                <Text fontWeight="light" fontSize="lg" textAlign="center">
                  {language.homeDetail}
                </Text>
              </SlideFade>
            </Box>

            <FirebaseAuth />
          </Box>
          <Box
            flex="1"
            // w={{ md: "100%", base: "200vw" }}
            mb={{ base: "-10", md: 0 }}
            position={"relative"}
            mx="5"
          >
            <SlideFade
              direction="top"
              in={true}
              transition={{ enter: { duration: 0.4, delay: 0.7 } }}
            >
              <Image
                src="./images/mac-mock.png"
                w={{ md: "90%", base: "100%" }}
                m="auto"
                mt={{ md: 0, base: "10" }}
                alt="NUMo being used on macbook"
                display={{ base: "none", md: "block" }}
              />
              <Image
                src="./images/ip-mock.png"
                w={{ md: "90%", base: "100%" }}
                display={{ md: "none" }}
              />
            </SlideFade>
          </Box>
        </Box>
      </Flex>
    );
}
