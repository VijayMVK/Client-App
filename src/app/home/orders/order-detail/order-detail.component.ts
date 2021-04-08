import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  @Input('currentOrder') row: {};
  constructor() { }

  ngOnInit(): void {
    console.log(this.row);
  }

}
