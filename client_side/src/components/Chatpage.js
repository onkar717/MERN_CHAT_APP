import React from 'react'
import { useChatState } from './contextapi/contextprovider'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/misclellious/SideDrawer';
import MyChats from './MyChats';
import ChatBox from './ChatBox';
import '../App.css'

function Chatpage() {

const {user} =  useChatState();
// console.log(user);

  return (
    <div>
   {/* {user && <SideDrawer/>} */}
   <SideDrawer />
   <Box>
    {user && <MyChats/>}
    {user && <ChatBox/>}
   </Box>
    </div>
  )
}

export default Chatpage