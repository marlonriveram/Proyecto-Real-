import { Button, Field, Fieldset, Flex, Group, IconButton, Input, NativeSelect, Spinner } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import { string, z } from "zod";
import { env } from "~/env";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// usando as const Ts pone a DOC_TYPE como readOnly 
const PAYMENT_METHODS_TYPE = [
    "Sin utilización Sist. Financieros",
    "Compansación de deudas",
    "Tarjeta de débito",
    "Tarjeta crédito",
    "Dinero electrónico",
    "Tarjeta prepago",
    "Otros con utilización del sistema financiero",
    "Endoso de títulos",
] as const

const TIME_UNITS = z.enum(["Días", "Meses", "Años"])

const saleProductSchema = z.object({
    code: z.string(),
    name: z.string(),
    qty: z.number(),
    unit_price: z.number(),
    discount: z.number(),
    total: z.number()
})
const salePaymentMethodSchema = z.object({
    method: z.enum(PAYMENT_METHODS_TYPE),
    amount: z.number(),
    time_unit: TIME_UNITS,
    time_value: z.number(),

})

const saleSchema = z.object({
    operation_date: z.date(),
    products: z.array(saleProductSchema),
    total_amount: z.number().nonnegative(),
    client: z.string(),
    client_document: z.string(),
    paymentMethods: z.array(salePaymentMethodSchema),
});

export type Sale = z.infer<typeof saleSchema> // meotodo de zod para tomar el type de un schema
type PaymentMethods = z.infer<typeof salePaymentMethodSchema>

interface Props {
    salesId?: string
}

const defaultPm: PaymentMethods = {
    method: "Tarjeta crédito",
    amount: 50000,
    time_unit: "Días",
    time_value: 0
}
export const SaleForm = ({ salesId }: Props) => {
    const [startDate, setStartDate] = useState(new Date())
    const {
        register,
        getValues,
        control,
        reset, // borrar los datos del formulario
        handleSubmit,
        formState: { errors, isLoading }, // se desestructura errors
        setValue,    // setear el  valor de un input manualmente si usar {...register }
    } = useForm<Sale>({
        resolver: zodResolver(saleSchema),// validar con zod los datos del formulario
        defaultValues: async () => {
            if (!salesId) return {
                paymentMethods: [defaultPm]
            }
            // trae todos los datos del backend y se retorna estos como valor por defecto
            const { data } = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales/${salesId}`, { withCredentials: true })

            return data.data
        }
    });

    // hook para renderizar, añadir, remover elementos que sean varios como una lista de tareas
    // o una lista de expericias de trabajo

    const { fields, append, remove } = useFieldArray({
        control, // este control es el del useForms
        name: "paymentMethods" // el nombre del campo del formulario que es un array (en este caso, paymentMethods)
    })

    console.log({ fields })

    const router = useRouter()

    const onSubmit = async (data: Sale) => {
        const PARAMS = !!salesId ? `/${salesId}` : ''
        const res = await axios(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients${PARAMS}`, {
            method: !!salesId ? "PUT" : "POST",
            data,
            withCredentials: true
        })
        reset()
        router.push("/")
        console.log({ res })
    }

    if (isLoading) return <Spinner />

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset.Root size="lg">
                    <Fieldset.Content>
                        <Field.Root invalid={!!errors.client_document}>
                            <Field.Label>Documento del cliente </Field.Label>
                            <Input
                                type="text"
                                placeholder="Escribe tu nombre"
                                {...register("client_document")}
                            />

                            <Field.ErrorText>{errors.client_document?.message}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.operation_date}>
                            <Field.Label>Fecha de la operación </Field.Label>
                            <DatePicker
                                selected={startDate}
                                ref={register("operation_date").ref}
                                onChange={(date: Date | null) => setValue("operation_date", date as Date)}
                            />
                            <Field.ErrorText>{errors.operation_date?.message}</Field.ErrorText>
                        </Field.Root>
                        {
                            fields.map((field, index) => (
                                <Flex gap={4} mb={4} alignItems={"flex-end"} >
                                    <Field.Root flex={7} invalid={!!errors.paymentMethods}>
                                        <Field.Label>Método</Field.Label>
                                        <NativeSelect.Root>
                                            <NativeSelect.Field placeholder="Seleccionar" {...register(`paymentMethods.${index}.method`)}>
                                                {PAYMENT_METHODS_TYPE.map(method => (
                                                    <option key={method} value={method}>{method}</option>
                                                ))}
                                            </NativeSelect.Field>
                                            <NativeSelect.Indicator />
                                        </NativeSelect.Root>
                                        <Field.ErrorText>{errors.paymentMethods?.message}</Field.ErrorText>
                                    </Field.Root>

                                    <Field.Root flex={4} invalid={!!errors.paymentMethods?.[0]?.amount}>
                                        <Field.Label>Valor</Field.Label>
                                        <Input
                                            type="number"
                                            placeholder="Valor"
                                            {...register(`paymentMethods.${index}.amount`)}
                                        />

                                        <Field.ErrorText>{errors.paymentMethods?.[0]?.amount?.message}</Field.ErrorText>
                                    </Field.Root>

                                    <Field.Root flex={2} invalid={!!errors.paymentMethods?.[0]?.time_value}>
                                        <Field.Label>Plazo</Field.Label>
                                        <Input
                                            type="number"
                                            placeholder="Plazo"
                                            {...register(`paymentMethods.${index}.time_value`)}
                                        />

                                        <Field.ErrorText>{errors.paymentMethods?.[0]?.time_value?.message}</Field.ErrorText>
                                    </Field.Root>

                                    <Field.Root flex={5} mr={3} invalid={!!errors.paymentMethods}>
                                        <Flex alignItems={"center"} justifyContent={"space-between"} width={"full"}>
                                            <Field.Label>Periodo</Field.Label>
                                            {index > 0 &&
                                                (<IconButton
                                                    color={"red.500"}
                                                    _hover={{ color: "red.700" }}
                                                    cursor={"pointer"}
                                                    size={"lg"} backgroundColor={"white"}>
                                                    <MdDelete
                                                        // color="red"
                                                        onClick={() => remove(index)} />
                                                </IconButton>)
                                            }
                                        </Flex>

                                        <NativeSelect.Root>
                                            <NativeSelect.Field placeholder="Seleccionar" {...register(`paymentMethods.${index}.time_unit`)}>
                                                {Object.keys(TIME_UNITS.Enum).map(unit => (
                                                    <option key={unit} value={unit}>{unit}</option>
                                                ))}
                                            </NativeSelect.Field>
                                            <NativeSelect.Indicator />
                                        </NativeSelect.Root>
                                        <Field.ErrorText>{errors.paymentMethods?.message}</Field.ErrorText>
                                    </Field.Root>


                                </Flex>
                            ))
                        }



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
                                                       field.onCh2ange(value)
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

                <Flex flexDir={"column"}>

                    <Button
                        colorPalette={"blue"}
                        onClick={() => append(defaultPm)}
                    > Nuevo método de pago
                    </Button>
                    <Group mt={4}>
                        <Button colorPalette={"blue"} type="submit" > Crear </Button>
                        <Button colorPalette={"purple"} onClick={() => router.back()}> volver </Button>
                    </Group>
                </Flex>

            </form>
            <DevTool control={control}></DevTool>
        </>
    )
}