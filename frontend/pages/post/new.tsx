import React, { useState } from "react";
import { Box, Button, Center, Flex, Input, Stack, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import axios from "axios";
import { server } from "../../config";
import * as Yup from "yup";

const New = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const newPostSchema = Yup.object().shape({
    title: Yup.string()
      .min(10, "Al menos 10 caracteres")
      .max(50, "Máximo 50 caracteres")
      .required("Requerido"),
    description: Yup.string()
      .min(20, "Al menos 20 caracteres")
      .max(250, "Máximo 250 caracteres")
      .required("Requerido"),
    city: Yup.string()
      .min(6, "Al menos 6 caracteres")
      .max(100, "Máximo 100 caracteres")
      .required("Requerido"),
    phone: Yup.string()
      .matches(/^\d{7,14}$/, 'Número de télefono no válido' )
      .required("Requerido"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      city: "",
      phone: "",
    },
    validationSchema: newPostSchema,
    onSubmit: async (values, { resetForm }) => {
      setError("");
      setLoading(true);

      await axios
        .post(`${server}/api/posts`, values)
        .then((res) => {
          resetForm();
          toast({
            position: "top",
            title: "¡Extravío creado!",
            description: "Tu publicación fue creada con éxito",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        })
        .catch((err) => {
          console.log(err);
          setError(err?.message);
        })
        .finally(() => {
          setLoading(false);
        });

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
        <Stack w="md" mt={4} gap={1}>
          <Box gap={1}>
            <Input
              placeholder="Título"
              size="md"
              id="title"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <Center color="red.600">{formik.errors.title}</Center>
            ): null}
          </Box>
          <Box gap={1}>
            <Input
              placeholder="Ciudad"
              size="md"
              id="city"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city && (
              <Center color="red.600">{formik.errors.city}</Center>
            )}
          </Box>
          <Box gap={1}>
            <Input
              placeholder="Número de telefono"
              size="md"
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <Center color="red.600">{formik.errors.phone}</Center>
            )}
          </Box>
          <Box gap={1}>
            <Input
              placeholder="Descripción"
              size="md"
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description && (
              <Center color="red.600">{formik.errors.description}</Center>
            )}
          </Box>
          <Button colorScheme="blue" type="submit">
            Publicar
          </Button>
          {error && <Center color="red.600">{error}</Center>}
        </Stack>
      </form>
    </Flex>
  );
};

export default New;
