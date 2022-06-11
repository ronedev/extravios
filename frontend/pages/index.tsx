import { Box, Container, Flex, Heading, Input, Spacer, Text } from "@chakra-ui/react";
import { BsWhatsapp } from "react-icons/bs";
import { BsFilterCircleFill } from "react-icons/bs";
import { Posts } from "../interfaces";

interface Props{
  posts: Posts[];
}

const Home = ({ posts }: Props) => {
  return (
    <Container maxW={"5xl"} py={12} centerContent>
      <Box padding={4} bg="teal.800" maxW="md" borderRadius={8}>
        <Flex minWidth={"max-content"} alignItems="center" marginTop={4} marginBottom={2} color="white">
          <Heading
            fontWeight={600}
            fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}
            lineHeight= {"180%"}
            as="h2"
          >
            Extravios
          </Heading>
          <Spacer />
          <BsFilterCircleFill size={24} />
        </Flex>
        <Input placeholder="Buscar por título" marginBottom={4} />
        {posts?.map((post: any) => (
          <Box
            key={post.id}
            marginBottom={8}
            backgroundColor={"gray.200"}
            borderRadius={8}
            padding={8}
            onClick={() => console.log(post.id) }
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
            <Flex minWidth={"max-content"} alignItems={"center"} marginTop={4}>
              <BsWhatsapp size={24} color={"black"} />
              <Spacer />
              Hace 24 hs
            </Flex>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export async function getServerSideProps() {
  //fetch data from api
  const res = await fetch("http://localhost:8080/api/posts/");
  const posts = await res.json();

  //pass data to the page via props
  return {
    props: {
      posts,
    },
  };
}

export default Home;
