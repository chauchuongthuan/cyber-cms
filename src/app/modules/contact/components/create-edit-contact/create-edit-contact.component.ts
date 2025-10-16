import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { convertToFormDataV2 } from 'src/app/shared/helper';
import { ContactService } from '../../services/contact.service';
import { IContact } from '../../model/contact.model';

@Component({
  selector: 'app-create-edit-contact',
  templateUrl: './create-edit-contact.component.html',
  styleUrls: ['./create-edit-contact.component.scss']
})
export class CreateEditContactComponent implements OnInit {
  isLoading = false;
  loading = false;
  submitted: boolean = false;
  avatarUrl?: string = '';
  hGutter = 16;
  vGutter = 8;
  isEdit: boolean = false;
  idEdit: string = "";
  messageFile: any = [];
  public contactForm!: UntypedFormGroup;
  public state = 'Tạo mới';
  public visible = false;
  public size: 'large' | 'default' = 'default';
 
  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private contactService: ContactService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formControl();
    // this.getContact();
  }
  formControl() {
    return this.fb.group({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]),
      status: new FormControl('',[Validators.required]),
      message: new FormControl('',[]),
      messageFile: new FormControl({ value: null, preview: null }, []),
   });
  }

  dataInit(data: IContact, action: boolean){
    this.isEdit = action;
    this.state = 'Chỉnh sửa';
    if(data.messageFile){
      this.messageFile = [{ value: null, preview: data.messageFile }];
    }
    else {
      this.messageFile = []
    }
    this.contactForm = this.fb.group({
      phone: new FormControl(data.phone, []),
      name: new FormControl(data.name, []),
      email: new FormControl(data.email, []),
      status: new FormControl(`${data.status}`, [Validators.required]),
      message: new FormControl(data?.message ? data?.message : '', []),
      messageFile: new FormControl({ value: null, preview: data.messageFile }, []),
    });
    if(data.messageFile)
      this.messageFile = [{ value: null, preview: data.messageFile }];
    else this.messageFile = []
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
    if(this.contactForm.invalid) return;
    this.isLoading = true;
    let data = {
      name: this.contactForm.controls['name'].value,
      email: this.contactForm.controls['email'].value,
      phone: this.contactForm.controls['phone'].value,
      message: this.contactForm.controls['message'].value,
      messageFile: this.contactForm.controls['messageFile'].value,
      status: this.contactForm.controls['status'].value,    
    };
    let formData = convertToFormDataV2(data, ['messageFile'])
    if(!this.isEdit){
      this.contactService.createContact(formData).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.contactForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
    else {
      this.contactService.editContact(formData, this.idEdit).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.contactForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
  }

  changeFileUpload(data: any, field: string){
    this.contactForm.controls[field].setValue(data);
  }

  resetForm() {
    this.contactForm = this.formControl();
    this.submitted = false;
    this.state = 'Tạo mới';
    this.isEdit = false;
    this.messageFile = [];
  }

  // exportFile(url: any){
  //   console.log("url::", url)
  //   if(url){
  //     this.contactService.exportFile(url.preview);
  //   }
  //   else{
  //     return;
  //   }
  // }
}
