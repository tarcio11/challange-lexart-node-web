'use client'

import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const productFiltersSchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
})

type ProductFiltersSchema = z.infer<typeof productFiltersSchema>

export function ProductTableFilters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const params = new URLSearchParams(searchParams)

  const { register, handleSubmit, reset, watch, control } = useForm<ProductFiltersSchema>({
    defaultValues: {
      type: 'all',
      name: '',
    },
  })

  async function handleFilter(data: ProductFiltersSchema) {
    params.set('name', data.name?.toString() ?? '')
    params.set('type', data.type?.toString() ?? 'all')
    params.set('page', '1')
    replace(`${pathname}?${params.toString()}`)
  }

  function handleClearFilters() {
    params.delete('name')
    params.set('type', 'all')
    params.set('page', '1')
    replace(`${pathname}`)
    reset()
  }

  const hasAnyFilter = !!watch('name') || watch('type')

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Controller
        control={control}
        name="type"
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="external">Externos</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />
      <Input
        placeholder="Nome do produto"
        className="h-8 w-auto"
        {...register('name')}
      />
      <Button type="submit" variant="secondary" size="sm" disabled={!hasAnyFilter}>
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!hasAnyFilter}
        onClick={handleClearFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
