import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ICustomer } from 'src/app/modules/customer/model/customer.model';
import { convertToFormDataV2 } from 'src/app/shared/helper';
import { TokenDrawService } from '../../services/token-draw.service';
import { ITokenDraw } from '../../models/tokenDraw.model';

@Component({
  selector: 'app-action-token-draw',
  templateUrl: './action-token-draw.component.html',
  styleUrls: ['./action-token-draw.component.scss']
})
export class ActionTokenDrawComponent implements OnInit {
  isLoading = false;
  loading = false;
  submitted: boolean = false;
  avatarUrl?: string = '';
  hGutter = 16;
  vGutter = 8;
  isEdit: boolean = false;
  idEdit: string = "";
  profileImage: any = [];
  public tokenDrawForm!: UntypedFormGroup;
  public state = 'Tạo mới';
  public visible = false;
  public size: 'large' | 'default' = 'default';

  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private tokenDrawServices: TokenDrawService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.tokenDrawForm = this.formControl();
    // this.getCustomer();
  }

  formControl() {
    return this.fb.group({
      token: new FormControl('', [Validators.required]),
      name: new FormControl('',[Validators.required]),
   });
  }

  dataInit(data: ITokenDraw, action: boolean){
    this.isEdit = action;
    this.state = 'Chỉnh sửa';
    this.tokenDrawForm = this.fb.group({
      token: new FormControl(data.token, [Validators.required]),
      name: new FormControl(data.name, [Validators.required]),
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
    if(this.tokenDrawForm.invalid) return;
    this.isLoading = true;
    let data = {
      ...this.tokenDrawForm.value,      
    }
    if(!this.isEdit){
      this.tokenDrawServices.createTokenDraw(data).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.tokenDrawForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
    else {      
      this.tokenDrawServices.editTokenDraw(data, this.idEdit).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.tokenDrawForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
  }

  changeFileUpload(data: any, field: string){
    this.tokenDrawForm.controls[field].setValue(data);
  }

  resetForm() {
    this.tokenDrawForm = this.formControl();
    this.submitted = false;
    this.state = 'Tạo mới';
    this.isEdit = false;
    this.profileImage = [];
  }

}
