import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { LocalService } from 'src/app/common/services/local.service';
import { ShareInfoDataService } from 'src/app/modules/user/services/shareInfoData.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { convertToFormData, convertToFormDataV2 } from 'src/app/shared/helper';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {
  isCollapsed = true;
  user: any;
  profileImage: any = [];
  visible: boolean = false;
  isLoading: boolean = false;
  idEdit: string = '';
  hGutter = 16;
  vGutter = 8;
  submitted: boolean = false;
  public roleList: Array<any> = [];
  public statusValue = true;
  public userForm: UntypedFormGroup;
  constructor(
    private auth: AuthenticationService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private userService: UserService,
    private localStorage: LocalService,
    private shareInfoDataService: ShareInfoDataService,
  ) {
    setTimeout(()=>{
      this.isCollapsed = true
    })
    let user = this.auth.currentUserValue;
    if(!user){
      this.router.navigateByUrl('/')
    }
    this.user = user;
    this.dataInit(user);
  }
  ngOnInit(): void {
    this.userService.getRole().subscribe((data) => {
      if (data)
        this.roleList = data.data.map((item: any) => {
          return {
            name: item.name,
            value: item.id,
          };
        });
    });
    this.shareInfoDataService.data$.subscribe(data => {
      if (data.id === this.user.id){
        this.user = data
        this.dataInit(data)
      }      
    })
  }
  dataInit(data:any){
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
  changeFileUpload(data: any, field: string){
    this.userForm.controls[field].setValue(data);
  }
  confirmDrawer(){
    this.submitted = true;
    if(this.userForm.invalid || this.userForm.controls['password'].value !== this.userForm.controls['confirmPassword'].value) {
      console.log("error");     
      return
    };
    this.isLoading = true;
    let formData = convertToFormData({...this.userForm.value}, ['profileImage'])
    this.userService.editUser(formData, this.idEdit).subscribe((data) => {
      if(data){
        this.isLoading = false;
        this.submitted = false;
        this.visible = false;
        let currentUser = this.auth.currentUserValue;
        let newUser = {
          ...currentUser,
          ...data,
        }
        this.localStorage.setAuthUser(newUser);
        this.shareInfoDataService.setData(data);
        this.user = data;
      }
    }, (error)=>{
      this.isLoading = false;
    })
  }
}
