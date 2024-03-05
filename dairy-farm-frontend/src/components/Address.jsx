import React, { useEffect, useState } from "react";
import {
    Heading,
    Image,
    Box,
    Text,
    Flex,
    FormControl,
    Input,
    Stack,
    Button
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { IoLogoWhatsapp } from "react-icons/io";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Address() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setmobileNumber] = useState();
    const [postalCode, setpostalCode] = useState();
    const [shipmentAddress, setshipmentAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState();
    const [data, setData] = useState([])
    const [orderId, setOrderId] = useState(null); // Initialize orderId state

    const token = localStorage.getItem('access_token');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.React_App_Baseurl}/order`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `${localStorage.getItem("access_token")}`
                    }
                });
                setData(response.data);
                console.log(response.data, "id:", response.data[response.data.length - 1]._id, "data", data[data.length - 1])
                // Set orderId state with the latest order ID
                setOrderId(response.data.length > 0 ? response.data[response.data.length - 1]._id : null);
            } catch (error) {
                console.error('Error fetching data');
            }
        }

        fetchData();
    }, []);

    const handleCheckout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.React_App_Baseurl}/shippment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `${token}`,
                },
                body: JSON.stringify({
                    orderId: orderId,
                    name: name,
                    email: email,
                    shipmentAddress: shipmentAddress,
                    city: city,
                    state: state,
                    mobileNumber: mobileNumber,
                    postalCode: postalCode,
                }),
            });
            if (response.ok) {
                alert("Shipment address saved successfully");
                setshipmentAddress("");
                setName("");
                setEmail("");
                setmobileNumber("");
                setpostalCode("");
                setCity("")
                setState("")
                // window.location.href = "/"
            } else {
                const state = await response.json();
                console.error("Error:", state.error || "Failed to save shipment address");
                alert(state.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error occurred");
        }
    }
    const handleWhatsApp = (e) => {
        e.preventDefault();
        window.location.href = "https://wa.me/919910721348"
    }
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
                                src="https://images.unsplash.com/photo-1571938574727-cd5ea31dafbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGFpcnklMjBmYXJtfGVufDB8fDB8fHww"
                                alt="image"
                                maxWidth={"100%"}
                                maxHeight={"600px"}
                                objectFit={"cover"}
                                mt={"-4%"}
                            />
                        </Flex>
                    )}
                    <Box p={6} maxW="md" m="auto">
                        <Heading m={"2%"} mb={"6%"} fontWeight={"semibold"} fontSize={"24px"}>Add Delivery Address</Heading>
                        <Stack spacing={4}>
                            <FormControl isRequired>
                                <Input type="text" placeholder="Deliver to" value={name} onChange={(e) => setName(e.target.value)} />
                                <br />
                                <br />
                                <Input type="email" placeholder="User's email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <br />
                                <br />
                                <Input type="number" placeholder="Mobile no" value={mobileNumber} onChange={(e) => setmobileNumber(e.target.value)} />
                                <br />
                                <br />
                                <Input type="text" placeholder="Address" value={shipmentAddress} onChange={(e) => setshipmentAddress(e.target.value)} />
                                <br />
                                <br />
                                <Input placeholder="City" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                                <br />
                                <br />
                                <Input placeholder="State" type="text" value={state} onChange={(e) => setState(e.target.value)} />
                                <br />
                                <br />
                                <Input type="number" placeholder="Pin Code" value={postalCode} onChange={(e) => setpostalCode(e.target.value)} />

                                {" "}
                                <Button mt={4}
                                    bg="#239722"
                                    color="white"
                                    fontWeight="700"
                                    fontSize="16px"
                                    right="4"
                                    margin="5%"
                                    transition="all 0.4s ease"
                                    _hover={{ bg: "#1d8b1d", transform: "scale(1.1)" }}
                                    rounded={"none"}
                                    onClick={handleCheckout}>
                                    Order Now
                                </Button>

                                <Button id="whatsapp"
                                    onClick={handleWhatsApp}
                                >
                                    <IoLogoWhatsapp color="green" size={40} />
                                </Button>

                                <Text>For order confirmation or more queries connect with us on whatsapp</Text>
                            </FormControl>

                        </Stack>
                    </Box>
                </Flex>
            </Flex>
            <Footer />
        </>
    );
}

export default Address;
