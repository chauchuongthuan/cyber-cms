import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { convertToFormDataV2, getFileNameFromPath, strToSlug } from 'src/app/shared/helper';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-create-edit-page',
  templateUrl: './create-edit-page.component.html',
  styleUrls: ['./create-edit-page.component.scss']
})
export class CreateEditPageComponent implements OnInit {
  isLoading = false;
  submitted: boolean = false;
  isEdit: boolean = false;
  dataEditor: string = '';
  state: string = 'Tạo mới';
  public tabLocale: string = 'vi';
  id: string = '';
  hGutter = 16;
  vGutter = 8;
  metaImage: any = [];
  image: any = [];
  imageMb: any = [];
  @Input() categories: any = [];
  tags: any = [];
  public titleSlug: string = '';
  public expandSet = new Set<number>();
  public pageForm!: FormGroup;
  public visible = false;
  public size: 'large' | 'default' = 'large';
  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private pageService: PageService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.pageForm = this.fb.group({
      id: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      name_vi: new FormControl('', [Validators.required]),
      metaImage_vi: new FormControl('', []),
      metaTitle_vi: new FormControl('', []),
      metaKeyword_vi: new FormControl('', []),
      metaDescription_vi: new FormControl('', []),
      name_en: new FormControl('', [Validators.required]),
      metaImage_en: new FormControl('', []),
      metaTitle_en: new FormControl('', []),
      metaKeyword_en: new FormControl('', []),
      metaDescription_en: new FormControl('', []),
      content_vi: new FormControl([], []),
      content_en: new FormControl( [], []),
      imageRms: new FormControl([], []),
    });
  }

  initData(data: any){
    this.state = 'Câp nhật';
    this.id = data?.id;
    this.isEdit = true;
    let metaImage_vi = {
      value: '',
      preview: data?.metaImage?.vi || '',
    };

    let metaImage_en = {
      value: '',
      preview: data?.metaImage?.en || '',
    };
    this.pageForm = this.fb.group({
      id: new FormControl(data?.id || data?._id, [Validators.required]),
      code: new FormControl(data?.code || '', [Validators.required]),
      name_vi: new FormControl(data?.name.vi || '', [Validators.required]),
      metaImage_vi: new FormControl(metaImage_vi || '', []),
      metaTitle_vi: new FormControl(data?.metaTitle.vi || '', []),
      metaKeyword_vi: new FormControl(data?.metaKeyword.vi || '', []),
      metaDescription_vi: new FormControl(data?.metaDescription.vi || '', []),
      name_en: new FormControl(data?.name.en || '', [Validators.required]),
      metaImage_en: new FormControl(metaImage_en || '', []),
      metaTitle_en: new FormControl(data?.metaTitle.en || '', []),
      metaKeyword_en: new FormControl(data?.metaKeyword.en || '', []),
      metaDescription_en: new FormControl(data?.metaDescription.en || '', []),
      content_vi: new FormControl(data?.content?.vi || [], []),
      content_en: new FormControl(data?.content?.en || [], []),
      imageRms: new FormControl([], []),
    });
    this.visible = true;
    return this.pageForm;
  }
  // onExpandChange(id: number, checked: boolean): void {
  //   if (checked) {
  //     this.expandSet.add(id);
  //   } else {
  //     this.expandSet.delete(id);
  //   }
  // }
  get title(): string {
    return `Thêm mới danh mục bài viết`;
  }

  open(): void {
    this.visible = true;
    this.resetForm();
    setTimeout(() => { 
      this.dataEditor = '';
    }, 350)

  }

  close(): void {
    this.resetForm();
    this.visible = false;
  }

  onChangeTitle(locale: string){
    if(this.pageForm.controls[`title`].value){
      let slug = strToSlug(this.pageForm.controls[`title`].value);
      this.pageForm.controls[`slug`].setValue(slug);
    }
  }
  onChangeEditor(data: any){
    this.pageForm.controls['content'].setValue(data);
    this.dataEditor =data;
  }
  changeFileUpload(data: { value: any; preview: string }, field: string) {
    let imageRms: Array<string> = this.pageForm.controls['imageRms'].value || [];

    if (
      !this.pageForm.controls[field].value?.value &&
      this.pageForm.controls[field].value?.preview
    ) {
      let imageRm = getFileNameFromPath(
        this.pageForm.controls[field].value?.preview
      );
      imageRms.push(imageRm);
    }

    this.pageForm.controls[field].setValue(data);
    this.pageForm.controls['imageRms'].setValue(imageRms);
  }

  confirmDrawer(){
    this.submitted = true;
    if(this.pageForm.invalid) return;
    this.isLoading = true;

    let formData = convertToFormDataV2(this.pageForm.value, ['metaImage', 'image', 'imageMb'])

    if(this.isEdit)
      this.pageService.editPage(formData, this.id).subscribe((data) => {
        this.isLoading = false;
        this.visible = false;
        this.onSuccess.emit();
        this.resetForm();
      }, (error)=>{
        this.isLoading = false;
      })
  }

  resetForm() {
    // this.pageForm = this.pageFormControl();
    this.submitted = false;
    this.state = 'Tạo mới';
    this.isEdit = false;
    this.image = [];
    this.imageMb = [];
    this.metaImage = [];
  }

}
