import React, { useEffect } from 'react';
import {Text , Box, Container, TabList, Tab, Tabs, TabPanel ,TabPanels } from '@chakra-ui/react';
import Login from './Authentication/Login';
import Singup from './Authentication/Singup';
import { useHistory } from 'react-router-dom';

function Homepage() {


  const history = useHistory();

  useEffect(() => {
   const userInfo = JSON.parse(localStorage.getItem("userInfo"));

   if (!userInfo) {
      history.push('/chats')
   }

  }, [history])



  return (
    <Container maxW='xl' centerContent>
      <Box
      d='flex'
      justifyContent='center'
      p={3}
      bg={'white'}
      m="40px 0 15px 0"
      w="100%"
      borderRadius="lg"
      borderWidth="1px"
      >
        <Text fontSize='4xl' fontFamily="Work sans" color='black'>Talk-A-Tive</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
      <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sing Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login />
    </TabPanel>
    <TabPanel>
      <Singup />
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  )
}

export default Homepage