import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demeter-front';

  public constructor() {
      console.log('inside app component CONSTRUCTOR');
  }
}
