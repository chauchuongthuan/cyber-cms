import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { convertToFormDataV2, strToSlug } from 'src/app/shared/helper';
import { ICategory } from '../../model/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-create-edit-category',
  templateUrl: './create-edit-category.component.html',
  styleUrls: ['./create-edit-category.component.scss']
})
export class CreateEditCategoryComponent implements OnInit {
  isLoading = false;
  submitted: boolean = false;
  isEdit: boolean = false;
  dataActive: boolean = true;
  state: string = 'Create';
  id: string = '';
  hGutter = 16;
  vGutter = 8;
  metaImage: any = [];
  public titleSlug: string = '';
  public expandSet = new Set<number>();
  public categoryForm!: UntypedFormGroup;

  public visible = false;
  public size: 'large' | 'default' = 'large';
  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private categoryService: CategoryService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.categoryFormControl();
    // this.getCategory();
  }

  categoryFormControl() {
    return this.fb.group({
      sortOrder: new FormControl('0', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      unCategory: new FormControl(false, [Validators.required]),
      slug: new FormControl('', [Validators.required]),
   });
  }
  initData(data: ICategory){
    this.state = 'Edit';
    this.id = data.id;
    this.isEdit = true;
    this.categoryForm = this.fb.group({
      sortOrder: new FormControl(data.sortOrder, [Validators.required]),
      name: new FormControl(data.name, [Validators.required]),
      unCategory: new FormControl(data.unCategory, [Validators.required]),
      slug: new FormControl(data.slug, [Validators.required]),
   });
  }
  // onExpandChange(id: number, checked: boolean): void {
  //   if (checked) {
  //     this.expandSet.add(id);
  //   } else {
  //     this.expandSet.delete(id);
  //   }
  // }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.resetForm();
  }

  onChangeTitle(locale: string){
    if(this.categoryForm.controls[`name`].value){
      let slug = strToSlug(this.categoryForm.controls[`name`].value);
      this.categoryForm.controls[`slug`].setValue(slug);
    }
  }

  changeFileUpload(data: any, field: string){
    this.categoryForm.controls[field].setValue(data);
  }

  confirmDrawer(){
    this.submitted = true;
    if(this.categoryForm.invalid) return;
    this.isLoading = true;

    let formData = convertToFormDataV2(this.categoryForm.value, [])

    if(this.isEdit)
      this.categoryService.editCategory(formData, this.id).subscribe((data) => {
        this.isLoading = false;
        this.visible = false;
        this.onSuccess.emit();
        this.resetForm();
      }, (error)=>{
        this.isLoading = false;
      })
    else
      this.categoryService.createCategory(formData).subscribe((data) => {
        this.isLoading = false;
        this.visible = false;
        this.onSuccess.emit();
        this.resetForm();
      }, (error)=>{
        this.isLoading = false;
      })

  }

  resetForm() {
    this.categoryForm = this.categoryFormControl();
    this.submitted = false;
    this.state = 'Create';
    this.isEdit = false
  }

}
