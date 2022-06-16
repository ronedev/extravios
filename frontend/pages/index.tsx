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
import { Posts, Props } from "../interfaces";
import ShareModal from "../components/ShareModal";

const Home = ({ data, count, error }: Props) => {
  const [posts, setPosts] = useState(data);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [handleSearch, setHandleSearch] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const route = useRouter();

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

  const whatshappContact = (post: Posts)=>{
    const message = `¡Hola! Tengo información sobre tu ${post.title}`
    const URL_TEXT = message.replaceAll(' ', '%20')
    const URL = `https://wa.me/${post.phone}?text=${URL_TEXT}`

    route.push(URL)
  }

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
                <ShareModal post={post} isOpen={isOpen} onClose={onClose} />

                <Box
                  key={post.id}
                  marginBottom={8}
                  backgroundColor={"gray.200"}
                  borderRadius={8}
                  padding={8}
                  maxWidth={"md"}
                >
                  <Heading
                    fontWeight={600}
                    fontSize={{ base: "l", sm: "xl", md: "2xl" }}
                    lineHeight={"150%"}
                    color={"black"}
                    as="h2"
                    cursor={"pointer"}
                    onClick={() => route.push("/post/" + post.id)}
                  >
                    {post.title}
                  </Heading>
                  <Text color={"gray.500"} marginTop={2}>
                    {post.description}
                  </Text>
                  <Box marginTop={4}></Box>
                  <Flex
                    minWidth={"max-content"}
                    alignItems={"center"}
                    marginTop={4}
                  >
                    <IconButton aria-label="Comunicarse via Whatsapp">
                      <BsWhatsapp size={22} color={"black"} onClick={()=> whatshappContact(post)}/>
                    </IconButton>
                    <IconButton aria-label="Compartir en redes">
                      <BsShare size={22} color={"black"} onClick={onOpen} />
                    </IconButton>
                    <Spacer />
                    <Text color={"blackAlpha.700"}>Hace 24 hs</Text>
                  </Flex>
                </Box>
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
