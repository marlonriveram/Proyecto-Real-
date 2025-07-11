import {
    Button,
    Card,
    Container,
    Heading,
    Input,
    Fieldset,
    Field,
    NativeSelect,
    createListCollection,
    Flex,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import axios from "axios";
import { env } from "~/env";
import { useRouter } from "next/router";
import { ClientForm } from "~/components/ui/entites/ClientForm";


const NewClient: NextPage = () => {
    return (
        <Container mt={8} maxW="2xl" >
            <Card.Root p={4}>
                <Heading textAlign="center" mb={6}> Nuevo Cliente</Heading>
                <ClientForm />
            </Card.Root>
        </Container>
    )
}

export default NewClient