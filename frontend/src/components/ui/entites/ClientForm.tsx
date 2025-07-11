import { Button, Field, Fieldset, Flex, Group, Input, NativeSelect, Spinner } from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { env } from "~/env";

// usando as const Ts pone a DOC_TYPE como readOnly 
const DOC_TYPE = [
    "RUT",
    "Cédula",
    "Pasaporte",
    "Identificación Exterior"
] as const

const schema = z.object({
    firstname: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    lastname: z.string().min(4, "El apellido debe tener al menos 3 caracteres"),
    document_type: z.enum(DOC_TYPE),
    document_value: z.number().min(1, "El número de documento debe ser válido"),
    email: z.string().email("Email inválido"),
});

export type Client = z.infer<typeof schema> // meotodo de zod para tomar el type de un schema

interface Props {
    clientId?: string
}
export const ClientForm = ({ clientId }: Props) => {
    const {
        register,
        getValues,
        control,
        reset, // borrar los datos del formulario
        handleSubmit,
        formState: { errors, isLoading } // se desestructura errors
    } = useForm<Client>({
        resolver: zodResolver(schema),// validar con zod los datos del formulario
        defaultValues: async () =>{
            if(!clientId) return {}
            const { data } = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients/${clientId}`,{withCredentials:true})
            
            return data.data
        }
    });


    const router = useRouter()

    const onSubmit = async (data: Client) => {
        const PARAMS = !!clientId ? `/${clientId}`:''
        const res = await axios(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients${PARAMS}`, {
            method: !! clientId ? "PUT": "POST",
            data,
            withCredentials: true
        })
        reset()
        router.push("/clients")
        console.log({ res })
    }

    if(isLoading) return <Spinner />
    //Opcines del select no se si se utilizo si alg Borrar
    // const frameworks = createListCollection({
    //     items: [
    //         { label: "Rut", value: "RUT" },
    //         { label: "cedula", value: "Cédula" },
    //         { label: "pasaporte", value: "Pasaporte" },
    //         { label: "Identificación Exterior", value: "Identificación Exterior" },
    //     ],
    // })

    return (

        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset.Root size="lg">
                    <Fieldset.Content>
                        <Field.Root invalid={!!errors.firstname}>
                            <Field.Label>Nombre</Field.Label>
                            <Input
                                type="text"
                                placeholder="Escribe tu nombre"
                                {...register("firstname")}
                            />

                            <Field.ErrorText>{errors.firstname?.message}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.lastname}>
                            <Field.Label>Apellido</Field.Label>
                            <Input
                                type="text"
                                placeholder="Escribe tu nombre"
                                {...register("lastname")}
                            />

                            <Field.ErrorText>{errors.lastname?.message}</Field.ErrorText>
                        </Field.Root>

                        <Flex gap={4}>
                            <Field.Root flex={5} mr={3} invalid={!!errors.document_type}>
                                <Field.Label>tipo de documento</Field.Label>
                                <NativeSelect.Root>
                                    <NativeSelect.Field placeholder="Seleccionar" {...register("document_type")}>
                                        {DOC_TYPE.map(dt => (
                                            <option key={dt} value={dt}>{dt}</option>
                                        ))}
                                    </NativeSelect.Field>
                                    <NativeSelect.Indicator />
                                </NativeSelect.Root>
                                <Field.ErrorText>{errors.document_type?.message}</Field.ErrorText>
                            </Field.Root>

                            <Field.Root flex={3} invalid={!!errors.document_value}>
                                <Field.Label>Numero de documento</Field.Label>
                                <Input
                                    type="number"
                                    placeholder="Escribe tu Documento"
                                    {...register("document_value", { valueAsNumber: true })}
                                />

                                <Field.ErrorText>{errors.document_value?.message}</Field.ErrorText>
                            </Field.Root>
                        </Flex>

                        <Field.Root invalid={!!errors.email}>
                            <Field.Label>email</Field.Label>
                            <Input
                                type="email"
                                placeholder="Escribe tu email"
                                {...register("email")}
                            />

                            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                        </Field.Root>
                        {/* --------------------------- REVISAR --------------------------------------------------------------- */}
                        {/* <Field.Root invalid={!!errors.document_type} width="320px">
                                       <Field.Label>Tipo de documento</Field.Label>
                                       <Controller
                                           control={control}
                                           name="document_type"
                                           render={({ field }) => (
                                               <Select.Root
                                                   name={field.name}
                                                   value={field.value}
                                                   onValueChange={({ value }) => {
                                                       field.onChange(value)
                                                   }}
                                                   onInteractOutside={() => field.onBlur()}
                                                   collection={frameworks}
                                               >
                                                   <Select.HiddenSelect />
                                                   <Select.Control>
                                                       <Select.Trigger>
                                                           <Select.ValueText placeholder="Select framework" />
                                                       </Select.Trigger>
                                                       <Select.IndicatorGroup>
                                                           <Select.Indicator />
                                                       </Select.IndicatorGroup>
                                                   </Select.Control>
                                                   <Portal>
                                                       <Select.Positioner>
                                                           <Select.Content>
                                                               {frameworks.items.map((framework) => (
                                                                   <Select.Item item={framework} key={framework.value}>
                                                                       {framework.label}
                                                                       <Select.ItemIndicator />
                                                                   </Select.Item>
                                                               ))}
                                                           </Select.Content>
                                                       </Select.Positioner>
                                                   </Portal>
                                               </Select.Root>
                                           )}
                                       />
                                       <Field.ErrorText>{errors.document_type?.message}</Field.ErrorText>
                                   </Field.Root> */}


                        {/* --------------------------- REVISAR --------------------------------------------------------------- */}
                    </Fieldset.Content>

                </Fieldset.Root>

                <Group mt={4}>
                    <Button type="submit" > Crear </Button>
                    <Button colorPalette={"purple"} onClick={() => router.back()}> volver </Button>
                </Group>

            </form>
            {/* <DevTool control={control}></DevTool> */}
        </>
    )
}