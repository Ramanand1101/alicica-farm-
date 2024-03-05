import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Heading, IconButton, useToast, Image, CircularProgress, Box, Grid } from '@chakra-ui/react'
import ProductDetail from './ProductDetailPage';
import axios from 'axios';

const ProductPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.React_App_Baseurl}/product`, {
          method: "GET",
          headers: {
            "Content-Type": "appliction/json",
            authorization: `${localStorage.getItem("access_token")}`
          }
        });
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error.response.error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



  const handleEdit = (editedProduct) => {
    setData((prevData) =>
      prevData.map((product) =>
        product._id === editedProduct._id ? editedProduct : product
      )
    );
  };



  
  const handleDelete = (productId) => {
    // Filter out the deleted product from the data array
    setData((prevData) => prevData.filter((product) => product._id !== productId));
  };

  return (
    <Box pl={{base:10, md:40}} pr={10} w={"100%"} h={"full"} pb={20}>
      <Heading size={'lg'} color={"gray.900"} mt={"20px"} mb={"20px"} >Manage Products</Heading>

      {isLoading ? (
        <CircularProgress
          alignItems={"center"}
          m={300}
          isIndeterminate
          color='blue.800'
        />
      ) : isError ? (
        <h2>Error Occurred while getting product list</h2>
      ) : (
        
        <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(2, 1fr)', lg:'repeat(3, 1fr)'}} gap={10} overflow={"hidden"}>
              {data?.map(product => (
                <ProductDetail
                  key={product._id}
                  product={product}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
              </Grid>
      )}
    </Box>
  );
};

export default ProductPage;