import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core";
import { Observable, Observer } from "rxjs";
import { NzUploadFile } from "ng-zorro-antd/upload";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
    selector: "app-digitop-upload",
    templateUrl: "./digitop-upload.component.html",
    styleUrls: ["./digitop-upload.component.scss"],
})
export class DigitopUploadComponent implements OnInit {
    loading = false;
    @Input() length: number = 1;
    @Input() multiple: boolean = false;
    @Input() isUsingFormArray: boolean = false;
    @Input() fileList: any = [];
    @Input() title: string;
    @Input() deleteActive: boolean = true;
    @Input() disableUpload: boolean = false;
    @Output() changeFile = new EventEmitter<any>();
    previewImage: string = "";
    previewVisible: boolean = false;
    constructor(private msg: NzMessageService) {}

    ngOnInit(): void {}

    beforeUpload = (
        file: NzUploadFile,
        _fileList: NzUploadFile[]
    ): Observable<boolean> =>
        new Observable((observer: Observer<boolean>) => {
            const isJpgOrPng =
                file.type === "image/jpeg" ||
                file.type === "image/png" ||
                file.type === "image/jpeg" ||
                file.type === "xlsx";
            if (!isJpgOrPng) {
                this.msg.error("You can only upload image file!");
                observer.complete();
                return;
            }

            const isLt2M = file.size! / 1024 / 1024 < 10;
            if (!isLt2M) {
                this.msg.error("Image must smaller than 2MB!");
                observer.complete();
                return;
            }
            this.getBase64(file, (img: string) => {
                this.loading = false;
                this.fileList = this.fileList.concat({
                    value: file,
                    preview: img,
                });
                if (this.multiple) {
                    this.changeFile.emit(this.fileList);
                } else if (this.isUsingFormArray) {
                    this.changeFile.emit(
                        this.fileList[1]
                            ? this.fileList[1]
                            : { value: "", preview: "" }
                    );
                } else {
                    this.changeFile.emit(
                        this.fileList[0]
                            ? this.fileList[0]
                            : { value: "", preview: "" }
                    );
                }
            });
        });

    private getBase64(img: any, callback: (img: string) => void): void {
        const reader = new FileReader();
        reader.addEventListener("load", () =>
            callback(reader.result!.toString())
        );
        reader.readAsDataURL(img);
    }

    handlePreview = async (file: NzUploadFile): Promise<void> => {
        if (!file["preview"]) {
            this.getBase64(file, (img: string) => {
                file["preview"] = img;
                this.previewImage = file.url || file["preview"];
                this.previewVisible = true;
            });
        } else {
            this.previewImage = file["preview"];
            this.previewVisible = true;
        }
    };

    remove(index: number) {
        this.fileList.splice(index, 1);
        if (this.multiple) {
            this.changeFile.emit(this.fileList);
        } else
            this.changeFile.emit(
                this.fileList[0]
                    ? this.fileList[0]
                    : { value: "", preview: null }
            );
    }
}
