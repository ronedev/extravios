import React, { Dispatch, SetStateAction, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { InputGroup, InputLeftElement, Input, Center } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { server } from "../config";
import { Posts } from "../interfaces";

interface SIProps {
    setCount: Dispatch<SetStateAction<number>>;
    setPosts: Dispatch<SetStateAction<Posts[]>>;
    setPage: Dispatch<SetStateAction<number>>;
};

const SearchInput = ({setCount, setPosts, setPage}: SIProps) => {
  const [handleSearch, setHandleSearch] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const route = useRouter();

  const { user } = useUser();

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

  const reload = async() => {
    // window.location.reload();
    const page = 1
    await axios
    .get(`${server}/api/posts?page=${page}`)
    .then((res) => {
      setHandleSearch('')
      setIsSearching(false)
      setPosts(res.data.rows);
      setCount(res.data.count);
      setPage(page)
    })
    .catch((err) => {
      console.error(err);
    });
  };
  return (
    <form onSubmit={handleSubmitSearch}>
      <InputGroup
        marginBottom={4}
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <InputLeftElement>
          <BsSearch size="20px" cursor="pointer" />
        </InputLeftElement>
        <Input
          placeholder="Buscar por título"
          type="text"
          value={handleSearch}
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
            <FiRefreshCcw size="20px" cursor="pointer" onClick={reload} />
          </Center>
        ) : (
          user && (
            <Center ml={2}>
              <IoAddCircleOutline
                size="30px"
                cursor="pointer"
                onClick={() => route.push("/post/new")}
              />
            </Center>
          )
        )}
      </InputGroup>
    </form>
  );
};

export default SearchInput;
