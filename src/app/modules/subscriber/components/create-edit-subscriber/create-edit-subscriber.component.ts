import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SubscriberService } from '../../services/subscriber.service';
import { ISubscriber } from '../../model/subscriber.model';

@Component({
  selector: 'app-create-edit-subscriber',
  templateUrl: './create-edit-subscriber.component.html',
  styleUrls: ['./create-edit-subscriber.component.scss']
})
export class CreateEditSubscriberComponent implements OnInit {
  isLoading = false;
  loading = false;
  submitted: boolean = false;
  avatarUrl?: string = '';
  hGutter = 16;
  vGutter = 8;
  isEdit: boolean = false;
  idEdit: string = "";
  messageFile: any = [];
  public subscriberForm!: UntypedFormGroup;
  public state = 'Tạo mới';
  public visible = false;
  public size: 'large' | 'default' = 'default';

  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private subscriberService: SubscriberService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.subscriberForm = this.formControl();
    // this.getSubscriber();
  }

  formControl() {
    return this.fb.group({
      title: new FormControl('', [Validators.required,]),
      reason: new FormControl('', [Validators.required,]),
      message: new FormControl('', [Validators.required,]),
    });
  }

  dataInit(data: ISubscriber, action: boolean) {
    this.isEdit = action;
    this.state = 'Chỉnh sửa';
    this.subscriberForm = this.fb.group({
      title: new FormControl(data.title, [Validators.required,]),
      reason: new FormControl(data.reason, [Validators.required,]),
      message: new FormControl(data.message, [Validators.required,]),
    });
    this.idEdit = data.id;
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

  confirmDrawer() {
    this.submitted = true;
    if (this.subscriberForm.invalid) return;
    this.isLoading = true;
    let data = {
      email: this.subscriberForm.controls['email'].value,
    };
    if (!this.isEdit) {
      this.subscriberService.createSubscriber(data).subscribe((data) => {
        if (data) {
          this.isLoading = false;
          this.onSuccess.emit()
          this.subscriberForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error) => {
        this.isLoading = false;
      })
    }
    else {
      this.subscriberService.editSubscriber(data, this.idEdit).subscribe((data) => {
        if (data) {
          this.isLoading = false;
          this.onSuccess.emit()
          this.subscriberForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error) => {
        this.isLoading = false;
      })
    }
  }

  resetForm() {
    this.subscriberForm = this.formControl();
    this.submitted = false;
    this.state = 'Tạo mới';
    this.isEdit = false
  }

}
