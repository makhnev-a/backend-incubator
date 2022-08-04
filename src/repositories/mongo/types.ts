export type PaginationResultType<T> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: T,
}