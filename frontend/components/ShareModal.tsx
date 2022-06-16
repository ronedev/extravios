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
} from "@chakra-ui/react";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'next-share';

import { Posts } from "../interfaces";

interface IShareModal {
  isOpen: boolean;
  onClose: () => void;
  post: Posts
}

const ShareModal = ({ isOpen, onClose, post}: IShareModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={'gray.300'} color="black">
        <ModalHeader textAlign="center">
          Comparte la busqueda en tus redes sociales
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display={'flex'} justifyContent="center" gap={8}>
          <FacebookShareButton
            // url={`${client}/post/${post.id}`}
            url="https://github.com/next-share"
            title={`¡Hola! He extraviado mi ${post.title}, ante cualquier información por favor contactese conmigo.`}
            hashtag={'#extravio'}
          >
            <FacebookIcon round size={40} />
          </FacebookShareButton>
          <WhatsappShareButton
            // url={`${client}/post/${post.id}`}
            url="https://github.com/next-share"
            title={`¡Hola! He extraviado mi ${post.title}, ante cualquier información por favor contactese conmigo.`}
          >
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
          <TwitterShareButton
            url="https://github.com/next-share"
            title={`¡Hola! He extraviado mi ${post.title}, ante cualquier información por favor contactese conmigo.`}
          >
            <TwitterIcon size={40} round/>
          </TwitterShareButton>
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
