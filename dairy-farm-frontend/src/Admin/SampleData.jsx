import { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Heading, IconButton, useToast, CircularProgress, Box, Tooltip } from '@chakra-ui/react'
import { FiUserX } from 'react-icons/fi';
import axios from 'axios';

const SampleUserData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const toast = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.React_App_Baseurl}/query/getData`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // authorization: `${localStorage.getItem("access_token")}`
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
  const handleDelete = async (userId) => {
    try {
      // Make a DELETE request to your API endpoint for deleting a user
      await axios.delete(`${process.env.React_App_Baseurl}/query/delete/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `${localStorage.getItem('access_token')}`,
        },
      });

      // Update the state to reflect the deletion
      setData((prevData) => prevData.filter((user) => user.customerId !== userId));

      // Display a success message
      toast({
        title: 'User deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting user:', error.response.error);
      // Display an error message
      toast({
        title: 'Error deleting user',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };



  return (
    <Box overflow={"hidden"} pl={{ lg: "10%" }}>
      <Heading size='md'>Sample User Data</Heading>
      {isLoading ? (<CircularProgress isIndeterminate color='green.300' />) :
        isError ? (<h2>Error Occured while getting User list</h2>) : (
          <TableContainer>
            <Table variant='striped' colorScheme='teal' size={'lg'}>
              <Thead>
                <Tr>
                  <Th>UserName</Th>
                  <Th>Email</Th>
                  <Th>Mobile No.</Th>
                  <Th>Address</Th>
                  <Th>City</Th>
                  <Th>Interested Product</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map(user => (
                  <Tr> 
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.mobileNo}</Td>
                    <Td>{user.address}</Td>
                    <Td>{user.city}</Td>
                    <Td>{user.interstedProd}</Td>
                    <Td>
                      <IconButton
                        aria-label='Delete database'
                        icon={<FiUserX />}
                        _hover={{}}
                        onClick={() => handleDelete(user.customerId)}
                      >
                        <Tooltip label="Delete User" placement="top" hasArrow>
                          <span>Delete User</span>
                        </Tooltip>
                      </IconButton>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
    </Box>
  )
}
export default SampleUserData;