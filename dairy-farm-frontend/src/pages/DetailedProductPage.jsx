import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Select,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    CircularProgress,
    Button,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import Address from "../components/Address";

function DetailedProductPage() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [quantity, setQuantity] = useState("");
    const [type, setType] = useState("");
    const [frequency, setFrequency] = useState("");
    const [litrePerDay, setLitrePerDay] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.React_App_Baseurl}/product/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `${localStorage.getItem("access_token")}`,
                    },
                });
                setData(response.data);
                console.log(response.data, "id:", response.data._id);
            } catch (error) {
                console.error("Error fetching data:", error.response.error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleOrderDetail = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.React_App_Baseurl}/order/placed`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `${localStorage.getItem("access_token")}`,
                },
                body: JSON.stringify({
                    name: data.name,
                    amt: data.o_price,
                    quantity: quantity,
                    type: type,
                    frequency: frequency,
                    litrePerDay: litrePerDay,
                }),
            });

            if (response.ok) {
                console.log("res", {
                    name: data.name,
                    amt: data.o_price,
                    quantity: quantity,
                    type: type,
                    frequency: frequency,
                    litrePerDay: litrePerDay,
                })
                alert("Order placed successfully");
                navigate("/address")
                // Add any other logic you want to perform after a successful order placement
            } else {
                const data = await response.json();
                console.error("Error:", data.error || "Failed to place order");
                alert("Fill all the details");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error occurred");
        }
    };

    return (
        <>
            <Navbar />
            {isLoading ? (
                <CircularProgress
                    alignItems={"center"}
                    m={300}
                    isIndeterminate
                    color={"blue.800"}
                />
            ) : isError ? (
                <Text
                    margin="10%"
                    fontSize="28px"
                    fontWeight="700"
                    color="#001c99"
                >
                    Error Occurred while getting product list
                </Text>
            ) : data ? (
                <Box
                    margin={"auto"}
                    marginTop={{ base: "16%", md: "8%" }}
                    marginBottom={"8%"}
                    px={{ base: "40px", md: "40px" }}
                    width={{ base: "100%", md: "60%" }}
                    boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                >
                    <Box>
                        <Flex
                            className="product"
                            direction={{ base: "column", md: "row" }}
                            justify="space-between"
                            align={{ base: "start", md: "center" }}
                        >
                            <Flex
                                className="img"
                                w={{ base: "100%", md: "50%" }}
                                h={{ base: "300px", md: "450px" }}
                                direction="column"
                                justify="space-between"
                                mt={{ base: "5", md: "0" }}
                                mb={{ base: "5", md: "0" }}
                            >
                                <Flex
                                    h="100%"
                                    border={"2px solid #d4cdcd"}
                                    w="80%"
                                    borderRadius="md"

                                    justify="center"
                                    p="10px"
                                    cursor="pointer"
                                    margin={"auto"}
                                ><Image
                                        className="image-main"
                                        margin={"auto"}
                                        height={"100%"}
                                        src={data.image}
                                        alt=""
                                    />
                                </Flex>
                            </Flex>
                            <Box
                                className="description"
                                w={{ base: "100%", md: "45%" }}
                                margin={{ base: "auto", md: "0" }}
                                textAlign={{ base: "center", md: "left" }}
                                color="#4f585e"
                                py="10px"
                            >
                                <Text
                                    istruncated="true"
                                    fontSize={{ base: "22px", md: "26px" }}
                                    fontWeight="700"
                                    noOfLines={1}
                                    margin="2%"
                                >
                                    {data.name}
                                </Text>
                                <Flex
                                    className="price"

                                    w={"40%"}
                                    justify="space-around"
                                    margin={{ base: "auto", lg: "1%", md: "1%" }}
                                >
                                    <Text fontSize="22px" fontWeight="600" margin="1%" >
                                        ₹{data.o_price}{" "}
                                        {/* ₹125{" "} */}
                                    </Text>
                                    <Text fontSize="20px" fontWeight="400" margin="1%" color="#f30c0c" textDecoration="line-through">
                                        {" "}₹{data.price}{" "}
                                    </Text>

                                </Flex>
                                <Text fontSize="14px" color="#8e9ca7"
                                    margin="2%">
                                    <span style={{ color: "red" }}>*</span>Inclusive of all taxes
                                </Text>

                                <Text fontWeight={"bold"} fontSize={"20px"}>
                                    Product Description:
                                </Text>{" "}

                                <Text textAlign="justify">{data.description}</Text>

                                {/* Order Data */}

                                <FormControl marginTop={"10px"}>
                                    <FormLabel fontSize={"18px"} fontWeight={"600"}>Liters</FormLabel>
                                    <Select
                                        placeholder="Select liters"
                                        rounded={"none"}
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    >
                                        <option value="15L">15L</option>
                                        <option value="20L">20L</option>
                                    </Select>
                                </FormControl>
                                <FormControl marginTop={"10px"}>
                                    <FormLabel fontSize={"18px"} fontWeight={"600"}>Type</FormLabel>
                                    <Select
                                        placeholder="Select type"
                                        rounded={"none"}
                                        onChange={(e) => setType(e.target.value)}
                                        value={type}
                                    >
                                        <option value="farmFresh">Farm Fresh</option>
                                        <option value="pasteurized">Pasteurized</option>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontSize={"18px"} fontWeight={"600"}>Frequency</FormLabel>
                                    <Select placeholder="Select frequency" rounded={"none"}
                                        value={frequency}
                                        onChange={(e) => setFrequency(e.target.value)}>
                                        <option value="daily">Daily</option>
                                        <option value="alternateDays">Alternate Days</option>
                                        <option value="two">Every 2 days</option>
                                        <option value="week">Weekly</option>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    {/* <FormLabel fontSize={"18px"} fontWeight={"600"}>Date</FormLabel> */}
                                    {/* <DatePicker /> */}
                                </FormControl>
                                <FormControl marginBottom={"10px"}>
                                    <FormLabel fontSize={"18px"} fontWeight={"600"}>Liter/Day</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon children="Liters" rounded={"none"} />
                                        <Input type="number" rounded={"none"}
                                            value={litrePerDay}
                                            onChange={(e) => setLitrePerDay(e.target.value)} />
                                    </InputGroup>
                                </FormControl>

                                <Button
                                    variant="blue"
                                    bg="#239722"
                                    color="white"
                                    fontWeight="700"
                                    fontSize="16px"
                                    right="4"
                                    height="2.8rem"
                                    w="9rem"
                                    margin="2%"
                                    transition="all 0.4s ease"
                                    rounded={"none"}
                                    _hover={{ transition: "all 0.6s ease", transform: "scale(1.1)" }}
                                    onClick={handleOrderDetail}
                                >
                                    {/* <Link to={"/address"}> */}
                                    Continue
                                    {/* </Link> */}
                                </Button>
                                <Text fontSize="16px" py="6px">
                                    Or Visit nearby Store
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            ) : (
                <Text textAlign={"center"} fontSize="18px" fontWeight="600" color="#001c99">
                    No product data available.
                </Text>
            )}
            <Footer />
        </>
    );
}

export default DetailedProductPage;