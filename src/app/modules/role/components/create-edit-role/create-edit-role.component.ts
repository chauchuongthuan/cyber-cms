import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RoleService } from '../../services/role.service';
import { IRole } from '../../model/role.model';

@Component({
  selector: 'app-create-edit-role',
  templateUrl: './create-edit-role.component.html',
  styleUrls: ['./create-edit-role.component.scss']
})
export class CreateEditRoleComponent implements OnInit {
  isLoading = false;
  loading = false;
  submitted: boolean = false;
  avatarUrl?: string = '';
  hGutter = 16;
  vGutter = 8;
  isEdit: boolean = false;
  idEdit: string = "";
  messageFile: any = [];
  @Input() permissions: Array<any>;
  public roleForm!: UntypedFormGroup;
  public state = 'Tạo mới';
  public visible = false;
  public size: 'large' | 'default' = 'default';
  public isAdmin = true;
 
  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private roleService: RoleService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.roleForm = this.formControl();
    // this.getRole();
  }

  formControl() {
    return this.fb.group({
      name: new FormControl('',[Validators.required]),
      isAdmin: new FormControl(false, [Validators.required]),
      checkedList: new FormControl([], [Validators.required]),
   });
  }

  dataInit(data: IRole, action: boolean){
    let checkedList: Array<string> = []
    if(data.permissions) checkedList = Object.keys(data.permissions)
    this.isEdit = action;
    this.state = 'Chỉnh sửa';
    this.roleForm = this.fb.group({
      name: new FormControl(data.name, [Validators.required]),
      isAdmin: new FormControl(data.isAdmin, [Validators.required]),
      checkedList: new FormControl(checkedList, [Validators.required]),
   });
    this.idEdit = data.id;
    this.isAdmin = data?.isAdmin
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
    this.isAdmin = true;
    this.resetForm();
  }

  confirmDrawer(){
    this.submitted = true;
    if(this.roleForm.invalid) return;
    this.isLoading = true;
    let permissions = {} as any
    this.roleForm.controls['checkedList'].value.forEach((key: string) => {
      permissions[key] = 1
    });

    if(!this.isEdit){
      this.roleService.createRole({...this.roleForm.value, permissions}).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.roleForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
    else {
      this.roleService.editRole({...this.roleForm.value, permissions}, this.idEdit).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.roleForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
  }

  changeFileUpload(data: any, field: string){
    this.roleForm.controls[field].setValue(data);
  }

  resetForm() {
    this.roleForm = this.formControl();
    this.submitted = false;
    this.state = 'Tạo mới';
    this.isEdit = false
  }
  onChecked(data: {checked: boolean, key: string}){
    let checkedList = this.roleForm.controls['checkedList'].value

    if(data.checked){
      checkedList.push(data.key)
    }else{
      checkedList = checkedList.filter((key: any) => key != data.key)
    }
    this.roleForm.controls['checkedList'].setValue(checkedList)
  }

  onCheckedAll(data: {checked: boolean, keys: Array<string>}){
    let checkedList = this.roleForm.controls['checkedList'].value;

    if(data.checked){
      data.keys.forEach((key, index) => {
        if(!checkedList.includes(key)) checkedList.push(key)
      })
    }else{
      checkedList = checkedList.filter((key: any) => !data.keys.includes(key))
    }
    
    this.roleForm.controls['checkedList'].setValue(checkedList)
  }
}
