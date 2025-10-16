import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { convertToFormDataV2, strToSlug } from 'src/app/shared/helper';
import { IOrder } from '../../model/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-create-edit-order',
  templateUrl: './create-edit-order.component.html',
  styleUrls: ['./create-edit-order.component.scss']
})
export class CreateEditOrderComponent implements OnInit {
  isLoading = false;
  submitted: boolean = false;
  isEdit: boolean = false;
  dataActive: boolean = true;
  state: string = 'Create';
  id: string = '';
  hGutter = 16;
  vGutter = 8;
  metaImage: any = [];
  public titleSlug: string = '';
  public expandSet = new Set<number>();
  public orderForm!: UntypedFormGroup;
  product: any = {}

  public visible = false;
  public size: 'large' | 'default' = 'large';
  @Output() onSuccess = new EventEmitter<any>();
  @Input() customers: any = [];
  @Input() products: any = [];

  constructor(
    private fb: UntypedFormBuilder,
    private orderService: OrderService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.orderForm = this.orderFormControl();
    // this.getOrder();
  }

  orderFormControl() {
    return this.fb.group({
      customer: new FormControl('', [Validators.required]),
      product: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      order: new FormControl('', [Validators.required]),
   });
  }
  initData(data: IOrder){
    this.state = 'Edit';
    this.id = data.id;
    this.isEdit = true;
    this.product = data.product
    this.orderForm = this.fb.group({
      customer: new FormControl(data.customer._id, [Validators.required]),
      product: new FormControl(data.product._id, [Validators.required]),
      quantity: new FormControl(data.quantity, [Validators.required]),
      order: new FormControl(data.quantity, [Validators.required]),
    });
  }
  // onExpandChange(id: number, checked: boolean): void {
  //   if (checked) {
  //     this.expandSet.add(id);
  //   } else {
  //     this.expandSet.delete(id);
  //   }
  // }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.resetForm();
  }

  onChangeTitle(locale: string){
    if(this.orderForm.controls[`name`].value){
      let slug = strToSlug(this.orderForm.controls[`name`].value);
      this.orderForm.controls[`slug`].setValue(slug);
    }
  }

  changeFileUpload(data: any, field: string){
    this.orderForm.controls[field].setValue(data);
  }

  confirmDrawer(){
    this.submitted = true;
    if(this.orderForm.invalid) return;
    this.isLoading = true;

    let formData = convertToFormDataV2(this.orderForm.value, [])

    if(this.isEdit)
      this.orderService.editOrder(formData, this.id).subscribe((data) => {
        this.isLoading = false;
        this.visible = false;
        this.onSuccess.emit();
        this.resetForm();
      }, (error)=>{
        this.isLoading = false;
      })
    else
      this.orderService.createOrder(formData).subscribe((data) => {
        this.isLoading = false;
        this.visible = false;
        this.onSuccess.emit();
        this.resetForm();
      }, (error)=>{
        this.isLoading = false;
      })

  }

  resetForm() {
    this.orderForm = this.orderFormControl();
    this.submitted = false;
    this.state = 'Create';
    this.isEdit = false
  }

}
