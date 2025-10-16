import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { convertToFormData, convertToFormDataV2, strToSlug } from 'src/app/shared/helper';
import { CustomerCareTypeService } from '../../services/customerCareType.service';
import { ICustomerCareType } from '../../model/customerCareType.model';

@Component({
  selector: 'app-create-edit-customer-care-type',
  templateUrl: './create-edit-customer-care-type.component.html',
  styleUrls: ['./create-edit-customer-care-type.component.scss']
})
export class CreateEditCustomerCareTypeComponent implements OnInit {
  isLoading = false;
  loading = false;
  submitted: boolean = false;
  avatarUrl?: string = '';
  hGutter = 16;
  vGutter = 8;
  isEdit: boolean = false;
  idEdit: string = "";
  image: any = [];
  public customerCareTypeForm!: UntypedFormGroup;
  public state = 'Tạo mới';
  public visible = false;
  public size: 'large' | 'default' = 'default';
 
  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private customerCareTypeService: CustomerCareTypeService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.customerCareTypeForm = this.formControl();
    // this.getCustomerCareType();
  }

  formControl() {
    return this.fb.group({
      name: new FormControl('',[Validators.required]),
      slug: new FormControl('',[Validators.required]),
      image: new FormControl({ value: null, preview: null }, []),
   });
  }

  dataInit(data: ICustomerCareType, action: boolean){
    this.isEdit = action;
    this.state = 'Chỉnh sửa';
    if(data.image){
      this.image = [{ value: null, preview: data.image }];
    }
    else {
      this.image = []
    }
    this.customerCareTypeForm = this.fb.group({
      name: new FormControl(data.name, [Validators.required]),
      slug: new FormControl(data.slug, [Validators.required]),
      image: new FormControl({ value: null, preview: data.image }, []),
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
    if(this.customerCareTypeForm.invalid) return;
    this.isLoading = true;
    let data = {
      name: this.customerCareTypeForm.controls['name'].value,
      slug: this.customerCareTypeForm.controls['slug'].value,  
      image: this.customerCareTypeForm.controls['image'].value,
    };
    let formData = convertToFormDataV2(data, ['image'])
    if(!this.isEdit){
      this.customerCareTypeService.createCustomerCareType(formData).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.customerCareTypeForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
    else {
      this.customerCareTypeService.editCustomerCareType(formData, this.idEdit).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.customerCareTypeForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
  }

  changeFileUpload(data: any, field: string){
    this.customerCareTypeForm.controls[field].setValue(data);
  }

  onChangeName(){
    if(this.customerCareTypeForm.controls['name'].value){
      let slug = strToSlug(this.customerCareTypeForm.controls['name'].value);
      this.customerCareTypeForm.controls['slug'].setValue(slug);
    }
  }
  resetForm() {
    this.customerCareTypeForm = this.formControl();
    this.submitted = false;
    this.state = 'Tạo mới';
    this.isEdit = false;
    this.image = [];
  }

}
