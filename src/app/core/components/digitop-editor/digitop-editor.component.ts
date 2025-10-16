import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';

@Component({
  selector: 'app-digitop-editor',
  templateUrl: './digitop-editor.component.html',
})
export class DigitopEditorComponent implements OnInit {
  editor: any;
  @Output() onChangeData = new EventEmitter();
  @Input() initData: string = '';
  @Input() text: string = '';
  @Input() placeHolder: string;
  // @Output() onChangeEditor = new EventEmitter();
  public config = {
    width: '100%',
    allowedContent: true,
    versionCheck: false,
    toolbar: [
      { name: 'document', groups: ['mode', 'document', 'doctools'], items: ['Source', '-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates'] },
      { name: 'clipboard', groups: ['clipboard', 'undo'], items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
      { name: 'editing', groups: ['find', 'selection', 'spellchecker'], items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
      { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
      '/',
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'], items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'], items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
      { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
      { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe', 'Youtube'] },
      '/',
      { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
      { name: 'colors', items: ['TextColor', 'BGColor'] },
      { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
      { name: 'others', items: ['-'] },
      { name: 'about', items: ['About'] }
    ],
    editorplaceholder: '',
    extraPlugins: 'uploadimage, editorplaceholder,colorbutton',
    filebrowserUploadUrl: `${environment.BASE_URL}admin/filemanagers/single`,
    imageUploadUrl: `${environment.BASE_URL}admin/filemanagers/single`,
    uploadUrl: `${environment.BASE_URL}admin/filemanagers/single`,
    on: {
      fileUploadRequest: (evt: any) => {
        var fileLoader = evt.data.fileLoader;
        var formData = new FormData();
        var xhr = fileLoader.xhr;
        //
        xhr.open('POST', fileLoader.uploadUrl, true);

        xhr.setRequestHeader('Authorization', `Bearer ${this.authService.getTokenUser()}`);
        formData.append('file', fileLoader.file);
        fileLoader.xhr.send(formData);
        evt.stop();
      },
      fileUploadResponse: function (evt: any) {
        // Prevent the default response handler.
        console.log('evt---->', evt);
        evt.stop();
        // Get XHR and response.
        var data = evt.data;
        var xhr = data.fileLoader.xhr;
        var response = xhr.responseText.split('|');
        if (response[1] || !response[0]) {
          // An error occurred during upload.
          data.message = JSON.parse(response[1])['message'][0] || '';
          evt.cancel();
        } else {
          data.url = JSON.parse(response[0])['url'] || '';
        }
      }
    },
  }
  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.config.editorplaceholder = this.placeHolder
  }

  onChange(e: CKEditor4.EventInfo) {
    this.onChangeData.emit(e.editor.getData());
  }

}
