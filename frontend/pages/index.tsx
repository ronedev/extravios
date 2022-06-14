import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";

import axios from "axios";

import { useRouter } from "next/router";
import { useState } from "react";

import { BsWhatsapp } from "react-icons/bs";
import { BsShare } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";

import { server } from "../config";
import { Posts, Props } from "../interfaces";

const Home = ({ data, count, error }: Props) => {
  const [posts, setPosts] = useState(data);
  const [page, setPage] = useState(1);
  console.log('posts', posts);

  const route = useRouter();

  const loadMore = async () => {
    const res = await fetch(`${server}/api/posts/${page + 1}`);
    const response = await res.json();
    const data = response.rows
    setPage(page + 1);
    setPosts((previusData) => [...previusData, ...data]);
  };

  const goToUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Container p={10} centerContent>
      <Box padding={4} width="100%" borderRadius={8}>
        <Flex alignItems="center" marginTop={4} marginBottom={2} color="white">
          <Heading
            fontWeight={600}
            fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}
            lineHeight={"180%"}
            as="h2"
          >
            Extravios
          </Heading>
        </Flex>
        <Input placeholder="Buscar por título" marginBottom={4} />
        {posts.map((post: any) => (
          <Box
            key={post.id}
            marginBottom={8}
            backgroundColor={"gray.200"}
            borderRadius={8}
            padding={8}
            maxWidth={"md"}
            onClick={() => route.push("/post/" + post.id)}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: "l", sm: "xl", md: "2xl" }}
              lineHeight={"150%"}
              color={"black"}
              as="h2"
              cursor={"pointer"}
            >
              {post.title}
            </Heading>
            <Text color={"gray.500"} marginTop={2}>
              {post.description}
            </Text>
            <Box marginTop={4}></Box>
            <Flex minWidth={"max-content"} alignItems={"center"} marginTop={4}>
              <IconButton aria-label="Comunicarse via Whatsapp">
                <BsWhatsapp size={22} color={"black"} />
              </IconButton>
              <IconButton aria-label="Compartir en redes">
                <BsShare size={22} color={"black"} />
              </IconButton>
              <Spacer />
              <Text color={"blackAlpha.700"}>Hace 24 hs</Text>
            </Flex>
          </Box>
        ))}
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
    .get(`${server}/api/posts/${page}`)
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
