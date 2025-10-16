import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-digitop-drawer',
  templateUrl: './digitop-drawer.component.html',
  styleUrls: ['./digitop-drawer.component.scss']
})
export class DigitopDrawerComponent implements OnInit  { 

  @Input() title: string = 'Create';
  @Input() visible = false;
  @Input() size: 'large' | 'default' = 'large';
  @Output() onLeave = new EventEmitter<any>();
  @Output() onConfirm = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    this.onLeave.emit();
  }
  confirmDrawer(){
    this.onConfirm.emit();
  }
}
