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
} from "firebase/firestore";
import { Navbar } from "@/components/Navbar";
import FirebaseAuth from "@/components/auth/FirebaseAuth";
import { FaPlus } from "react-icons/fa";
import { Footer } from "@/components/Footer";

export default function Home() {
  const { user, logout } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [platformValue, setValue] = useState("1");
  const [taskName, setTaskName] = useState();
  const [taskDetail, setTaskDetail] = useState();
  const [startDate, setStartDate] = useState();
  const [data, setData] = useState();
  const toast = useToast();

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
      showToast();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "admin", user?.id, "datas"));

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

  const Cards = data?.map((item) => {
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
          minH="90vh"
          w="100%"
          bg="gray.50"
        >
          <Navbar name={user.name} logout={() => logout()} />
          <Box
            display="flex"
            flexDir="column"
            w={{ md: "50%", base: "96%" }}
            alignItems="center"
            mt="10"
          >
            <Box w={{ md: "lg", base: "95%" }}>
              <Button
                onClick={onOpen}
                _hover={{
                  bg: "teal.500",
                  color: "white",
                }}
                rightIcon={<FaPlus />}
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
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Даалгавар нэмэх</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
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
                <FormControl mt={4}>
                  <FormLabel>Дуусах хугацаа</FormLabel>
                  <Box border="1px" borderColor="gray.300" borderRadius="md">
                    <Input
                      type="date"
                      onChange={(data) => setStartDate(data.target.value)}
                      placeholder="2022/12/31"
                    />
                  </Box>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={sendData}>
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
        h="100vh"
        flexDir="column"
        w="100%"
        bgGradient="linear(to-l, teal.300, teal.600)"
        color="white"
        overflow="hidden"
      >
        <Box
          display="flex"
          flexDir={{ md: "row", base: "column" }}
          mx="2"
          textAlign="center"
          alignItems="center"
        >
          <Box
            flex="1"
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              mt="-20"
              fontSize={{ md: "5xl", base: "4xl" }}
              fontWeight="black"
            >
              БҮХ ДААЛГАВАР
            </Text>
            <Text
              fontSize={{ md: "6xl", base: "5xl" }}
              fontWeight="black"
              mb="10"
            >
              НЭГ ДОР
            </Text>
            <FirebaseAuth />
          </Box>
          <Box
            flex="1"
            // w={{ md: "100%", base: "200vw" }}
            mb={{ base: "-10", md: 0 }}
          >
            <Image
              src="./mock-up.png"
              w={{ md: "90%", base: "100%" }}
              m="auto"
              mt={{ md: 0, base: "10" }}
            />
          </Box>
        </Box>
        <Text
          fontWeight="light"
          opacity="0.5"
          fontSize="sm"
          position="absolute"
          bottom="10"
        >
          © All rights reserved - 2022
        </Text>
      </Flex>
    );
}
