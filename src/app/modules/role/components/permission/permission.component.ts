import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  public expanded: boolean = false;
  public keys: Array<any>;
  public values: Array<any>;
  public panels: Array<any> = [];
  @Input() checkedList: Array<string> = [];
  @Input() permission: { group: string, items: Array<any> }

  @Output() onChecked = new EventEmitter<any>();
  @Output() onCheckedAll = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
  ) { }
  ngOnInit(): void {
    if(this.permission.items){
      this.keys = Object.keys(this.permission.items)
      this.values = Object.values(this.permission.items)
    }
    this.panels.push(this.permission);
  }
  
  onChange(checked: boolean, key: string){
    this.onChecked.emit({checked, key})
  }

  onChangeAll(checked: boolean){
    this.onCheckedAll.emit({checked, keys: this.keys})
  }

  isCheckedAll(){
    return this.keys.every((key) => this.checkedList.includes(key))
  }

  permissionNames(){
    let names: string[] = []
    this.keys.forEach((key, index) => {
      if(this.checkedList.includes(key)) names.push(this.values[index])
    })
    return names
  }
}
