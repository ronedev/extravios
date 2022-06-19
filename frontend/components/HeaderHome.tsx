import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

type Props = {};

const HeaderHome = (props: Props) => {
  return (
    <Flex alignItems="center" marginTop={4} marginBottom={2} color="white" as={'header'}>
      <Heading
        fontWeight={600}
        fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}
        lineHeight={"180%"}
        as="h2"
      >
        Extravios
      </Heading>
    </Flex>
  );
};

export default HeaderHome;