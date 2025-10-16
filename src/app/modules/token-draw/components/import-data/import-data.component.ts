import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { convertToFormDataV2 } from 'src/app/shared/helper';
import { TokenDrawService } from '../../services/token-draw.service';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent implements OnInit {
  public importForm: FormGroup;
  public files: any = [];
  public isLoading = false;
  public visible = false;
  public hGutter = 16;
  public vGutter = 8;
  public size: 'large' | 'default' = 'default';
  public submitted = false;
  @Output() onSuccess = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private tokenDrawServer: TokenDrawService) { }

  ngOnInit(): void {
    this.importForm = this.importFormControl();
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

  resetForm() {
    this.importForm.reset();
  }

  importFormControl() {
    return this.fb.group({
      files: new FormControl({ value: null, preview: null }, []),
    });
  }

  changeFileUpload(data: any, field: string){
    this.importForm.controls[field].setValue(data);
  }

  confirmDrawer(){
    this.submitted = true;
    if(this.importForm.invalid) return;
    this.isLoading = true;

    let formData = convertToFormDataV2(this.importForm.value, ['files'])
    this.tokenDrawServer.importTokenDraw(formData).subscribe((data) => {
      if(data){
        this.isLoading = false;
        this.onSuccess.emit()
        this.submitted = false
        this.close()
      }
    }, (error)=>{
      this.isLoading = false;
    })
  }

}
