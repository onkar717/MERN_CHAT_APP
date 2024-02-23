  import React, { useEffect, useState } from "react";
  import { useChatState } from "./contextapi/contextprovider";
  import { useToast } from "@chakra-ui/react";
  import axios from "axios";

  function MyChats() {
    const [loggedUser, setloggedUser] = useState();
    const { user, Chat, setChat, SelectedChat, setSelectedChat } = useChatState();

    const toast = useToast();

    const fetchChats = async () => {
      // console.log(user._id);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get("/api/chat", config);
        setChat(data);
      } catch (error) {
        toast({
          title: "Error Fetching Chats",
          status: error.message,
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
      }
    };

    useEffect(() => {
      setloggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats();
    }, []);

    return <div>47 My chats</div>;
  }

  export default MyChats;
