import { CreateEditCustomerCareListComponent } from '../components/create-edit-customer-care-list/create-edit-customer-care-list.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerCareListService } from '../services/customerCareList.service';
import { Ipaginator, option, params, sort } from 'src/app/common/constant/list.model';
import { HttpParams } from '@angular/common/http';
import { RouterService } from 'src/app/common/services/router.service';
import { tableData } from 'src/app/common/constant/pageList.constant';

@Component({
  selector: 'app-customer-care-list',
  templateUrl: './customer-care-list.component.html',
  styleUrls: ['./customer-care-list.component.scss']
})
export class CustomerCareListComponent implements OnInit {
  @ViewChild('actionComponent') actionComponent: CreateEditCustomerCareListComponent
  public tableLoading: boolean = false;
  public checked: boolean = true;
  public expandSet = new Set<number>();
  public filterForm: UntypedFormGroup;
  public createForm!: UntypedFormGroup;
  public visible = false;
  public size: 'large' | 'default' = 'default';
  public params: HttpParams = params;
  public paginator: Ipaginator = {
    option: option,
    limit: 10,
    currentPage: 1,
    total: 0,
    pageCount: 0
  };

  public data: tableData = {
    column: [
      {
        dataIndex: "name",
        name: "Tên",
      },
      {
        dataIndex: "status",
        name: "Trạng thái",
        isActive: true,
      },
      {
        dataIndex: "createdAt",
        name: "Ngày tạo",
      },
      {
        dataIndex: "action",
        name: "Hành động",
        listButton: true,
      },
    ],
    data: [],
  };
  
  constructor(
    private fb: UntypedFormBuilder,
    private customerCareListService: CustomerCareListService,
    private msg: NzMessageService,
    private routerService: RouterService
  ) { }

  ngOnInit(): void {
    this.initParams();
    this.getCustomerCareList(this.params);
  }

  initParams(){
    let urlParams = this.routerService.params
    let keys = Object.keys(urlParams)
    keys.forEach((key, index) => {
      this.params = this.params.set(key, urlParams[key])
    })
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
  
  getCustomerCareList(params: HttpParams) {
    this.tableLoading = true;
    this.customerCareListService.getCustomerCareList(params).subscribe((data) => {
      this.data.data = data.list?.map((item: any) => {
        let action = [
          {
            icon: "edit",
            fn: () => this.onEdit(item),
          },
          {
            icon: "delete",
            isDanger: true,
            isComfirm: true,
            tip: "Bạn có chắc muốn xóa?",
            fn: () => this.onDelete(item.id || item._id),
          },
        ];
        let createdAt = new Date(item.createdAt).toLocaleString("en-GB", {
          timeZone: "Asia/Ho_Chi_Minh",
        });
        return {
          ...item,
          action,
          createdAt,      
        };
      });
      this.paginator = {
        ...data.paginator,
        option,
      };
      this.tableLoading = false;
      this.routerService.replaceParams(this.params);
    });
  }

  onFilter(filters: any){    
    if(filters){
      let keys = Object.keys(filters)
      let values = Object.values(filters)
      keys.forEach((key, index) => {
        if(!values[index]){
          this.params = this.params.set(key, '')
        }else if(['number', 'boolean', 'string'].includes(typeof values[index])){
          this.params = this.params.set(key, `${values[index]}`)
        }
      })
    }
    this.getCustomerCareList(this.params)
  }

  onEdit(data: any){
    this.actionComponent.showLarge();
    this.actionComponent.dataInit(data, true);
  }

  onDelete(id: string){
    this.tableLoading = true
    this.customerCareListService.deleteCustomerCareList(id).subscribe(data => {
        this.getCustomerCareList(this.params)
      },
      error => this.tableLoading = false
    )
  }

  get title(): string {
    return `${this.size} Drawer`;
  }

  tableChange(e: any){
    let arraySort = e.sort as Array<any>;
    let fieldSort = arraySort.find((item) => item.value != null)

    let page = e.pageIndex;
    let limit = e.pageSize;
    let sort: sort = {
      orderBy: fieldSort ? fieldSort.key : 'createdAt',
      order: fieldSort?.value == 'ascend' ? 1 : -1
    }
    this.onChange(page, limit, sort)
  }

  onChange(page: number, limit: number, sort: sort){
    this.params = this.params.set('page', page)
    this.params = this.params.set('limit', limit)
    this.params = this.params.set('orderBy', sort.orderBy)
    this.params = this.params.set('order', sort.order)
    this.getCustomerCareList(this.params)
  }

  onSuccess(){
    this.getCustomerCareList(this.params);
  }
  
  exportCustomerCareList(){
    this.customerCareListService.exportCustomerCareList(this.params);
  }

  changeStatus(id: any, $event: any){
    this.customerCareListService.changeStatus(id, $event).subscribe(data => {})
  }
}
