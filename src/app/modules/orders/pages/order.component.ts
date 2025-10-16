import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { OrderService } from '../services/order.service';
import { IOrder } from '../model/order.model';
import { Ipaginator, option, params, sort } from 'src/app/common/constant/list.model';
import { HttpParams } from '@angular/common/http';
import { RouterService } from 'src/app/common/services/router.service';
import { CreateEditOrderComponent } from '../components/create-edit-order/create-edit-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public tableLoading: boolean = false;
  public checked: boolean = true;
  public expandSet = new Set<number>();
  public filterForm!: UntypedFormGroup;
  public listOrder: any;
  public visible = false;
  public size: 'large' | 'default' = 'default';
  public params: HttpParams = params;
  public products: any = [];
  public customers: any = [];
  public paginator: Ipaginator = {
    option: option,
    limit: 10,
    currentPage: 1,
    total: 0,
    pageCount: 0
  };
  public sort: sort = {
    order: -1,
    orderBy: 'createdAt'
  }
  // public listOfData = [];
  @ViewChild('editForm') editForm: CreateEditOrderComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private orderService: OrderService,
    private msg: NzMessageService,
    private routerService: RouterService
  ) { }

  ngOnInit(): void {
    this.orderService.getCustomer().subscribe(data => {
      this.customers = data;
    })
    this.orderService.getProduct().subscribe(data => {
      this.products = data;
    })
    this.initParams();
    this.filterForm = this.fb.group({
      name: new FormControl('', []),
      active: new FormControl('', []),
      date: new FormControl('', []),
    });
    this.getOrder(this.params);
  }

  initParams(){
    // this.params = this.params.set('orderBy', this.sort.orderBy)
    // this.params = this.params.set('order', this.sort.order)

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
 
  getOrder(params: HttpParams) {
    this.tableLoading = true;
    this.orderService.getOrder(params).subscribe(data => {
      this.listOrder = data.list;
      this.paginator = {
        ...data.paginator,
        option
      }
      this.tableLoading = false;
      this.routerService.replaceParams(this.params);
    })
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
    this.getOrder(this.params)
  }
  onEdit(data: any){
    this.editForm.visible = true;
    this.editForm.initData(data);
  }

  onDelete(id: string){
    this.tableLoading = true
    this.orderService.deleteOrder(id).subscribe(data => {
        this.getOrder(this.params)
      },
      error => this.tableLoading = false
    )
  }
  onExport(){
    this.orderService.exportOrder(this.params)
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
    this.getOrder(this.params)
  }
  onSuccess(){
    this.getOrder(this.params);
  }
}
