import { ViewIcon } from "@chakra-ui/icons";
import {
  Text,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Image
} from "@chakra-ui/react";
import React from "react";
import { useChatState } from "../contextapi/contextprovider";


function Profilemodal({ children }) {
  const {user} = useChatState();
  console.log(user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
        height="410px"
        >
          <ModalHeader
          fontSize="40px"
          fontFamily="Work sans"
          display="flex"
          justifyContent="center"
          >
            {user?.name}
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
          >
            <Image
            borderRadius="full"
            boxSize="150px"
            src={user.pic}
            alt={user.name}
            />
          </ModalBody>
        <Text
        fontSize={{base:"28px",md: "30px"}}
        fontFamily="Work sans"
        >
            Email: {user.email}
        </Text>
          <ModalFooter>
            <Button colorScheme="blue" marginRight="150px" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Profilemodal;
