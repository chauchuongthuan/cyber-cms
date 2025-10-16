import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PaymentService } from '../services/payment.service';
import { IPayment } from '../model/payment.model';
import { Ipaginator, option, params, sort } from 'src/app/common/constant/list.model';
import { HttpParams } from '@angular/common/http';
import { RouterService } from 'src/app/common/services/router.service';
import { CreateEditPaymentComponent } from '../components/create-edit-payment/create-edit-payment.component';
import { PaymentTypeTrans } from 'src/app/common/constant/payment.enum';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public tableLoading: boolean = false;
  public checked: boolean = true;
  public expandSet = new Set<number>();
  public filterForm!: UntypedFormGroup;
  public listPayment: any;
  public visible = false;
  public PaymentTypeTrans: Function = PaymentTypeTrans;
  public size: 'large' | 'default' = 'default';
  public params: HttpParams = params;
  public checkOptionsOne = [
    { label: 'Tên danh mục', value: 'name', checked: true },
    { label: 'Mô tả', value: 'shortDescription', checked: false },
  ];
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
  @ViewChild('editForm') editForm: CreateEditPaymentComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private paymentService: PaymentService,
    private msg: NzMessageService,
    private routerService: RouterService
  ) { }

  ngOnInit(): void {
    this.initParams();
    this.filterForm = this.fb.group({
      name: new FormControl('', []),
      active: new FormControl('', []),
      date: new FormControl('', []),
    });
    this.getPayment(this.params);
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

  getPayment(params: HttpParams) {
    this.tableLoading = true;
    this.paymentService.getPayment(params).subscribe(data => {
      this.listPayment = data.list;
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
    this.getPayment(this.params)
  }
  onEdit(data: any){
    this.editForm.visible = true;
    this.editForm.initData(data);
  }

  onDelete(id: string){
    this.tableLoading = true
    this.paymentService.deletePayment(id).subscribe(data => {
        this.getPayment(this.params)
      },
      error => this.tableLoading = false
    )
  }
  onExport(){
    this.paymentService.exportPayment(this.params)
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
    this.getPayment(this.params)
  }
  onSuccess(){
    this.getPayment(this.params);
  }
}
