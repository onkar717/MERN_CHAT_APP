import React from 'react'
import { useChatState } from './contextapi/contextprovider'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/misclellious/SideDrawer';
import MyChats from './MyChats';
import ChatBox from './ChatBox';

function Chatpage() {

const {user} =  useChatState();

  return (
    <>
   {/* {user && <SideDrawer/>} */}
   <SideDrawer />
   <Box>
    {user && <MyChats/>}
    {user && <ChatBox/>}
   </Box>
    </>
  )
}

export default Chatpage