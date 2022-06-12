import { GetServerSideProps } from 'next'
import React from 'react'
import { server } from '../../config'
import { Posts } from '../../interfaces'
import { Grid, Heading, Text } from '@chakra-ui/react'

interface Props {
    post: Posts
}

const Id = ({post}: Props) => {
  return (
    <Grid justifyItems={"center"} width={'100%'}>
        <Heading>{post?.title}</Heading>
        <Text>{post?.description}</Text>
    </Grid>
  )
}


export const getServerSideProps : GetServerSideProps= async(context) => {
    const res = await fetch(`${server}/api/posts/one/${context?.params?.id}`)
    const post = await res.json()
    return {
        props: {
            post
        }
    }
}
export default Id