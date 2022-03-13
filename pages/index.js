import { useUser } from "@/lib/firebase/useUser";
import {
  Box,
  Flex,
  Link,
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
} from "@chakra-ui/react";
import Task from "@/components/Task";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/initFirebase";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const { user, logout } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [platformValue, setValue] = useState("1");
  const [taskName, setTaskName] = useState();
  const [taskDetail, setTaskDetail] = useState();
  const [startDate, setStartDate] = useState();
  const [data, setData] = useState();
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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
      alert("Амжилттай");
      onClose();
      setStartDate("");
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
        // console.log(tmpArray);
        console.log(data);
      });

      return () => unsub();
    }
  }, [user]);

  const Cards = data?.map((item) => {
    return (
      <Task
        key={item.id}
        taskName={item.taskName}
        taskDetail={item.taskDetail}
        platformValue={item.value}
        date={item.taskDate}
        completed={item.completed}
      />
    );
  });

  if (user) {
    return (
      <Box display="flex" flexDir="column" alignItems="center" h="100vh">
        <Box
          display="flex"
          flexDir="column"
          w={{ md: "50%", base: "90%" }}
          alignItems="center"
          mt="10"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            w="100%"
            flexDir={{ md: "row", base: "column" }}
            alignItems="center"
          >
            <Text color="blue.400" fontSize="xl" mb={{ md: 0, base: "5" }}>
              {user.name}
              <Text display="inline" color="black">
                's shits to do
              </Text>
            </Text>
            <Button onClick={onOpen}>Даалгавар нэмэх</Button>
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
          <Button onClick={() => logout()}>Log Out</Button>
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
                <Input onChange={(data) => setTaskDetail(data.target.value)} />
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
    );
  } else
    return (
      <Flex alignItems="center" justifyContent="center" h="100vh">
        <Link href="/auth">
          <Button>Нэвтрэх</Button>
        </Link>
      </Flex>
    );
}

// Card.Title>{user.name}</Card.Title>
//             <Card.Text>{user.email}</Card.Text>
//             <hr />
//             {user.profilePic ? (
//               <image src={user.profilePic} height={100} width={100}></image>
//             ) : (
//               <p>No profile pic</p>
//             )}
