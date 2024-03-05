import React, { useState, useEffect } from "react";
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
  Text,
  textDecoration,
  useToast,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import image from "../asset/signinImg.jpg"

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const storedAccessToken = localStorage.getItem("access_token");
    const storedRefreshToken = localStorage.getItem("refresh_token");

    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.React_App_Baseurl}/user/login`, {
        email,
        password,
      });

      const { accessToken, refreshToken, uid } = response.data;

      // Store tokens in local storage
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("user_id", uid);
      localStorage.setItem('user_email', email);

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      console.log("accessToken:", accessToken, "\n", "refreshToken:", refreshToken)
      alert(response.data.message);

      navigate("/");
    } catch (error) {
      console.error(error);
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
          <Box mx="auto" maxW="100%" padding={"10px"} mt={"10%"}>
            <Heading as="h4" size="md" textAlign="center" mb={4}>
              Login To AliciaFarm
            </Heading>
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
            <Button
              colorScheme="blue"
              size="lg"
              width="full"
              mb={4}
              mt={6}
              onClick={handleSignIn}
            >
              Log In
            </Button>
            <Text textAlign="center">
              Not in AliciaFarm?{" "}
              <Link to="/signup" >
                <Text color="blue.500" fontWeight="bold" _hover={{ textDecoration: "underline" }}>
                  create an account</Text>
              </Link>
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}

export default SignInForm;
