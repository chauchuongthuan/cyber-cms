import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { convertToFormDataV2 } from 'src/app/shared/helper';
import { CustomerCareListService } from '../../services/customerCareList.service';
import { ICustomerCareList } from '../../model/customerCareList.model';

@Component({
  selector: 'app-create-edit-customer-care-list',
  templateUrl: './create-edit-customer-care-list.component.html',
  styleUrls: ['./create-edit-customer-care-list.component.scss']
})
export class CreateEditCustomerCareListComponent implements OnInit {
  isLoading = false;
  loading = false;
  submitted: boolean = false;
  avatarUrl?: string = '';
  hGutter = 16;
  vGutter = 8;
  isEdit: boolean = false;
  idEdit: string = "";
  image: any = [];
  dataEditor: string = '';
  public customerCareListForm!: UntypedFormGroup;
  public state = 'Tạo mới';
  public visible = false;
  public size: 'large' | 'default' = 'default';
  public typeSelectData: any = [];
 
  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private customerCareListService: CustomerCareListService,
  ) { }

  ngOnInit(): void {
    this.customerCareListForm = this.formControl();
    this.customerCareListService.getType().subscribe(data => {
      this.typeSelectData = data
    })
  }

  formControl() {
    setTimeout(() => { 
      this.dataEditor = '';
    }, 200)
    return this.fb.group({
      name: new FormControl('',[Validators.required]),
      content: new FormControl('',[]),
      type: new FormControl('',[Validators.required]),
      image: new FormControl({ value: null, preview: null }, []),
   });
  }

  dataInit(data: ICustomerCareList, action: boolean){
    this.isEdit = action;
    this.state = 'Chỉnh sửa';
    if(data.image){
      this.image = [{ value: null, preview: data.image }];
    }
    else {
      this.image = []
    }
    this.customerCareListForm = this.fb.group({
      name: new FormControl(data.name, [Validators.required]),
      content: new FormControl(data?.content ? data?.content : "", []),
      type: new FormControl(data.type, [Validators.required]),
      image: new FormControl({ value: null, preview: data.image }, []),
   });
    this.idEdit = data.id;
    setTimeout(() => {
      this.dataEditor = data.content;
    }, 200);
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

  onChangeEditor(data: any){
    this.customerCareListForm.controls['content'].setValue(data);
    this.dataEditor = data;
  }

  confirmDrawer(){
    this.submitted = true;
    if(this.customerCareListForm.invalid) return;
    this.isLoading = true;
    let data = {
      name: this.customerCareListForm.controls['name'].value,
      content: this.customerCareListForm.controls['content'].value,
      type: this.customerCareListForm.controls['type'].value,   
      image: this.customerCareListForm.controls['image'].value,
    };
    let formData = convertToFormDataV2(data, ['image'])
    if(!this.isEdit){
      this.customerCareListService.createCustomerCareList(formData).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.customerCareListForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
    else {
      this.customerCareListService.editCustomerCareList(formData, this.idEdit).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.customerCareListForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
  }

  changeFileUpload(data: any, field: string){
    this.customerCareListForm.controls[field].setValue(data);
  }

  resetForm() {
    this.customerCareListForm = this.formControl();   
    this.submitted = false;
    this.state = 'Tạo mới';
    this.isEdit = false;
    this.image = [];
  }

}
