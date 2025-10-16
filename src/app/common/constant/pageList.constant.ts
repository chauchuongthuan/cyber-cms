import { HttpParams } from "@angular/common/http"

export const option = [10, 20, 50, 100]

export const params = new HttpParams({
    fromObject: {
      limit: 10,
      page: 1
    }
})   

export interface tableData {
  column: Array<{
    dataIndex: string,
    name: string,
    isAction?: Boolean,
    isHTML?: boolean,
    isMenu?: Boolean,
    isActive?: boolean,
    isSelect?: Boolean
    sort?: boolean,
    listButton?: boolean,
  }>,
  data: Array<any>
}

export interface paginator {
  option: Array<number>,
  limit: number,
  currentPage: number,
  total: number,
  pageCount: number
}

export interface sort {
  orderBy: string,
  order: number
}

