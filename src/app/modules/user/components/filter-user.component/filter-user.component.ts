import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
})
export class FilterUserComponent implements OnInit {
  @Output() onFilter = new EventEmitter<any>();
  @Output() onExport = new EventEmitter<any>();
  public filterForm!: UntypedFormGroup;
  public roleList: Array<any> = [];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.filterForm = this.filterFormControl();
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

  filterFormControl() {
    return this.fb.group({
      email: new FormControl('', []),
      name: new FormControl('', []),
      role: new FormControl('', []),
   });
  }

  onApply(){
    let params = {} as any
    let keys = Object.keys(this.filterForm.value)
    let values = Object.values(this.filterForm.value)
    keys.forEach((key, index) => {
      if(['number', 'boolean', 'string'].includes(typeof values[index])){
        params[key] = values[index]
      }else if(values[index] && ['createdFrom', 'createdTo'].includes(key)){        
        let temp = values[index] as any
        params[key] = temp.toISOString()
      } 
    })
    this.onFilter.emit(params)
  }

  onRefresh(){
    this.filterForm.reset();
    this.onFilter.emit(this.filterForm.value)
  }
  
}
