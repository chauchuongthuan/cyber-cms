import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter-token-draw',
  templateUrl: './filter-token-draw.component.html',
  styleUrls: ['./filter-token-draw.component.scss']
})
export class FilterTokenDrawComponent implements OnInit {
  @Output() onFilter = new EventEmitter<any>();
  @Output() onExport = new EventEmitter<any>();
  public filterForm!: UntypedFormGroup;
  public statusList: Array<any> = [
    {
      name: 'Yes',
      value: true,
    },
    {
      name: 'No',
      value: false,
    }
  ];
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.filterForm = this.filterFormControl();
  }

  filterFormControl() {
    return this.fb.group({
      token: new FormControl('', []),
      name: new FormControl('', []),
      isWin: new FormControl('', []),
   });
  }

  onApply(){
    let params = {} as any
    let keys = Object.keys(this.filterForm.value)
    let values = Object.values(this.filterForm.value)
    console.log(values);
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
