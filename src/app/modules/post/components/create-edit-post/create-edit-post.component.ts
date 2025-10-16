import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
    UntypedFormGroup,
    UntypedFormBuilder,
    FormControl,
    Validators,
    FormArray,
} from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { convertToFormDataV2, strToSlug } from "src/app/shared/helper";
import { IPost } from "../../model/post.model";
import { PostService } from "../../services/post.service";
import { countries } from "country-flags-svg";

@Component({
    selector: "app-create-edit-post",
    templateUrl: "./create-edit-post.component.html",
    styleUrls: ["./create-edit-post.component.scss"],
})
export class CreateEditPostComponent implements OnInit {
    isLoading = false;
    submitted: boolean = false;
    isEdit: boolean = false;
    isExploit: boolean = false;
    dataEditor: string = "";
    state: string = "Create";
    id: string = "";
    hGutter = 16;
    vGutter = 8;
    metaImage: any = [];
    image: any = [];
    countryList: any = countries;
    
    
    content: any = [""];
    @Input() categories: any = [];
    tags: any = [];
    public titleSlug: string = "";
    public expandSet = new Set<number>();
    public postForm!: UntypedFormGroup;
    public visible = false;
    public size: "large" | "default" = "large";
    @Output() onSuccess = new EventEmitter<any>();
    constructor(
        private fb: UntypedFormBuilder,
        private postService: PostService,
        private msg: NzMessageService
    ) { }

    ngOnInit(): void {
        this.postForm = this.postFormControl();
        setTimeout(() => {
            this.dataEditor = "";
        }, 200);
    }

    postFormControl() {
        this.image = [];
        return this.fb.group({
            image: new FormControl({ value: null, preview: null }, [
                Validators.required,
            ]),
            content: new FormControl([], []),
            title: new FormControl("", []),
            slug: new FormControl("", [Validators.required]),
            author: new FormControl("", []),
            readTime: new FormControl("", []),
        });
    }
    initData(data: IPost) {
        this.state = "Edit";
        this.id = data.id;
        this.isEdit = true;
        this.content = data.content;
        this.postForm.controls["image"].setValue({
            value: null,
            preview: data.image,
        });
        this.postForm.controls["title"].setValue(data?.title);
        this.postForm.controls["slug"].setValue(data?.slug);
        this.postForm.controls["content"].setValue(data?.content);
        setTimeout(() => {
            this.dataEditor = data?.content;
        }, 350);
        if (data.image) this.image = [{ value: null, preview: data.image }];
        else this.image = [];
        this.postForm.controls["author"].setValue(data?.author);
        this.postForm.controls["readTime"].setValue(data?.readTime);
    }

    open(): void {
        this.visible = true;
        this.resetForm();
        setTimeout(() => {
            this.dataEditor = "";
        }, 350);
    }

    close(): void {
        this.resetForm();
        this.visible = false;
        this.content = [];
    }

    onChangeContent(value: string, index: number) {
        this.content[index] = value;
    }

    onChangeTitle() {
        if (this.postForm.controls[`title`].value) {
            let slug = strToSlug(this.postForm.controls[`title`].value);
            this.postForm.controls[`slug`].setValue(slug);
        }
    }
    onChangeEditor(data: any) {
        this.postForm.controls['content'].setValue(data);
    }
    changeFileUpload(data: any, field: string) {
        this.postForm.controls[field].setValue(data);
    }
    onDeleteContent(i: number) {
        this.content.splice(i, 1);
    }
    onChangeCategory(value: any) {
        let item = this.categories.find((x: any) => x.id == value);
        if (item && item?.unCategory) {
            this.isExploit = true;
        } else {
            this.isExploit = false;
        }
    }
    // onChangeCountry(value: any) {
    //     console.log("value country", value);
        
    //     let item = this.countryList.find((x: any) => x.name == value);

    //     // this.postForm.controls['countryName'].setValue(item?.name);

    // }
    confirmDrawer() {
        this.submitted = true;
        if (this.postForm.invalid) return;
        this.isLoading = true;
        let data = {
            ...this.postForm.value,
        };

        let formData = convertToFormDataV2(data, ["image"]);

        if (this.isEdit)
            this.postService.editPost(formData, this.id).subscribe(
                (data) => {
                    this.isLoading = false;
                    this.close();
                    this.onSuccess.emit();
                },
                (error) => {
                    this.isLoading = false;
                }
            );
        else
            this.postService.createPost(formData).subscribe(
                (data) => {
                    this.isLoading = false;
                    this.onSuccess.emit();
                    this.close();
                },
                (error) => {
                    this.isLoading = false;
                }
            );
    }

    resetForm() {
        this.postForm = this.postFormControl();
        this.submitted = false;
        this.state = "Create";
        this.isEdit = false;
        this.image = [];
        this.metaImage = [];
        setTimeout(() => {
            this.dataEditor = "";
        }, 200);
    }
}
