import {
  Box,
  Text,
  Heading,
  Flex,
  IconButton,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BsWhatsapp, BsShare } from "react-icons/bs";
import { Posts } from "../interfaces";
import { getTimeAgo } from "../utils/common";
import ShareModal from "./ShareModal";

interface PProps{
    post: Posts
}

const Post = ({post}:PProps) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const route = useRouter();

  const whatshappContact = (post: Posts)=>{
    const message = `¡Hola! Tengo información sobre tu ${post.title}`
    const URL_TEXT = message.replaceAll(' ', '%20')
    const URL = `https://wa.me/${post.phone}?text=${URL_TEXT}`

    route.push(URL)
  }

  return (
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
        <Flex minWidth={"max-content"} alignItems={"center"} marginTop={4}>
          <IconButton aria-label="Comunicarse via Whatsapp">
            <BsWhatsapp
              size={22}
              color={"black"}
              onClick={() => whatshappContact(post)}
            />
          </IconButton>
          <IconButton aria-label="Compartir en redes">
            <BsShare size={22} color={"black"} onClick={onOpen} />
          </IconButton>
          <Spacer />
          <Text color={"blackAlpha.700"}>
            {getTimeAgo(Date.parse(post.createdAt))}
          </Text>
        </Flex>
      </Box>
    </>
  );
};

export default Post;
