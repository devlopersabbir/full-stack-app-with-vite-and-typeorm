import {
  useDisclosure,
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
  Text,
  Alert,
} from "@chakra-ui/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Axios } from "../utils/axios";
import { useState } from "react";
import CustomModal from "./Modal/CustomModal";
import { Books } from "../utils/types";

interface ICard {
  data?: Books;
}

const SingleCard: React.FC<ICard> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookId, setBookId] = useState<string>("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => Axios.delete(`/api/${bookId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      onClose();
    },
  });

  const bookDelete = (bookId: string) => {
    const confirmMess: boolean = confirm("Are you sure??");
    if (!confirmMess) return;
    setBookId(bookId);
    mutation.mutate();
  };

  const update = (bookId: string) => {
    onOpen();
    setBookId(bookId);
  };

  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={data?.image}
          alt={data?.author}
          borderRadius="lg"
          w="full"
          h="64"
          objectFit="cover"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{data?.title}</Heading>
          <Text>{data?.body}</Text>
          <Text color="blue.600" fontSize="2xl">
            ${data?.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => update(data?.uuid as string)}
          >
            Update
          </Button>
          <CustomModal
            data={data as any}
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={onClose}
            key={data?.uuid}
          />
          <Button
            variant="solid"
            colorScheme="red"
            onClick={() => bookDelete(data?.uuid as string)}
          >
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default SingleCard;
