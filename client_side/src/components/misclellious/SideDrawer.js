import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  // MenuItem,
  // MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useChatState } from "../contextapi/contextprovider";
import Profilemodal from "./Profilemodal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function SideDrawer() {
  const {user} = useChatState();

  const history = useHistory();

  const [Search, setSearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingChat, setloadingChat] = useState();

  const logouthandler = () => {
    localStorage.removeItem("userInfo")
    history.push("/")
  }


  return (
    <>
    {/* <div className=""> */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        h="10%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users To Chat" hasArrow placement="bottom-end">
          <Button variant="ghost">
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
            // name={user?.name} 
            // src={user?.pic}
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
      {/* </div> */}
    </>
  );
}

export default SideDrawer;
