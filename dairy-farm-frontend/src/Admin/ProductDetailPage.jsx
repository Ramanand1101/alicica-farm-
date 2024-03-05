import {
  Image,
  Button,
  FormControl,
  FormLabel,
  Input,
  GridItem,
  Heading,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
  useToast,
  Box,
  Flex
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';

const ProductDetail = ({ product, handleEdit, handleDelete }) => {
  const editDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const toast = useToast();
  const finalRef = React.useRef(null);
  const [editable, setEditable] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleEditClick = (e) => {
    e.preventDefault();
    console.log('Product:-', product);
    setEditable(true);
    setEditedProduct({ ...product });
    editDisclosure.onOpen();
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    setEditable(false);
    editDisclosure.onClose();
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      if (!editedProduct._id) {
        console.error('Product id is undefined');
        return;
      }
      const response = await axios.patch(
        `${process.env.React_App_Baseurl}/product/update/${editedProduct._id}`,
        editedProduct,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `${localStorage.getItem("access_token")}`
          }
        }
      );

      if (response.status === 200) {
        handleEdit(editedProduct);
        setEditable(false);
        editDisclosure.onClose();
        toast({
          title: 'Product Updated',
          description: 'Product updated successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.error('Failed to update product:', response.data);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };


  const handleChange = (e) => {
    e.preventDefault();
    setEditedProduct({
      ...editedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    deleteDisclosure.onOpen();
  };

  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`${process.env.React_App_Baseurl}/product/delete/${product._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("access_token")}`
        },
      }
      );

      if (response.status === 200) {
        handleDelete(product._id);
        deleteDisclosure.onClose();
        toast({
          title: 'Product Deleted',
          description: 'Product deleted successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.error('Failed to delete product:-', response.data);
      }
    } catch (error) {
      console.error('Error deleting product:-', error);
    }
  };

  return (
    <GridItem key={product._id}>
      <Box
        p={4}
        boxShadow='md'
        bg='white'
        borderRadius='md'
        borderWidth='1px'
        overflow='hidden'
        textAlign={"left"}
        backgroundColor={"gray.700"}
        color={"white"}
      >
        <Flex>
          <Image src={product.image} alt={product.desc} w="50%" objectFit='cover' margin={"auto"} />
          <Box p={4} w={"50%"}>
            <Heading fontSize='lg' mt={2} mb={4}>
              Name:- {product.name}
            </Heading>
            <Box mt={2}>
              <span style={{ fontWeight: "bold" }}>Category:-</span> {product.categories}
            </Box>
            <Box mt={2}>
              <span style={{ fontWeight: "bold" }}>Price:-</span> ₹{product.price}
            </Box>
            <Box mt={2}>
              <span style={{ fontWeight: "bold" }}>Offer Price:-</span> ₹{product.o_price}
            </Box>
            <Box mt={2} fontSize='md'>
              <span style={{ fontWeight: "bold" }}>Quantity:-</span> {product.stock_quantity}
            </Box>
          </Box></Flex>
        <Box mt={2} fontSize='md'>
          <span style={{ fontWeight: "bold" }}>Description:-</span>  {product.description}
        </Box>
        <Box>

          <Button m={4} colorScheme={"blue"} onClick={handleEditClick}>
            Edit
          </Button>

          <Modal finalFocusRef={finalRef} isOpen={editDisclosure.isOpen} onClose={editDisclosure.onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Item</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Product offer Price</FormLabel>
                  <Input
                    type="number"
                    name="o_price"
                    value={editedProduct.o_price}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Product Category</FormLabel>
                  <Input
                    type="text"
                    name="categories"
                    value={editedProduct.categories}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Product Description</FormLabel>
                  <Input
                    type="text"
                    name="description"
                    value={editedProduct.description}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Product quantity</FormLabel>
                  <Input
                    type="text"
                    name="stock_quantity"
                    value={editedProduct.stock_quantity}
                    onChange={handleChange}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme={"blue"} mr={3} onClick={handleCancelEdit}>
                  Close
                </Button>
                <Button colorScheme={"teal"} onClick={handleSaveEdit}>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Button m={4} colorScheme={"red"} onClick={handleDeleteClick}>
            Remove
          </Button>

          <Modal finalFocusRef={finalRef} isOpen={deleteDisclosure.isOpen} onClose={deleteDisclosure.onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Delete Item</ModalHeader>
              <ModalCloseButton />
              <ModalBody>Are you sure you want to delete the item?</ModalBody>
              <ModalFooter>
                <Button colorScheme={"blue"} mr={3} onClick={deleteDisclosure.onClose}>
                  Cancel
                </Button>
                <Button colorScheme={"red"} onClick={handleConfirmDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </GridItem>
  );
};

export default ProductDetail;
