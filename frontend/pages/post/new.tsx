import { Button, Flex, Input, Stack } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { server } from "../../config";

type Props = {};

const New = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      city: "",
      phone: "",
    },
    onSubmit: (values, { resetForm }) => {
      axios.post(`${server}/api/posts`, values)
        .then((res)=>{
            console.log(res)
            resetForm()
        })
        .catch((err)=>{
            console.log(err)
        })

      resetForm();
    },
  });

  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      gap="2"
      borderWidth="1px"
      borderRadius="lg"
      margin={8}
      padding={8}
      justifyContent="center"
      flexDirection="column"
    >
      <h2>Nuevo extravío</h2>

      <form onSubmit={formik.handleSubmit}>
        <Stack w="md" mt={4} gap={4}>
          <Input
            placeholder="Título"
            size="md"
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <Input
            placeholder="Ciudad"
            size="md"
            id="city"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
          />
          <Input
            placeholder="Número de telefono"
            size="md"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          <Input
            placeholder="Descripción"
            size="md"
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />

          <Button colorScheme="blue" type="submit">
            Publicar
          </Button>
        </Stack>
      </form>
    </Flex>
  );
};

export default New;
