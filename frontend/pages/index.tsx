import {
  Box,
  Center,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";

import axios from "axios";

import { useState } from "react";

import { BsSearch } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";

import { server } from "../config";
import { Posts, Props } from "../interfaces";
import Post from "../components/Post";
import HeaderHome from "../components/HeaderHome";
import FooterHome from "../components/FooterHome";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

const Home = ({ data, countData }: Props) => {
  const [posts, setPosts] = useState(data);
  const [count, setCount] = useState<number>(countData);
  const [page, setPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [handleSearch, setHandleSearch] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const showMoreButton = count <= posts.length;

  const route = useRouter()
  
  const { user } = useUser();  

  const loadMore = async () => {
    setIsLoadingMore(true);
    const URL = `${server}/api/posts?page=${page + 1}`;
    await axios
      .get(URL)
      .then((res) => {
        setPosts((previusData) => [...previusData, ...res.data.rows]);
        setPage(page + 1);
      })
      .catch((err) => {
        console.error(err);
      });
    setIsLoadingMore(false);
  };

  const handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
    const URL = `${server}/api/posts?title=${handleSearch}`;
    await axios
      .get(URL)
      .then((res) => {
        setCount(res.data.count);
        setPosts(res.data.rows);
      })
      .catch((err) => console.log(err));
  };

  const reload = ()=>{
    window.location.reload()
  }

  return (
    <Container p={10} centerContent>
      <Box padding={4} width="100%" borderRadius={8}>
        <HeaderHome />
        <form onSubmit={handleSubmitSearch}>
          <InputGroup marginBottom={4} display="flex" alignItems="center" justifyContent="space-evenly">
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
            {isSearching ? (
              <Center ml={2}>
                <FiRefreshCcw size="20px" cursor="pointer" onClick={reload}/>
              </Center>
            ): user && (
              <Center ml={2}>
                <IoAddCircleOutline size="30px" cursor="pointer" onClick={()=> route.push('/post/new')}/>
              </Center>
            )}
          </InputGroup>
        </form>
        {posts.length > 0 ? (
          <>
            {posts.map((post: Posts) => (
              <>
                <Post post={post} />
              </>
            ))}
            <FooterHome
              loadMore={loadMore}
              showMoreButton={showMoreButton}
              isLoadingMore={isLoadingMore}
            />
          </>
        ) : (
          <Text fontSize={20} textAlign="center" my={4}>
            No se encontraron resultados coincidentes
          </Text>
        )}
      </Box>
    </Container>
  );
};

export async function getServerSideProps() {
  //fetch data from api
  const page = 1;
  let data: Posts[] = [];
  let countData = 0;
  await axios
    .get(`${server}/api/posts?page=${page}`)
    .then((res) => {
      data.push(...res.data.rows);
      countData = res.data.count;
    })
    .catch((err) => {
      console.error(err);
    });

  //pass data to the page via props
  return {
    props: {
      data,
      countData,
    },
  };
}

export default Home;
