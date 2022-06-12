import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { BsFilterCircleFill } from "react-icons/bs";
import { server } from "../config";
import { Posts, Props } from "../interfaces";

const Home = ({ data, error }: Props) => {
  const [posts, setPosts] = useState(data);
  const [page, setPage] = useState(1);

  const route = useRouter();

  const loadMore = async () => {
    if (posts.length > 0) {
      const res = await fetch(`${server}/api/posts/${page + 1}`);
      const data = await res.json();
      setPage(page + 1);
      setPosts((previusData) => [...previusData, ...data]);
    }
  };

  return (
    <Container p={10} centerContent>
      <Box padding={4} bg="teal.800" width="100%" borderRadius={8}>
        <Flex alignItems="center" marginTop={4} marginBottom={2} color="white">
          <Heading
            fontWeight={600}
            fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}
            lineHeight={"180%"}
            as="h2"
          >
            Extravios
          </Heading>
          <Spacer />
          <BsFilterCircleFill size={24} />
        </Flex>
        <Input placeholder="Buscar por título" marginBottom={4} />
        {posts.length > 0 ? (
          posts.map((post: any) => (
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
              >
                {post.title}
              </Heading>
              <Text color={"gray.500"}>{post.description}</Text>
              <Box marginTop={4}></Box>
              <Flex
                minWidth={"max-content"}
                alignItems={"center"}
                marginTop={4}
              >
                <BsWhatsapp size={24} color={"black"} />
                <Spacer />
                Hace 24 hs
              </Flex>
            </Box>
          ))
        ) : (
          <Center marginBottom={4}>
            <Text>No se encontraron mas resultados</Text>
          </Center>
        )}
        <Center>
          <Button
            onClick={loadMore}
            width={["100%", "50%", "35%"]}
            disabled={posts.length > 0 ? false : true}
          >
            Cargar mas
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
  await axios
    .get(`${server}/api/posts/${page}`)
    .then((res) => {
      data.push(...res.data);
    })
    .catch((err) => {
      console.log(err);
    })

  //pass data to the page via props
  return {
    props: {
      data,
      error,
    },
  };
}

export default Home;
