import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  loading = false;
  @Input() length: number = 1;
  @Input() multiple: boolean = false;
  @Input() fileList: any = [];
  @Input() title: string;
  @Output() changeFile = new EventEmitter<any>();
  previewImage: string = '';
  previewVisible: boolean = false;
  constructor(
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      // const isLt2M = file.size ? file.size / 1024 / 1024 < 100 : false;
      // if (!isLt2M) {
      //   this.msg.error('Image must smaller than 2MB!');
      //   observer.complete();
      //   return;
      // }
      observer.complete();

      this.getBase64(file, (img: string) => {
        this.loading = false;
        this.fileList = this.fileList.concat({value: file, preview: img})
        if(this.multiple){
          this.changeFile.emit(this.fileList);
        }else this.changeFile.emit(this.fileList[0] ? this.fileList[0] : { value: null, preview: null })
      });
    });

  private getBase64(img: any, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file['preview']) {
      this.getBase64(file, (img: string) => {
        file['preview'] = img;
        this.previewImage = file.url || file['preview'];
        this.previewVisible = true;
      });
    }else{
      this.previewImage = file['preview'];
        this.previewVisible = true;
    }
  };

  remove(index: number){
    this.fileList.splice(index, 1);
    if(this.multiple){
      this.changeFile.emit(this.fileList);
    }else this.changeFile.emit(this.fileList[0] ? this.fileList[0] : { value: null, preview: null })
  }
}
