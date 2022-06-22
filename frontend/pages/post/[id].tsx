import { GetServerSideProps } from "next";
import React from "react";
import { server } from "../../config";
import { Posts } from "../../interfaces";
import { Center, Grid, Heading, Text } from "@chakra-ui/react";
import Post from "../../components/Post";

interface Props {
  post: Posts;
}

const Id = ({ post }: Props) => {
  return (
    <Grid
      justifyItems="center"
      alignContent="center"
      width={"100%"}
      minH={500}
    >
      <Center w="md">
        <Post post={post} />
      </Center>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${server}/api/posts/one/${context?.params?.id}`);
  const post = await res.json();
  return {
    props: {
      post,
    },
  };
};
export default Id;
