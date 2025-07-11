import {
    Card,
    Container,
    Heading,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ClientForm } from "~/components/ui/entites/ClientForm";


const EditewClient: NextPage = () => {
    const router = useRouter()
    console.log(router.query)
    return (
        <Container mt={8} maxW="2xl" >
            <Card.Root p={4}>
                <Heading textAlign="center" mb={6}> Editar Cliente</Heading>
                <ClientForm 
                clientId={router.query.clientId as string}
                />
            </Card.Root>
        </Container>
    )
}

export default EditewClient 