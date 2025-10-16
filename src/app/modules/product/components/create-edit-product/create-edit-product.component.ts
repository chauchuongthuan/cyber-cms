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
import { IProduct } from "../../model/product.model";
import { ProductService } from "../../services/product.service";
import { countries } from "country-flags-svg";

@Component({
    selector: "app-create-edit-product",
    templateUrl: "./create-edit-product.component.html",
    styleUrls: ["./create-edit-product.component.scss"],
})
export class CreateEditProductComponent implements OnInit {
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
    public productForm!: UntypedFormGroup;
    public visible = false;
    public size: "large" | "default" = "large";
    @Output() onSuccess = new EventEmitter<any>();
    constructor(
        private fb: UntypedFormBuilder,
        private productService: ProductService,
        private msg: NzMessageService
    ) { }

    ngOnInit(): void {
        this.productForm = this.productFormControl();
        setTimeout(() => {
            this.dataEditor = "";
        }, 200);
    }

    productFormControl() {
        this.image = [];
        return this.fb.group({
            image: new FormControl({ value: null, preview: null }, [
                Validators.required,
            ]),
            country: new FormControl(null, []),
            countryName: new FormControl(null, []),
            category: new FormControl("", [Validators.required]),
            rating: new FormControl("", [Validators.required]),
            content: new FormControl([], []),
            title: new FormControl("", []),
            subname: new FormControl("", []),
            info: new FormControl("", []),
            description: new FormControl("", []),
            sortOrder: new FormControl("", [Validators.required]),
            quantity: new FormControl("", [Validators.required]),
            name: new FormControl("", [Validators.required]),
            slug: new FormControl("", [Validators.required]),
            price: new FormControl(0, []),
            sectionTimeline: this.fb.array([]),
            featureTitle: new FormControl("", []),
            featureDescription: new FormControl("", []),
            sectionFeature: this.fb.array([]),
            verified: new FormControl(true, []),

            // sectionWatch: this.fb.array([]),
            // watchTitle: new FormControl("", []),
            // watchVideo: new FormControl("", []),
        });
    }
    get timeline(): FormArray {
        return this.productForm.get("sectionTimeline") as FormArray;
    }
    get features(): FormArray {
        return this.productForm.get("sectionFeature") as FormArray;
    }
    // get watch(): FormArray {
    //     return this.productForm.get("sectionWatch") as FormArray;
    // }
    addSectionTimeline() {
        this.timeline.push(
            this.fb.group({
                image: new FormControl({ value: null, preview: null }, [
                    Validators.required,
                ]),
                title: new FormControl("", [Validators.required]),
                description: new FormControl("", [Validators.required]),
            })
        );
    }
    removeTimeline(index: number) {
        this.timeline.removeAt(index);
    }
    addSectionFeature() {
        this.features.push(
            this.fb.group({
                image: new FormControl({ value: null, preview: null }, [
                    Validators.required,
                ]),
                title: new FormControl("", [Validators.required]),
                description: new FormControl("", [Validators.required]),
            })
        );
    }
    removeFeature(index: number) {
        this.features.removeAt(index);
    }
    // addSectionWatch() {
    //     this.watch.push(
    //         this.fb.group({
    //             image: new FormControl({ value: null, preview: null }, [
    //                 Validators.required,
    //             ]),
    //             title: new FormControl("", [Validators.required]),
    //             description: new FormControl("", [Validators.required]),
    //         })
    //     );
    // }
    // removeWatch(index: number) {
    //     this.watch.removeAt(index);
    // }
    initData(data: IProduct) {
        this.state = "Edit";
        this.id = data.id;
        this.isEdit = true;
        this.content = data.content;
        let item = this.categories.find(
            (x: any) => x.id == data?.category?._id
        );
        if (item && item?.unCategory) {
            this.isExploit = true;
        } else {
            this.isExploit = false;
        }
        this.productForm.controls["sortOrder"].setValue(data?.sortOrder);
        this.productForm.controls["category"].setValue(data.category._id);
        this.productForm.controls["countryName"].setValue(data.countryName);
        this.productForm.controls["country"].setValue(data?.country);
        this.productForm.controls["rating"].setValue(data.rating);
        this.productForm.controls["image"].setValue({
            value: null,
            preview: data.image,
        });
        this.productForm.controls["quantity"].setValue(data?.quantity);
        this.productForm.controls["title"].setValue(data?.title);
        this.productForm.controls["subname"].setValue(data?.subname);
        // this.productForm.controls["info"].setValue(data?.info);
        // this.productForm.controls["description"].setValue(data?.description);
        this.productForm.controls["name"].setValue(data?.name);
        this.productForm.controls["slug"].setValue(data?.slug);
        this.productForm.controls["content"].setValue(data?.content);
        this.productForm.controls["price"].setValue(data?.price);
        this.productForm.controls["verified"].setValue(data?.verified || false);
        this.productForm.controls["featureTitle"].setValue(
            data?.page?.sectionFeature?.featureTitle
        );
        this.productForm.controls["featureDescription"].setValue(
            data?.page?.sectionFeature?.featureDescription
        );

        // this.productForm.controls["watchTitle"].setValue(
        //     data?.page?.sectionWatch?.watchTitle
        // );
        // this.productForm.controls["watchVideo"].setValue(
        //     data?.page?.sectionWatch?.watchVideo
        // );
        setTimeout(() => {
            this.dataEditor = data?.description;
        }, 350);
        if (data.image) this.image = [{ value: null, preview: data.image }];
        else this.image = [];

        data?.page?.sectionTimeline?.map((section: any) => {
            this.timeline.push(
                this.fb.group({
                    image: new FormControl(
                        { value: null, preview: section?.image },
                        [Validators.required]
                    ),
                    title: new FormControl(section?.title, [
                        Validators.required,
                    ]),
                    description: new FormControl(section?.description, [
                        Validators.required,
                    ]),
                })
            );
        });
        data?.page?.sectionFeature?.slide?.map((section: any) => {
            this.features.push(
                this.fb.group({
                    image: new FormControl(
                        { value: null, preview: section?.image },
                        [Validators.required]
                    ),
                    title: new FormControl(section?.title, [
                        Validators.required,
                    ]),
                    description: new FormControl(section?.description, [
                        Validators.required,
                    ]),
                })
            );
        });
        // data?.page?.sectionWatch?.slide?.map((section: any) => {
        //     this.watch.push(
        //         this.fb.group({
        //             image: new FormControl(
        //                 { value: null, preview: section?.image },
        //                 [Validators.required]
        //             ),
        //             title: new FormControl(section?.title, [
        //                 Validators.required,
        //             ]),
        //             description: new FormControl(section?.description, [
        //                 Validators.required,
        //             ]),
        //         })
        //     );
        // });
    }
    changeFileUploadForm(
        data: any,
        type: string,
        index: number,
        field: string
    ) {
        if (type == "timeline") {
            this.timeline.controls[index].get(field)?.setValue(data);
        }
        if (type == "feature") {
            this.features.controls[index].get(field)?.setValue(data);
        }
        // if (type == "watch") {
        //     this.watch.controls[index].get(field)?.setValue(data);
        // }
    }
    // onExpandChange(id: number, checked: boolean): void {
    //   if (checked) {
    //     this.expandSet.add(id);
    //   } else {
    //     this.expandSet.delete(id);
    //   }
    // }
    addContent() {
        setTimeout(() => {
            this.content.push("");
        }, 100);
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

    onChangeTitle(locale: string) {
        if (this.productForm.controls[`name`].value) {
            let slug = strToSlug(this.productForm.controls[`name`].value);
            this.productForm.controls[`slug`].setValue(slug);
        }
    }
    onChangeEditor(data: any) {
        this.productForm.controls['description'].setValue(data);
    }
    onChangeVerified(value: any) {
        this.productForm.controls['verified'].setValue(value);
    }
    changeFileUpload(data: any, field: string) {
        this.productForm.controls[field].setValue(data);
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

    //     // this.productForm.controls['countryName'].setValue(item?.name);

    // }
    confirmDrawer() {
        this.submitted = true;
        if (this.productForm.invalid) return;
        this.isLoading = true;
        if (this.productForm.controls['countryName'].value) {
            let item = this.countryList.find((x: any) => x.name == this.productForm.controls['countryName'].value);
            let flag = item?.flag;
            if (this.productForm.controls['countryName'].value == "Bonaire, Sint Eustatius and Saba") {
                flag = "https://upload.wikimedia.org/wikipedia/commons/1/1e/Flag_of_Bonaire.svg";
            }
            if (this.productForm.controls['countryName'].value == "Bolivia") {
                flag = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Bandera_de_Bolivia_%28Estado%29.svg/1280px-Bandera_de_Bolivia_%28Estado%29.svg.png";
            }
            if (this.productForm.controls['countryName'].value == "Ireland") {
                flag = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/1920px-Flag_of_Ireland.svg.png";
            }
            if (this.productForm.controls['countryName'].value == "Syria") {
                flag = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Syria_%282025-%29.svg/250px-Flag_of_Syria_%282025-%29.svg.png";
            }
            this.productForm.controls['country'].setValue(flag);
        }
        let data = {
            ...this.productForm.value,
            content: this.content,
            page: {
                sectionTimeline: this.productForm?.value?.sectionTimeline,
                sectionFeature: {
                    slide: this.productForm?.value?.sectionFeature,
                    featureTitle: this.productForm?.value?.featureTitle,
                    featureDescription:
                        this.productForm?.value?.featureDescription,
                },
                sectionWatch: {
                    slide: this.productForm?.value?.sectionWatch,
                    watchTitle: this.productForm?.value?.watchTitle,
                    watchVideo: this.productForm?.value?.watchVideo,
                },
            },
        };
        delete data.watchVideo;
        delete data.watchTitle;
        delete data.sectionWatch;

        delete data.featureDescription;
        delete data.featureTitle;
        delete data.sectionFeature;

        delete data.sectionTimeline;
        let formData = convertToFormDataV2(data, ["image"]);

        if (this.isEdit)
            this.productService.editProduct(formData, this.id).subscribe(
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
            this.productService.createProduct(formData).subscribe(
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
        this.productForm = this.productFormControl();
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
