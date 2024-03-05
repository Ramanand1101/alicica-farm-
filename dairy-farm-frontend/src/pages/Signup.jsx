import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  Text,
  textDecoration,
  useToast,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { MdDashboardCustomize } from "react-icons/md";
import axios from "axios";
import { IoIosMail } from "react-icons/io";
import { FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import image from "../asset/signinImg.jpg"

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.React_App_Baseurl}/user/register`, {
        username: name,
        email,
        password,
        role,
      });

      alert(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error occurred:", error);

      // Check if the error has a response
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request made but no response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
      }

      // Show an alert with a general error message
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <Flex
        direction={{ base: "column-reverse", md: "row" }}
        align="center"
        justify="center"
        minHeight="50vh"
        bg="gray.50"
        width={"80%"}
        margin={"auto"}
        mt={"5%"}
        padding={4}
      >
        <Flex flex="1" py={{ base: 8, md: 4 }} flexDirection={["column", "column", "row", "row"]}>
          {["base", "sm"].includes(useBreakpointValue({ base: "base", sm: "sm", md: "md" })) ? null : (
            <Flex justify="center" mb={8} margin={"auto"} >
              <Image
                src={image}
                alt="image"
                maxWidth={"100%"}
                maxHeight={"600px"}
                objectFit={"cover"}
                mt={"-4%"}
              />
            </Flex>
          )}
          <Box mx="auto" maxW="100%" padding={"10px"} mt={{ base: "5%", md: "0" }}>
            <Heading as="h4" size="md" textAlign="center" mb={4}>
              Sign Up To AliciaFarm
            </Heading>
            <FormControl id="name" mb={4}>
              <FormLabel>Username</FormLabel>
              <Flex align="center">
                <FaUser size={18} color="gray.400" mr={2} />
                <Input
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Flex>
            </FormControl>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Flex align="center">
                <IoIosMail size={18} color="gray.400" mr={2} />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Flex>
            </FormControl>
            <FormControl id="password" mb={4}>
              <FormLabel>Password</FormLabel>
              <Flex align="center">
                <FaLock size={18} color="gray.400" mr={2} />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Flex>
            </FormControl>
            {/* <FormControl id="role" mb={4}>
            <FormLabel>Role</FormLabel>
            <Flex align="center">
            <MdDashboardCustomize size={18} color="gray.400" mr={2} />
               <Select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
              </Select>
            </Flex>
          </FormControl> */}
            <Button
              colorScheme="blue"
              size="lg"
              width="full"
              mb={4}
              mt={6}
              onClick={handleSignUp}
            >
              Sign UP
            </Button>
            <Text textAlign="center">
              Already in AliciaFarm?{" "}
              <Link to="/login">
                <Text color="blue.500" fontWeight="bold" _hover={{ textDecoration: "underline" }}>Login to continue</Text>
              </Link>
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}

export default SignUpForm;
