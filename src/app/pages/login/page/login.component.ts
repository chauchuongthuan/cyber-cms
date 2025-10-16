import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private loginService: LoginService,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    this.loginService.login(this.validateForm.value).subscribe((data: any) => {
      if (data.status) {
        this.router.navigate(['/admin']);
      }
    },(error)=>{
      this.notification.create('error','Thất bại', 'Tài khoản hoặc mật khẩu không chính xác')
    })
  }
}
