import { Component, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-section-product',
  templateUrl: './section-product.component.html',
  styleUrls: ['./section-product.component.scss']
})
export class SectionProductComponent implements OnInit {
  @Input() data: string;
  @Output() onInput= new EventEmitter<any>();
  @Output() onDelete= new EventEmitter<any>();
  @Output() onEnter= new EventEmitter<any>();
  hGutter = 16;
  vGutter = 8;
  constructor(
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
  }
  onChange(e: any){
    this.onInput.emit(e.target.value)
  }
  clickDelete(){
    this.onDelete.emit()
  }
  enterEvent(event: any) {
    if(event.code=='Enter')
    this.onEnter.emit();
  }
}
