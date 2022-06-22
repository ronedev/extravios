import { Center, Spinner, Button, Text } from "@chakra-ui/react";
import { count } from "console";
import React from "react";

interface FProps {
  loadMore: () => void;
  showMoreButton: boolean;
  isLoadingMore: boolean;
}

const FooterHome = ({ loadMore, showMoreButton, isLoadingMore }: FProps) => {
  const goToUp = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      {isLoadingMore && (
        <Center marginBottom={4}>
          <Spinner size={["md", "sm", "xl"]} />
        </Center>
      )}
      {showMoreButton && (
        <Center marginBottom={4}>
          <Text fontSize={20} textAlign="center" my={4}>
            No se encontraron más resultados
          </Text>
        </Center>
      )}
      <Center>
        <Button
          onClick={loadMore}
          width={["100%", "50%", "35%"]}
          fontWeight="light"
          disabled={showMoreButton}
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
  );
};

export default FooterHome;
