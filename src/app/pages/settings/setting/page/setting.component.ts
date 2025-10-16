import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { convertToFormDataV2 } from 'src/app/shared/helper';
import { SettingService } from '../service/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  formSetting!: UntypedFormGroup;
  hGutter = 16;
  vGutter = 8;
  isLoading: boolean = true;
  submitted: boolean = false;
  BTC_qr: any = [];
  USDT_qr: any = [];
  ERC20_qr: any = [];
  BEP20_qr: any = [];
  ETH_qr: any = [];
  LTC_qr: any = [];
  BCH_qr: any = [];
  constructor(
    private fb: UntypedFormBuilder,
    private settingService: SettingService,
  ) { }

  ngOnInit(): void {

    this.formSetting = this.fb.group({
      email: new FormControl('', [Validators.required]),
      appPass: new FormControl('', [Validators.required]),
      telegramLink: new FormControl('', [Validators.required]),
      // skypeLink: new FormControl('', [Validators.required]),
      telegramPrivateLink: new FormControl('', [Validators.required]),
      whatsappLink: new FormControl('', [Validators.required]),
      whatsappPrivateLink: new FormControl('', [Validators.required]),
      youtubeLink: new FormControl('', [Validators.required]),
      BTC_wallet: new FormControl('', [Validators.required]),
      BTC_qr: new FormControl('', [Validators.required]),
      USDT_wallet: new FormControl('', [Validators.required]),
      USDT_qr: new FormControl('', [Validators.required]),
      ERC20_wallet: new FormControl('', [Validators.required]),
      ERC20_qr: new FormControl('', [Validators.required]),
      ETH_wallet: new FormControl('', [Validators.required]),
      ETH_qr: new FormControl('', [Validators.required]),
      LTC_wallet: new FormControl('', [Validators.required]),
      LTC_qr: new FormControl('', [Validators.required]),
      BCH_qr: new FormControl('', [Validators.required]),
      BCH_wallet: new FormControl('', [Validators.required]),
      BEP20_wallet: new FormControl('', [Validators.required]),
      BEP20_qr: new FormControl('', [Validators.required]),
    });
    this.settingService.getSettingList().subscribe((data: any) => {
      this.isLoading = false;
      data.map((item: any) => {
        if (this.formSetting.controls[item.name])
          if (item.name !== 'BTC_qr' && item.name !== 'USDT_qr' && item.name !== 'ERC20_qr' && item.name !== 'ETH_qr' && item.name !== 'LTC_qr' && item.name !== 'BCH_qr' && item.name !== 'BEP20_qr') 
            this.formSetting.controls[item.name].setValue(item.value)
          else {
            switch (item.name) {
              case 'BTC_qr':
                if (item.value)
                  this.BTC_qr = [{ value: null, preview: item.value }];
                else this.BTC_qr = []
                this.formSetting.controls[item.name].setValue({ value: null, preview: item.value })
                break;
              case 'USDT_qr':
                if (item.value)
                  this.USDT_qr = [{ value: null, preview: item.value }];
                else this.USDT_qr = []
                this.formSetting.controls[item.name].setValue({ value: null, preview: item.value })
                break;
              case 'ERC20_qr':
                if (item.value)
                  this.ERC20_qr = [{ value: null, preview: item.value }];
                else this.ERC20_qr = []
                this.formSetting.controls[item.name].setValue({ value: null, preview: item.value })
                break;
              case 'BEP20_qr':
                if (item.value)
                  this.BEP20_qr = [{ value: null, preview: item.value }];
                else this.BEP20_qr = []
                this.formSetting.controls[item.name].setValue({ value: null, preview: item.value })
                break;
              case 'ETH_qr':
                if (item.value)
                  this.ETH_qr = [{ value: null, preview: item.value }];
                else this.ETH_qr = []
                this.formSetting.controls[item.name].setValue({ value: null, preview: item.value })
                break;
              case 'LTC_qr':
                if (item.value)
                  this.LTC_qr = [{ value: null, preview: item.value }];
                else this.LTC_qr = []
                this.formSetting.controls[item.name].setValue({ value: null, preview: item.value })
                break;
              case 'BCH_qr':
                if (item.value)
                  this.BCH_qr = [{ value: null, preview: item.value }];
                else this.BCH_qr = []
                this.formSetting.controls[item.name].setValue({ value: null, preview: item.value })
                break;
              default: break;
            }
          }
      })
    }, error => {
      this.isLoading = false;
    })
  }

  submitForm(): void {
    this.submitted = true;
    let data = this.formSetting.value;
    if (this.formSetting.invalid) return;
    this.isLoading = true;
    let formData = convertToFormDataV2(data, ['BTC_qr', 'USDT_qr', 'ERC20_qr', 'ETH_qr', 'LTC_qr', 'BCH_qr', 'BEP20_qr'])

    this.settingService.editSetting(formData).subscribe((data: any) => {
      this.isLoading = false;
      this.submitted = false;
    }, error => {
      this.submitted = true;
    })
  }
  changeFileUpload(data: any, field: string) {
    this.formSetting.controls[field].setValue(data);
  }
}
