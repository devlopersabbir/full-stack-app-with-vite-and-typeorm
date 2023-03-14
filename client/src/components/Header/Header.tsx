import React, { useState } from "react";
import {
  HStack,
  Box,
  Container,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "../../utils/axios";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const openModal = () => {
    onOpen();
  };
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: () => Axios.post("/api", { title, body, price, image, author }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      onClose();
    },
  });
  return (
    <Box bg="blackAlpha.300" w="full">
      <Container maxW="1280px" mx="auto" p={5}>
        <HStack spacing={5} color="black" fontWeight="bold">
          <Link to="/">Home</Link>
          <Text cursor="pointer" onClick={openModal}>
            Create
          </Text>
        </HStack>
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create new Book</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      placeholder="title..."
                      onChange={(e: any) => setTitle(e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Price</FormLabel>
                    <Input
                      type="number"
                      placeholder="Price"
                      onChange={(e: any) => setPrice(e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Author</FormLabel>
                    <Input
                      placeholder="author"
                      onChange={(e: any) => setAuthor(e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Image</FormLabel>
                    <Input
                      placeholder="image url"
                      onChange={(e: any) => setImage(e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Body</FormLabel>
                    <Textarea
                      placeholder="type here..."
                      onChange={(e: any) => setBody(e.target.value)}
                    />
                  </FormControl>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => createMutation.mutate()}
                >
                  {createMutation.isLoading ? <Spinner /> : "Create"}
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      </Container>
    </Box>
  );
};

export default Header;
