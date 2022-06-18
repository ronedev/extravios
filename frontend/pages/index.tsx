import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import axios from "axios";

import Router, { useRouter } from "next/router";
import { useState } from "react";

import { BsSearch, BsWhatsapp } from "react-icons/bs";
import { BsShare } from "react-icons/bs";

import { server } from "../config";
import { Posts, Props, RelativeTimeFormatUnit, Time } from "../interfaces";
import ShareModal from "../components/ShareModal";
import { getTimeAgo } from "../utils/common";
import Post from "../components/Post";
import HomeHeader from "../components/HomeHeader";

const Home = ({ data, count }: Props) => {
  const [posts, setPosts] = useState(data);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [handleSearch, setHandleSearch] = useState("");

  const loadMore = async () => {
    setIsLoadingMore(true);
    const res = await fetch(`${server}/api/posts?page=${page + 1}`);
    const response = await res.json();
    const data = response.rows;
    setIsLoadingMore(false);
    setPage(page + 1);
    setPosts((previusData) => [...previusData, ...data]);
  };

  const handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const URL = `${server}/api/posts?title=${handleSearch}`;
    await axios
      .get(URL)
      .then((res) => {
        setPosts(res.data.rows);
      })
      .catch((err) => console.log(err));
  };

  const goToUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Container p={10} centerContent>
      <Box padding={4} width="100%" borderRadius={8}>
        <HomeHeader />
        <form onSubmit={handleSubmitSearch}>
          <InputGroup marginBottom={4}>
            <InputLeftElement>
              <BsSearch size="20px" cursor="pointer" />
            </InputLeftElement>
            <Input
              placeholder="Buscar por título"
              type="text"
              onChange={(e) => setHandleSearch(e.target.value)}
            />
            <Input
              type="submit"
              value="Buscar"
              p={2}
              w={"50%"}
              ml={2}
              textAlign="center"
              _hover={{ bg: "gray.100", color: "black" }}
              cursor="pointer"
            />
          </InputGroup>
        </form>
        {posts.length > 0 ? (
          <>
            {posts.map((post: Posts) => (
              <>
                <Post post={post} />
              </>              
            ))}
            {isLoadingMore && (
              <Center marginBottom={4}>
                <Spinner size={["md", "sm", "xl"]} />
              </Center>
            )}
            {!(count > posts.length) && (
              <Center marginBottom={4}>
                <Text textAlign="center">No se encontraron mas resultados</Text>
              </Center>
            )}
            <Center>
              <Button
                onClick={loadMore}
                width={["100%", "50%", "35%"]}
                fontWeight="light"
                disabled={count <= posts.length}
              >
                Cargar más...
              </Button>
            </Center>
            <Center mt={4}>
              <Button width={["100%", "50%", "35%"]} onClick={goToUp}>
                Volver arriba
              </Button>
            </Center>
          </>
        ) : (
          <Text fontSize={20} textAlign="center" my={4}>
            No se encontraron resultados
          </Text>
        )}
      </Box>
    </Container>
  );
};

export async function getServerSideProps() {
  //fetch data from api
  const page = 1;
  let error = "";
  let data: Posts[] = [];
  let count = 0;
  await axios
    .get(`${server}/api/posts?page=${page}`)
    .then((res) => {
      data.push(...res.data.rows);
      count = res.data.count;
    })
    .catch((err) => {
      console.log(err);
    });

  //pass data to the page via props
  return {
    props: {
      data,
      count,
      error,
    },
  };
}

export default Home;
