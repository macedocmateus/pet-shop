'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Dog, User } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const appointmentFormSchema = z.object({
  tutorName: z.string().min(3, 'O nome do tutor é obrigatório'),
  petName: z.string().min(3, 'O nome do pet é obrigatório'),
  phone: z.string().min(11, 'Número de telefone é obrigatório'),
  description: z.string().min(3, 'A descrição é obrigatória'),
})

type AppointFormValues = z.infer<typeof appointmentFormSchema>

export function AppointmentForm() {
  const form = useForm<AppointFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: '',
      petName: '',
      phone: '',
      description: '',
    },
  })

  function onSubmit(data: AppointFormValues) {
    console.log(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'brand'}>Novo agendamento</Button>
      </DialogTrigger>

      <DialogContent
        variant={'appointment'}
        overlayVariant={'blurred'}
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle size={'modal'}>Agende um atendimento</DialogTitle>
          <DialogDescription size={'modal'}>
            Preencha os dados do cliente para realizar o agendamento
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              control={form.control}
              name="tutorName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-label-medium-size text-content-primary"
                  >
                    Nome do tutor
                  </FieldLabel>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                      size={20}
                    />
                    <Input
                      className="pl-10"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite o nome do tutor"
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="petName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-label-medium-size text-content-primary"
                  >
                    Nome do pet
                  </FieldLabel>
                  <div className="relative">
                    <Dog
                      className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                      size={20}
                    />
                    <Input
                      className="pl-10"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite o nome do pet"
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-label-medium-size text-content-primary"
                  >
                    Telefone
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="(00) 00000-0000"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-label-medium-size text-content-primary"
                  >
                    Descrição
                  </FieldLabel>
                  <Textarea
                    className="resize-none"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Descreva o motivo do agendamento"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
