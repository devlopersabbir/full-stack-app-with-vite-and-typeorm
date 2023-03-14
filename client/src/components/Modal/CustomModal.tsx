import React, { useState } from "react";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Text,
  Container,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Spinner,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Axios } from "../../utils/axios";
import { Books } from "../../utils/types";

interface ICustomModal {
  data: Books;
  onOpen?: any;
  isOpen?: any;
  onClose?: any;
}

const CustomModal: React.FC<ICustomModal> = ({ data, isOpen, onClose }) => {
  console.log(data);
  const [title, setTitle] = useState<string>(
    data?.title && data?.title ? data?.title : ""
  );
  const [body, setBody] = useState<string>(
    data?.body && data?.body ? data?.body : ""
  );
  const [price, setPrice] = useState<number>(
    data?.price && data?.price ? data?.price : 0
  );
  const [image, setImage] = useState<string>(
    data?.image && data?.image ? data?.image : ""
  );
  const [author, setAuthor] = useState<string>(
    data?.author && data?.author ? data?.author : ""
  );
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: () =>
      Axios.put(`/api/${data?.uuid}`, { title, body, price, image, author }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      onClose();
    },
  });
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update our existing book</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={title}
                  placeholder="title..."
                  onChange={(e: any) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Price</FormLabel>
                <Input
                  value={price}
                  type="number"
                  placeholder="Price"
                  onChange={(e: any) => setPrice(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Author</FormLabel>
                <Input
                  value={author}
                  placeholder="Author"
                  onChange={(e: any) => setAuthor(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Image</FormLabel>
                <Input
                  value={image}
                  placeholder="image url"
                  onChange={(e: any) => setImage(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Body</FormLabel>
                <Textarea
                  value={body}
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
              onClick={() => updateMutation.mutate()}
            >
              {updateMutation.isLoading ? <Spinner /> : "Update"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
