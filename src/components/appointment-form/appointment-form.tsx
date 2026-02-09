'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { Field } from '../ui/field'

const appointmentFormSchema = z.object({
  tutorName: z.string().min(3, 'O nome do tutor é obrigatório'),
  // petName: z.string().min(3, 'O nome do pet é obrigatório'),
  // phone: z.string().min(11, 'número de telefone é obrigatório'),
  // description: z.string().min(3, 'A descrição é obrigatória'),
})

type AppointFormValues = z.infer<typeof appointmentFormSchema>

export function AppointmentForm() {
  const form = useForm<AppointFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: '',
      // petName: '',
      // phone: '',
      // description: '',
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
        <Field>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <input {...form.register('tutorName')} type="text" />
            <Button type="submit">Salvar</Button>
          </form>
        </Field>
      </DialogContent>
    </Dialog>
  )
}
