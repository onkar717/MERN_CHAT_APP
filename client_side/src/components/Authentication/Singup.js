import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  toast,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios"
import {useHistory} from "react-router-dom"

function Singup() {
  const [show, setshow] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confimpassowrd, setconfimpassowrd] = useState("");
  const [pic, setpic] = useState("");
  const [loading, setloading] = useState(false);
  const toast = useToast();

  const history = useHistory();

  const handelclick = () => {
    setshow(!show);
  };

  const postDetails = (e) => {
    const file = e.target.files[0];
    setpic(file);

    if (!file) {
      toast({
        title: "Please Select Image",
        status: "warning",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }

    if (file.type === "image/jpeg" || file.type === "image/png") {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dtcrsjazl");

      fetch("https://api.cloudinary.com/v1_1/dtcrsjazl/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setpic(data.url.toString());
          console.log(data.url.toString());
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    } else {
      toast({
        title: "Invalid File Type",
        status: "error",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
    }
  };

  const submitHandler = async () => {
    if (!name || !email || !password || !confimpassowrd) {
      toast({
        title: "Please Fill the Fields",
        status: "warning",
        duration: 5000,
        position: "bottom",
      });
      setloading(true);
      if (password !== confimpassowrd) {
        toast({
          title: "Password do not match",
          status: "warning",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
        return;
      }
    }
  
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/user", { name, email, password, pic }, pic);
      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
      localStorage.setItem('userinfo', JSON.stringify(data))
      setloading(false);
      history.push('/chats'); // Corrected navigation here
    } catch (error) {
      toast({
        title: 'Error Occurred',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
      setloading(false);
    }
  };
  
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setname(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setemail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handelclick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setconfimpassowrd(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handelclick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic" isRequired>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input type="file" p={1.5} accept="image/" onChange={postDetails} />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default Singup;
