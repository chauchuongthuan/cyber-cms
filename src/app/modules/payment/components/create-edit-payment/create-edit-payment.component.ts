import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { PaymentTypeTrans } from 'src/app/common/constant/payment.enum';
import { convertToFormDataV2, strToSlug } from 'src/app/shared/helper';
import { IPayment } from '../../model/payment.model';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-create-edit-payment',
  templateUrl: './create-edit-payment.component.html',
  styleUrls: ['./create-edit-payment.component.scss']
})
export class CreateEditPaymentComponent implements OnInit {
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
  public paymentForm!: UntypedFormGroup;

  public visible = false;
  public size: 'large' | 'default' = 'large';
  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private paymentService: PaymentService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.paymentForm = this.paymentFormControl();
    // this.getPayment();
  }

  paymentFormControl() {
    return this.fb.group({
      customer: new FormControl('', [Validators.required]),
      usd: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      coin: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
   });
  }
  initData(data: IPayment){
    this.state = 'Edit';
    this.id = data.id;
    this.isEdit = true;
    this.paymentForm = this.fb.group({
      customer: new FormControl(data.customer._id, [Validators.required]),
      // customerName: new FormControl(data.customer.name, [Validators.required]),
      usd: new FormControl(data.usd, [Validators.required]),
      type: new FormControl(data.type, [Validators.required]),
      // typeName: new FormControl(PaymentTypeTrans(data.type), [Validators.required]),
      coin: new FormControl(data.coin, [Validators.required]),
      status: new FormControl(data.status, [Validators.required]),
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
    if(this.paymentForm.controls[`name`].value){
      let slug = strToSlug(this.paymentForm.controls[`name`].value);
      this.paymentForm.controls[`slug`].setValue(slug);
    }
  }

  changeFileUpload(data: any, field: string){
    this.paymentForm.controls[field].setValue(data);
  }

  confirmDrawer(){
    this.submitted = true;
    if(this.paymentForm.invalid) return;
    this.isLoading = true;

    let formData = convertToFormDataV2(this.paymentForm.value, [])

    if(this.isEdit)
      this.paymentService.editPayment(formData, this.id).subscribe((data) => {
        this.isLoading = false;
        this.visible = false;
        this.onSuccess.emit();
        this.resetForm();
      }, (error)=>{
        this.isLoading = false;
      })
    // else
    //   this.paymentService.createPayment(formData).subscribe((data) => {
    //     this.isLoading = false;
    //     this.visible = false;
    //     this.onSuccess.emit();
    //     this.resetForm();
    //   }, (error)=>{
    //     this.isLoading = false;
    //   })

  }

  resetForm() {
    this.paymentForm = this.paymentFormControl();
    this.submitted = false;
    this.state = 'Create';
    this.isEdit = false
  }

}
