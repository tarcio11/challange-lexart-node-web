import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './ui/button'

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}: PaginationProps) {
  function getPaginationDetails(
    currentPage: number,
    itemsPerPage: number,
    totalItems: number,
  ) {
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    return `Exibindo ${startItem} - ${endItem} de ${totalItems} itens`
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const hasNextPage = totalPages > currentPage
  const hasPreviousPage = currentPage > 1

  return (
    <div className="flex items-center justify-between p-4 text-muted-foreground w-full">
      <span className="text-sm text-muted-foreground">
        {getPaginationDetails(currentPage, itemsPerPage, totalItems)}
      </span>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {currentPage} de {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 0}
          >
            <span className="sr-only">Primeira página</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPreviousPage}
          >
            <span className="sr-only">Página anterior</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage}
          >
            <span className="sr-only">Próxima página</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageChange(totalPages - 1)}
            disabled={currentPage + 1 >= totalPages}
          >
            <span className="sr-only">Última página</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
