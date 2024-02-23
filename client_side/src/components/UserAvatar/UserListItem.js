import React from 'react'
import { useChatState } from '../contextapi/contextprovider'
import { Avatar, Box , Text} from '@chakra-ui/react';

function UserListItem({user , handelfunction}) {

  return (
    <div>
        <Box
        onClick={handelfunction}
        cursor="pointer"
        bg="#E8E8E8"
        _hover={{
            background: "#38B2AC",
            color: "White"
        }}
        w="100%"
        d="flex"
        alignItems="center"
        color="black"
        px={3}
        py={2}
        mb={2}
        borderRadius="lg"
        >
            <Avatar
            mr={2}
            size="sm"
            cursor="pointer"
            name={user.name}
            src={user.pic}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs">
                    <b>Email : </b>
                    {user.email}
                </Text>
            </Box>
        </Box>
    </div>
  )
}

export default UserListItem