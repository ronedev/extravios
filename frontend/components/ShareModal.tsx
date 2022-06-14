import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  IconButton,
} from "@chakra-ui/react";

import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";

interface IShareModal {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal = ({ isOpen, onClose }: IShareModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={'gray.300'} color="black">
        <ModalHeader textAlign="center">
          Comparte la busqueda en tus redes sociales
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display={'flex'} justifyContent="center" gap={8}>
          <IconButton aria-label="facebook-button" bg={"transparent"} padding={2}>
            <FaFacebook size={35}/>
          </IconButton>
          <IconButton aria-label="instagram-button" bg={"transparent"} padding={2}>
            <BsInstagram size={35} />
          </IconButton>
          <IconButton aria-label="twitter-button" bg={"transparent"} padding={2}>
            <BsTwitter size={35} />
          </IconButton>
        </ModalBody>
        <ModalFooter display={'flex'} justifyContent="center">
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
