// PopUpForm.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  CSSReset,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  // useBreakpointValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import sampleimg from "../asset/milk-dairy-products-pitcher-bottle-thumbnail.jpg"

const Form = {
  name: '',
  email: '',
  address: '',
  mobileNo: '',
  city: '',
  interstedProd: '',
  customerId: '',

}
const PopUpForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPopUp, setShowPopUp] = useState(false);
  const [form, setForm] = useState([Form]);
  // const breakpointValue = useBreakpointValue({ base: "base", sm: "sm", md: "md" });

  const toast = useToast();
  const formChangeHandler = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.mobileNo]: e.target.value,
      [e.target.address]: e.target.value,
      [e.target.city]: e.target.value,
      [e.target.interstedProd]: e.target.value,
      [e.target.customerId]: e.target.email,
    });
  }

  useEffect(() => {
    // Show the pop-up form after 2 minutes (adjust the time as needed)
    const timeoutId = setTimeout(() => {
      setShowPopUp(true);
      onOpen();
    }, 2000); // 2 minutes = 120,000 milliseconds

    return () => clearTimeout(timeoutId);
  }, [onOpen]);

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.React_App_Baseurl}/query/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        toast({
          title: 'Data Submitted',
          description: 'Data Submitted successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setForm(Form)
      } else {
        // Handle error
        const data = await response.json();
        console.log(data.error)
        toast({
          title: 'Error',
          description: data.message || 'Failed to submit data',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error creating data:', error);
      // Show a more user-friendly error message
      toast({
        title: 'Error',
        description: 'Failed to submit data. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <CSSReset />
      {showPopUp && (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
          <ModalOverlay />
          <ModalContent bg={"#e8f7ff"} rounded={"lg"} display={"flex"}>
            <Box display="flex" flexWrap="wrap" >
              <Box p={6} border={"6px solid #ffffff"} flex="1">
                <ModalHeader fontSize={"26px"} textColor={"#0080ca"} textAlign="center" mb={2} fontFamily={"'Satisfy', cursive"}>
                  Claim Your Free Sample Now!

                  <Text fontSize={"16px"} fontWeight={"400"} textAlign="center" textColor={"#45a4dc"} mb={2}>
                    Don't Miss Out on this Exclusive Offer
                  </Text>
                  <Text fontSize={"18px"} fontWeight={"400"} textAlign="center" textColor={"#45a4dc"} mb={2}>
                    Just fill in your details below and we'll handle the rest!
                  </Text>
                </ModalHeader>
                <ModalCloseButton m={4} />
                <ModalBody>
                  <form onSubmit={formSubmit}>
                    <FormControl>
                      <FormLabel fontSize={"14px"} mb={"0.5%"} >
                        Name:
                      </FormLabel>
                      <Input
                        borderColor={"#45a4dc"}
                        name="name"
                        onChange={formChangeHandler}
                        value={form.name} rounded={"lg"} type="text" />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize={"14px"} mt={"3%"} mb={"0.5%"}>
                        Email:
                      </FormLabel>
                      <Input
                        borderColor={"#45a4dc"}
                        name="email"
                        onChange={formChangeHandler}
                        value={form.email} rounded={"lg"} type="email" />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize={"14px"} mt={"3%"} mb={"0.5%"}>
                        Phone No:
                      </FormLabel>
                      <Input
                        borderColor={"#45a4dc"}
                        name="mobileNo"
                        onChange={formChangeHandler}
                        value={form.mobileNo} rounded={"lg"} type="text" />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize={"14px"} mt={"3%"} mb={"0.5%"}>
                        Address:
                      </FormLabel>
                      <Input
                        borderColor={"#45a4dc"}
                        name="address"
                        onChange={formChangeHandler}
                        value={form.address} rounded={"lg"} type="text" />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize={"14px"} mt={"3%"} mb={"0.5%"}>
                        City:
                      </FormLabel>
                      <Select
                        borderColor={"#45a4dc"}
                        name="city"
                        onChange={formChangeHandler}
                        value={form.city} fontSize={"14px"} >
                        <option value="default">Select City</option>
                        <option value="Jamshedpur">Jamshedpur</option>
                        <option value="Panchkula">Panchkula</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Mohali">Mohali</option>
                        <option value="Rest of India">Rest of India</option>
                      </Select>

                      {/* {form.city === "Rest of India" && (
                      <Input
                        borderColor={"#45a4dc"}
                        name="city"
                        onChange={formChangeHandler}
                        rounded={"lg"}
                        type="text"
                        placeholder="City Name" 
                        value={form.city}
                      />
                    )} */}
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize={"14px"} mt={"3%"} mb={"0.5%"}>
                        Interested Product:
                      </FormLabel>
                      <Select
                        borderColor={"#45a4dc"}
                        name="interstedProd"
                        onChange={formChangeHandler}
                        value={form.interstedProd} fontSize={"14px"}>
                        <option value="A1-Milk">A1-Milk</option>
                        <option value="A2-Milk">A2-Milk</option>
                        <option value="Buffalo Milk">Buffalo Milk</option>
                        <option value="Ghee">Ghee</option>
                      </Select>
                    </FormControl>
                  </form>
                </ModalBody>

                <ModalFooter>
                  <Button type='submit' onClick={formSubmit} rounded={"lg"} fontSize={"20px"} bg="#45a4dc" w={"95%"} color={"white"} m={"auto"} _hover={{ transform: "scale(1.1)" }}>
                    Submit
                  </Button>
                </ModalFooter>
              </Box>
              <Box display={{ base: "none", md: "flex" }} flex="1">
                <Image src={sampleimg} alt="" width={"100%"} height={"100%"} />
              </Box>
            </Box>
          </ModalContent>
        </Modal>
      )}
    </ChakraProvider>

  );
};

export default PopUpForm;
