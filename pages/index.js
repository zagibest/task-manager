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
} from "firebase/firestore";
import { Navbar } from "@/components/Navbar";
import FirebaseAuth from "@/components/auth/FirebaseAuth";
import { FaPlus } from "react-icons/fa";
import { Footer } from "@/components/Footer";
import { Blob } from "@/components/Blob";

export default function Home() {
  const { user, logout } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [platformValue, setValue] = useState("1");
  const [taskName, setTaskName] = useState();
  const [taskDetail, setTaskDetail] = useState();
  const [startDate, setStartDate] = useState();
  const [data, setData] = useState();
  const [filter, setFilter] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const toast = useToast();

  let buttonCol, buttonCol2, shadow, shadow2;
  if (buttonActive) {
    buttonCol = "teal.500";
    buttonCol2 = "gray.300";

    shadow = "base";
    shadow2 = "none";
  } else {
    buttonCol = "gray.300";
    buttonCol2 = "teal.500";
    shadow = "none";
    shadow2 = "base";
  }

  const sendData = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "admin", user.id, "datas"), {
        taskName: taskName,
        taskDetail: taskDetail,
        value: platformValue,
        taskDate: startDate,
        completed: false,
      });
      onClose();
      setStartDate("");
      setTaskName("");
      setTaskDetail("");
      showToast();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "admin", user?.id, "datas"),
        orderBy("taskDate")
      );

      const unsub = onSnapshot(q, (querySnapshot) => {
        let tmpArray = [];
        querySnapshot.forEach((doc) => {
          tmpArray.push({ ...doc.data(), id: doc.id });
        });
        setData(tmpArray);
      });

      return () => unsub();
    }
  }, [user]);

  const deleteData = (taskId) => {
    deleteDoc(doc(db, "admin", user.id, "datas", taskId));
  };

  const toggleCompleted = (taskId, completed) => {
    updateDoc(doc(db, "admin", user.id, "datas", taskId), {
      completed: !completed,
    });
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

  if (user) {
    return (
      <Box minH="90vh">
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          minH="100vh"
          w="100%"
          bg="gray.50"
          pb="10"
        >
          <Navbar name={user.name} logout={() => logout()} photo={user.photo} />
          <Box
            display="flex"
            flexDir="column"
            w={{ md: "50%", base: "96%" }}
            alignItems="center"
            mt="10"
          >
            <Box w={{ md: "lg", base: "95%" }} display="flex" mb="5">
              <Button
                color="white"
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
              >
                Хийх:
                <Text display="inline" fontWeight="bold" pl="1" fontSize="lg">
                  {t2}
                </Text>
              </Button>
              <Button
                color="white"
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
                Хийсэн:
                <Text display="inline" fontWeight="bold" pl="1" fontSize="lg">
                  {t}
                </Text>
              </Button>
            </Box>
            <Box w={{ md: "lg", base: "95%" }} display="flex">
              <Button
                onClick={onOpen}
                _hover={{
                  bg: "teal.500",
                  color: "white",
                }}
                leftIcon={<FaPlus />}
                w="100%"
              >
                Даалгавар нэмэх
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
            </Box>
          </Box>
          <Box></Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Даалгавар нэмэх</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl isRequired>
                  <FormLabel>Даалгавар нэр</FormLabel>
                  <Input onChange={(data) => setTaskName(data.target.value)} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Дэлгэрэнгүй (заавал биш)</FormLabel>
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
                    <Radio value="БУСАД">Бусад</Radio>
                  </Box>
                </RadioGroup>
                <FormControl mt={4} isRequired>
                  <FormLabel>Дуусах хугацаа</FormLabel>
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
                <Button colorScheme="teal" mr={3} onClick={sendData}>
                  Нэмэх
                </Button>
                <Button onClick={onClose}>Хаах</Button>
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
        color="black"
        overflow="hidden"
      >
        <Box
          display="flex"
          flexDir={{ md: "row", base: "column" }}
          mx="2"
          textAlign="center"
          alignItems="center"
          my="5"
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
                  color="black"
                  fontFamily="heading"
                >
                  БҮХ ДААЛГАВАР
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
                  НЭГ ДОР
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
                  Teams Sisi дээр зэрэг даалгавар орохоор мартчихаад байгаа биз
                  😝. NUMO дээр даалгавараа тэмдэглээд амар тайван унтаарай!
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
                src="./mac-mock.png"
                w={{ md: "90%", base: "100%" }}
                m="auto"
                mt={{ md: 0, base: "10" }}
                alt="NUMo being used on macbook"
                display={{ base: "none", md: "block" }}
              />
              <Image
                src="./ip-mock.png"
                w={{ md: "90%", base: "100%" }}
                display={{ md: "none" }}
              />
              <Blob
                color="teal.50"
                w={"120%"}
                h={"140%"}
                position={"absolute"}
                top={{ md: "-20%", base: "-10%" }}
                right={{ md: 2.5, base: 0 }}
                zIndex={-1}
              />
            </SlideFade>
          </Box>
        </Box>
      </Flex>
    );
}
