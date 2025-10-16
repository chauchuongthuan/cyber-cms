import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../../services/user.service';
import { IUser } from '../../model/user.model';
import { convertToFormData } from 'src/app/shared/helper';
import { ShareInfoDataService } from '../../services/shareInfoData.service';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { LocalService } from 'src/app/common/services/local.service';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent implements OnInit {
  isLoading = false;
  loading = false;
  submitted: boolean = false;
  avatarUrl?: string = '';
  hGutter = 16;
  vGutter = 8;
  isEdit: boolean = false;
  idEdit: string = "";
  profileImage: any = [];
  public roleList: Array<any> = [];
  public userForm!: UntypedFormGroup;
  public state = 'Tạo mới';
  public visible = false;
  public size: 'large' | 'default' = 'default';
  public statusValue = true;
 
  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private msg: NzMessageService,
    private shareInfoDataService: ShareInfoDataService,
    private auth: AuthenticationService,
    private localStorage: LocalService,
  ) { }

  resetForm(): void {
    this.userForm = this.formControl();
    this.submitted = false;
    this.state = 'Tạo mới';
    this.isEdit = false
  }

  ngOnInit(): void {
    this.userForm = this.formControl();
    this.userService.getRole().subscribe((data) => {
      if (data)
        this.roleList = data.data.map((item: any) => {
          return {
            name: item.name,
            value: item.id,
          };
        });
    });
  }

  formControl() {
    return this.fb.group({
      profileImage: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
      confirmPassword: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      active: new FormControl(true, [Validators.required]),      
   });
  }

  dataInit(data: IUser, action: boolean){
    console.log("data::", data)
    this.isEdit = action;
    this.state = 'Chỉnh sửa';
    if(data.profileImage){
      this.profileImage = [{value: null, preview: data?.profileImage}]
    } else this.profileImage = []
    this.userForm = this.fb.group({
      email: new FormControl(data.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      name: new FormControl(data.name, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      password: new FormControl('', [Validators.minLength(5), Validators.maxLength(255)]),
      confirmPassword: new FormControl('', []),
      role: new FormControl(data.role?.id, [Validators.required]),
      active: new FormControl(data.active, [Validators.required]),
      profileImage: new FormControl({value: null, preview: data?.profileImage}, []),
    });
    this.userForm.get('password')?.valueChanges.subscribe(() => {
      if(this.userForm.controls['password'].value != '') {
        this.userForm.controls['confirmPassword'].setValidators(Validators.required)
        this.userForm.controls['confirmPassword'].updateValueAndValidity();
      }
      else{
        this.userForm.controls['confirmPassword'].clearValidators();
        this.userForm.controls['confirmPassword'].updateValueAndValidity();
      }
    })
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
    this.statusValue = true;
    this.resetForm()
  }

  confirmDrawer(){
    this.submitted = true;
    if(this.userForm.invalid || this.userForm.controls['password'].value !== this.userForm.controls['confirmPassword'].value) {
      console.log("error");     
      return
    };
    this.isLoading = true;
    let formData = convertToFormData({...this.userForm.value}, ['profileImage'])
    if(!this.isEdit){
      this.userService.createUser(formData).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.userForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
    else {
      this.userService.editUser(formData, this.idEdit).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.userForm = this.formControl()
          this.submitted = false
          this.close()
          this.shareInfoDataService.setData(data)

          let currentUser = this.auth.currentUserValue;
          if(currentUser.id === this.idEdit){
            let newUser = {
              ...currentUser,
              ...data,
            }
            this.localStorage.setAuthUser(newUser);
          }    
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
  }

  changeFileUpload(data: any, field: string){
    this.userForm.controls[field].setValue(data);
  }
}
