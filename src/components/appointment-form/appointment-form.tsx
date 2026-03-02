'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format, startOfToday } from 'date-fns'
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Dog,
  Phone,
  User,
} from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
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
import { cn } from '@/lib/utils'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const appointmentFormSchema = z.object({
  tutorName: z.string().min(3, 'O nome do tutor é obrigatório'),
  petName: z.string().min(3, 'O nome do pet é obrigatório'),
  phone: z.string().min(11, 'Número de telefone é obrigatório'),
  description: z.string().min(3, 'A descrição é obrigatória'),
  scheduleAt: z
    .date({
      error: 'A data é obrigatória',
    })
    .min(startOfToday(), {
      message: 'A data não pode ser no passado',
    }),
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
      scheduleAt: undefined,
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
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                      size={20}
                    />
                    <IMaskInput
                      mask="(00) 0 0000-0000"
                      className="pl-10 flex h-12 w-full rounded-md border border-border-primary bg-background-tertiary px-3 py-2 text-sm text-content-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-content-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-border-brand disabled:cursor-not-allowed disabled:opacity-50 hover:border-border-secondary focus:border-border-brand focus-visible:border-border-brand aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="(00) 0 0000-0000"
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

            <Controller
              control={form.control}
              name="scheduleAt"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-label-medium-size text-content-primary"
                  >
                    Data
                  </FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <CalendarIcon
                            className="text-content-brand"
                            size={20}
                          />
                          {field.value ? (
                            format(field.value, 'dd/MM/yyyy')
                          ) : (
                            <span className="text-content-secondary">
                              Selecione uma data
                            </span>
                          )}
                        </div>
                        <ChevronDown className="opacity-50 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < startOfToday()}
                      />
                    </PopoverContent>
                  </Popover>
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
