import { HttpParams } from "@angular/common/http"

export interface Ipaginator {
    option: Array<number>,
    limit: number,
    currentPage: number,
    total: number,
    pageCount: number
}
export const option = [10, 20, 50, 100]
export interface sort {
    orderBy: string,
    order: number
}
export const params = new HttpParams({
    fromObject: {
      limit: 10,
      page: 1
    }
})