import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
  // encapsulation: ViewEncapsulation.Native
})
export class AppComponent {
  title = 'Stock Market App';
}
