import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from '../../services/customer.service';
import { ICustomer } from '../../model/customer.model';
import { convertToFormData, convertToFormDataV2 } from 'src/app/shared/helper';

@Component({
  selector: 'app-create-edit-customer',
  templateUrl: './create-edit-customer.component.html',
  styleUrls: ['./create-edit-customer.component.scss']
})
export class CreateEditCustomerComponent implements OnInit {
  isLoading = false;
  loading = false;
  submitted: boolean = false;
  avatarUrl?: string = '';
  hGutter = 16;
  vGutter = 8;
  isEdit: boolean = false;
  idEdit: string = "";
  profileImage: any = [];
  public customerForm!: UntypedFormGroup;
  public state = 'Create';
  public visible = false;
  public size: 'large' | 'default' = 'default';
  public genderList = [
    {
      name: "Ông",
      value: "male",
    },
    {
      name: "Bà",
      value: "female",
    },
    {
      name: "Khác",
      value: "other",
    }
  ]
  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private customerService: CustomerService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.customerForm = this.formControl();
    // this.getCustomer();
  }

  formControl() {
    return this.fb.group({
      username: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      balance: new FormControl('',[Validators.required]),
      password: new FormControl(0,[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required]),
   });
  }

  dataInit(data: ICustomer, action: boolean){
    this.isEdit = action;
    this.state = 'Edit';
    this.customerForm = this.fb.group({
      username: new FormControl(data.username, [Validators.required]),
      email: new FormControl(data.email, [Validators.required]),
      balance: new FormControl(data.balance, [Validators.required]),
      password: new FormControl('', []),
      confirmPassword: new FormControl('', []),
    });
    this.idEdit = data.id;
  }

  showDefault(): void {
    this.size = 'default';
    this.open();
  }

  showLarge(): void {
    this.size = 'large';
    this.open();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.resetForm();
  }

  confirmDrawer(){
    this.submitted = true;
    if(this.customerForm.invalid) return;
    if(this.customerForm.controls['confirmPassword'].value !== this.customerForm.controls['password'].value) return
    this.isLoading = true;
    let data = this.customerForm.value;
    let formData = convertToFormDataV2(data, [])
    if(!this.isEdit){
      this.customerService.createCustomer(formData).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.customerForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
    else {      
      this.customerService.editCustomer(formData, this.idEdit).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.customerForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
  }

  changeFileUpload(data: any, field: string){
    this.customerForm.controls[field].setValue(data);
  }

  resetForm() {
    this.customerForm = this.formControl();
    this.submitted = false;
    this.state = 'Tạo mới';
    this.isEdit = false;
    this.profileImage = [];
  }

}
