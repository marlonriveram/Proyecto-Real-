import {
    Container,
    Field,
    Heading,
    Input,
    Card,
    Button,
    Center,
    ButtonGroup
} from "@chakra-ui/react"
import axios from "axios"
import type { NextPage } from "next"
import { useForm } from "react-hook-form"
import { env } from "~/env"

const Login: NextPage = () => {

    const { register, getValues } = useForm();

    // parte de la opcion 1
    // const { name,onBlur,onChange,ref} = register('email') // register trae algunas propiedades y funciones del los input

    // console.log({ values: getValues() });

    return (
        <Container marginTop={10} width={"3/6"}>
            <Heading textAlign="center">
                Iniciar Sesion
            </Heading>

            <Card.Root padding={3} justifyContent="center">
                <form >
                    <Field.Root marginBottom={5}>
                        <Field.Label>
                            Email Adrress
                        </Field.Label>
                        <Input
                            type="text"
                            placeholder="Write your email"
                            /*opcion 1
                             name={name}
                            onChange={onChange}
                            onBlur={onBlur}
                            ref={ref}
                            */

                            // opcion 2
                            {...register("email")} // se desestructura directamente para no hacer lo de la opcion 1
                        />
                    </Field.Root>
                    <Field.Root marginBottom={5} alignItems="center">
                        <Field.Label>
                            Code
                        </Field.Label>
                        <Input type="text" placeholder="Write your code" {...register("code")} />
                    </Field.Root>
                    <ButtonGroup padding={2}>
                        <Button
                            onClick={() => {
                                // getValues trae el value de todos los input si no se pone nada
                                // o trea el value de un input en especifico
                                const { email, code } = getValues()

                                // se toma el enpoint base de la api con una variable de entorno
                                axios.post(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}`,{code})
                                    .then(console.log)
                                    .catch(console.log)
                            }}
                        >Login</Button>
                        <Button
                            onClick={() => {
                                // getValues trae el value de todos los input si no se pone nada
                                // o trea el value de un input en especifico
                                const email = getValues("email")

                                // se toma el enpoint base de la api con una variable de entorno
                                axios.post(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}/code`)
                                    .then(console.log)
                                    .catch(console.log)
                            }}
                        >I need a code</Button>

                    </ButtonGroup>
                </form>
            </Card.Root>
        </Container>
    )
}

export default Login