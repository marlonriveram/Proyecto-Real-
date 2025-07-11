import { Button, Card, Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import type { Client } from "./ClientForm"


interface ClientFromDB extends Client {
    _id: string
}

interface Props {
    clients: ClientFromDB[]
}

const ClientList = ({ clients }: Props) => {

    const router = useRouter()
    return (
        <Flex direction="column" gap={2} mt={2}>
            {clients.map((c) => (
                <Card.Root
                    key={c._id}
                    py={2}
                    px={4}
                    cursor="pointer"
                    _hover={{
                        backgroundColor: "gray.200",
                        color: "222",
                        transition: "0.3s"
                    }}
                    onClick={()=> router.push(`/clients/${c._id}`)}
                >
                    <Text>
                        {c.firstname}
                    </Text>
                </Card.Root>
            ))}

         
        </Flex>
    )
}

export default ClientList
