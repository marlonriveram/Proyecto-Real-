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
import { 
    FormControl,
    FormLabel,
    FormErrorMessage
 } from "@chakra-ui/form-control" // libreria de reack forms para controlar inputs
import axios from "axios"
import type { NextPage } from "next"
import { useRouter } from "next/router" // libreria de next para hacer enrutamiento
import { useForm } from "react-hook-form" //libreria para manejar formularios
import { z } from "zod" // libreria para hacer validaciones
import { zodResolver } from "@hookform/resolvers/zod" // libreria para usar react form con zod (validadores)
import { env } from "~/env"

const schema = z.object({ // schemas con zod
    email: z.string().email("Email invalido"),
    code: z.string().length(6,"Codigo debe tener 6 caracteres")
})

type FieldValues = z.infer<typeof schema> // meotodo de zod para tomar el type de un schema

const Login: NextPage = () => {

    const {
        register,  // objeto de react forms que tiene { name,onBlur,onChange,ref}, register recibe un parametor que es el name del input
        getValues,     // Trae el value de todos los input si no se pone nada en parametros
        handleSubmit, // funcion de react forms para el evento de on submit, recibe 2 funciones en los parametros
        formState: { errors } // captura el error del formulario si no cumple con el schema
    } = useForm<FieldValues>({ 
        resolver: zodResolver(schema),// validar con zod los datos del formulario
        defaultValues:{email:"marlon.mosquerar@gmail.com"}
    });

    const router = useRouter()

    // parte de la opcion 1
    // const { 
    // name, // name input
    // onBlur, // funcion para si el focus este en el input
    // onChange, // funcion para detectar el onchange del input
    // ref //funcion para hacer referencia al input DOM

    // } = register('email') // register trae algunas propiedades y funciones del los input

    // console.log({ values: getValues() });

    const onSubmit = () => {
        const { email, code } = getValues() // trae los valores de los todos los input por que no se especifico
        console.log({ email, code })
        // se toma el enpoint base de la api con una variable de entorno
        axios.post(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}`, { code },{withCredentials:true})
            .then(({ data }) => {
                router.push('/')
            })
            .catch(console.log)
    }

    const onError = () => {
        console.log( {errors} ) // se desestructuro errors de formState, por lo que errros ya es una variable
    }
    return (
        <Container marginTop={10} width={"3/6"}>
            <Heading textAlign="center">
                Iniciar Sesion
            </Heading>

            <Card.Root padding={3} justifyContent="center">
                <form onSubmit={handleSubmit(onSubmit, onError)} >

                    {/* isInvalid={!!errors.email}, si es true
                        activa el componente FormErrorMessage
                    */}
                    <FormControl marginBottom={5} alignItems="center" isInvalid={!!errors.email}>
                        <FormLabel>Email</FormLabel>
                            <Input type="text" placeholder="Write your Email"
                    
                            /*opcion 1
                                name={name}
                                onChange={onChange}
                                onBlur={onBlur}
                                ref={ref}
                            */

                            // opcion 2
                            {...register("email")} />
                            <FormErrorMessage color={'red'} > {errors.email?.message} </FormErrorMessage>
                    </FormControl>

                    <FormControl marginBottom={5} alignItems="center" isInvalid={!!errors.code}>
                        <FormLabel>Email</FormLabel>
                        <Input type="number" placeholder="Write your code" 
                    
                            /*opcion 1
                                name={name}
                                onChange={onChange}
                                onBlur={onBlur}
                                ref={ref}
                            */

                            // opcion 2
                            {...register("code")} 
                            />
                            {/* FormErrorMessage  componete si el formulario no cumple con el tipo de dato
                                que se espera recibir, si renderiza
                            */}
                        <FormErrorMessage color={'red'} > {errors.code?.message} </FormErrorMessage>
                    </FormControl>
                    

                    <ButtonGroup padding={2}>
                        <Button
                            type="submit"
                            onClick={() => {

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