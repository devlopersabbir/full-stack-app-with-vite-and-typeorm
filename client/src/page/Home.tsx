import { Container, Grid, Heading, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import SingleCard from "../components/SingleCard";
import { Axios } from "../utils/axios";

const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: () => Axios.get("/api").then((res) => res.data),
  });

  if (isError) return <Heading colorScheme="red">Server error</Heading>;

  return isLoading ? (
    <Spinner />
  ) : (
    <Container maxW="1280px" mx="auto" my={5}>
      <Grid
        alignContent="center"
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
        gap={6}
      >
        {data &&
          data.map((item: any, index: number) => (
            <SingleCard data={item} key={index} />
          ))}
      </Grid>
    </Container>
  );
};

export default Home;
