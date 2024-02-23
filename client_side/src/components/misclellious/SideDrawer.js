import React, { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton, 
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  // MenuItem,
  // MenuList,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useChatState } from "../contextapi/contextprovider";
import Profilemodal from "./Profilemodal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

function SideDrawer() {
  const { user , setSelectedChat , Chat , setChat} = useChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const [Search, setSearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [loading, setloading] = useState(false); 
  const [loadingChat, setloadingChat] = useState();

  const logouthandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const toast = useToast();

  const handelsearch = async () => {
    if (!Search) {
      toast({
        title: "Please ENter Something in Search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setloading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${Search}`, config);

      if (!Chat.find((c) => c._id === data.id)) {
        setChat([data , ...Chat])
      }

      setloading(false);
      setsearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured !",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setloading(true)

      const config = {
        headers: {
          "Conten-type":"application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.post('/api/chat' , {userId} , config)
      setSelectedChat(data);
      setloading(false)
      onClose();
    } catch (error) {
      toast({
        title: "Error Occured ! Fetching the Chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="198vh"
        h="10%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users To Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i class="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton fontSize="2xl" fontFamily="Work sans">
              <BellIcon fontSize="2xl" />
            </MenuButton>
            {/* <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList> */}
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user?.name}
                src={user?.pic}
              />
            </MenuButton>
            <MenuList>
              <Profilemodal user={user} />
              <MenuItem>My Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logouthandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pd={2}>
              <Input
                placeholder="Search by name or Email"
                mr={2}
                value={Search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handelsearch}>Go</Button>
            </Box>
            {loading ? (<ChatLoading />)
            :
            (
              searchResult?.map(user => (
                <UserListItem key={user._id}  user={user} handelfunction={()=> accessChat(user._id)}/>
              ))
            )}
            {loading && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
