import { Button, ButtonGroup, Card, Container, Heading, Spinner } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import ClientList from "~/components/ui/entites/clients/ClientList"
import { env } from "~/env"

const ClientPage: NextPage = () => {
  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'], queryFn: async () => {
      const res = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients`, { withCredentials: true })
      return res.data
    }
  })

  const router = useRouter()

  console.log(clients)
  return (
    <Container display={"flex"} justifyContent={"center"} mt={8}>
      <Card.Root p={4} width={"3/6"} >
        <Heading> Clientes </Heading>
        {isLoading ? <Spinner /> : <ClientList clients={clients.data} />}

        <ButtonGroup>

          <Button
            mt={6}
            colorPalette={"purple"}
            onClick={() => {
              router.push("/clients/new")
              // axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales/`, { withCredentials: true })
            }}
          >
            Nuevo Cliente
          </Button>

          <Button
            mt={6}
            colorPalette={"green"}
            onClick={() => {
              router.push("/")
              // axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales/`, { withCredentials: true })
            }}
          >
            Volver
          </Button>
        </ButtonGroup>



      </Card.Root>

    </Container>
  )
}

export default ClientPage