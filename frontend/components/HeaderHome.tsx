import { useUser } from "@auth0/nextjs-auth0";
import {
  Flex,
  Text,
  Heading,
  Link,
  Spacer,
  Image,
  AvatarGroup,
  Avatar,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

const HeaderHome = (props: Props) => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Cargando usuario...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const userName = user?.name?.split(" ")[0];

  return (
    <Flex
      alignItems="center"
      marginTop={4}
      marginBottom={2}
      color="white"
      as={"header"}
    >
      <Heading
        display={"flex"}
        fontWeight={600}
        fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}
        lineHeight={"180%"}
        as="h2"
      >
        Extravios
      </Heading>
      {user ? (
        <>
          <Spacer />
          <Menu>
            <MenuButton as={"button"}>
              <AvatarGroup spacing={"1rem"}>
                <Avatar src={user.picture ? user.picture : undefined} bg={"transparent"} alt={userName} as={'img'} />
                <Text fontSize={"xl"}>{userName}</Text>
              </AvatarGroup>
            </MenuButton>
            <MenuList>
              <Link href="/api/auth/logout">
                <MenuItem>Cerrar sesión</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </>
      ) : (
        <>
          <Spacer />
          <Link href="/api/auth/login">
            <Text>Ingresar</Text>
          </Link>
        </>
      )}
    </Flex>
  );
};

export default HeaderHome;
