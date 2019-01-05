import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() {
      console.log('inside auth component CONSTRUCTOR');
  }

  ngOnInit() {
      console.log('inside auth component ONINIT');
  }

}
