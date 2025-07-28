import {
    Card,
    Container,
    Heading,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { SaleForm } from "~/components/ui/entites/sales/SaleForm";



const NewClient: NextPage = () => {
    return (
        <Container mt={8} maxW="2xl" >
            <Card.Root p={4}>
                <Heading textAlign="center" mb={6}> Nuevo cliente</Heading>
                <SaleForm />
            </Card.Root>
        </Container>
    )
}

export default NewClient