import { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Heading, CircularProgress, Box, Button } from '@chakra-ui/react'
import { FiUserX } from 'react-icons/fi';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDetails = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.React_App_Baseurl}/order/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `${localStorage.getItem("access_token")}`
                    }
                });
                setData(response.data);
                console.log("data", response.data[0].items)
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
        <Box overflow={"hidden"} pl={{ lg: "10%" }}>
            <Heading size='md'>User Details</Heading>
            {isLoading ? (<CircularProgress isIndeterminate color='green.300' />) :
                isError ? (<h2>Error Occured while getting User list</h2>) : (
                    <TableContainer>
                        <Table variant='striped' colorScheme='teal' size={'lg'}>
                            <Thead>
                                <>
                                    <Tr>
                                    <Th>UserName</Th>
                                    <Th>Email</Th>
                                    <Th>Mobile No.</Th>
                                    <Th>Address</Th>
                                    <Th>City</Th>
                                    <Th>State</Th>
                                    </Tr>
                                </>
                            </Thead>
                            <Tbody>
                                {data?.map(user => (
                                    <>
                                     { user.shippmentAddress[0]?  <Tr>
                                       <Td>{user.shippmentAddress[0]?.name || '-'}</Td>
                                        <Td>{user.shippmentAddress[0]?.email || '-'}</Td>
                                        <Td>{user.shippmentAddress[0]?.mobileNumber || '-'}</Td>
                                        <Td>{user.shippmentAddress[0]?.shipmentAddress || '-'}</Td>
                                        <Td>{user.shippmentAddress[0]?.city || '-'}</Td>
                                        <Td>{user.shippmentAddress[0]?.state || '-'}</Td>
                                         <Td>
                                            <Button>Order Details</Button>
                                        </Td></Tr>:<Tr></Tr>}
                                    </>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}
        </Box>
    )
}
export default UserDetails;