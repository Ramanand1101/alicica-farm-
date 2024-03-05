import { Box, Grid, Image, Text, CircularProgress, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';

export default function Products() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const AnimatedBox = motion(Box);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.React_App_Baseurl}/product`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `${localStorage.getItem("access_token")}`
                    }
                });
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.response.error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar />
           
            <Box className="mt-24 w-full pt-1" >
                <hr />
                 <Text fontSize="3xl" fontWeight="500" margin="2%" mb="1%" color="#0f5a20">
                    Products
                </Text>
                {/* <hr /> */}

                {isLoading ? (
                    <CircularProgress
                        alignItems={"center"}
                        m={300}
                        isIndeterminate
                        color={'blue.800'}
                    />
                ) : isError ? (
                    <h2>Error Occurred while getting product list</h2>
                ) : (
                    <Box w={{ base: "100%", md: "80%" }} margin="auto" mt={"2%"} paddingBottom="8%">
                        <Grid
                            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
                            gap={{ base: 5, md: 8, lg: 10 }}
                            className="products"
                        >

                            {data.map((product, index) => (
                                <AnimatedBox
                                    key={index}
                                    border="2px solid gainsboro"
                                    borderRadius={10}
                                    height={{base:"300px", sm:"350px",lg:"400px"}}
                                    paddingBottom="6%"
                                    margin={{base: "auto"}}
                                    width={{base:"280px"}}
                                    overflow={"hidden"}
                                    rounded={"none"}
                                    boxShadow="rgba(183, 181, 180, 0.56) 0px 22px 70px 4px"
                                    initial={{ opacity: 0, y: 20, rotateY: 180 }}
                                    animate={{ opacity: 1, y: 0, rotateY: 360 }}
                                    transition="all 0.8s ease"
                                    _hover={{ cursor: "pointer", transform: "scale(2.0)" }}
                                >

                                    <Image src={product.image} alt={product.name} boxSize={['150px', '200px', '250px']} objectFit='cover' margin="auto" />
                                    <Text fontWeight="600" fontSize="xl">
                                        {product.name}
                                    </Text>
                                    <Flex
                                        className="price"
                                        textAlign="center"
                                        w="40%"
                                        justify="space-between"
                                        margin="auto"
                                    >
                                        <Text fontSize="xl" fontWeight="400"  >
                                            ₹{product.o_price}{" "}
                                        </Text>
                                        <Text fontSize="xl" fontWeight="400"  color="#e71a1a" textDecoration="line-through">
                                            ₹{product.price}{" "}
                                        </Text>
                                    </Flex>
                                    <Link to={`/productDetail/${product._id}`}>
                                        <Button fontSize="md" rounded="none" mt={['3%', '3%', '5%']} mb="10%" fontWeight="500" w="50%" bg="#239722" color="white" transition="all 0.4s ease" _hover={{ transform: "scale(1.1)" }}>
                                            More details
                                        </Button>
                                    </Link>
                                </AnimatedBox>
                            ))}
                        </Grid>
                        <br />
                        <br />
                        <br />
                    </Box>
                )}
            </Box>
            <Footer />
        </>
    );
}
