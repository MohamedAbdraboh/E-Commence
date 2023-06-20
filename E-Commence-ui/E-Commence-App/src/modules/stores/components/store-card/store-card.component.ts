import { Component, Input, OnInit } from '@angular/core';
import { Store } from '../../interfaces/Store';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.css'],
})
export class StoreCardComponent implements OnInit {
  @Input() store: Store = {};

  constructor() {}

  ngOnInit() {}
}
