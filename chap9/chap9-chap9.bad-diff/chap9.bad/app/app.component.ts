import { Component, OnInit } from '@angular/core';
import { TNodeFlags } from '@angular/core/src/render3/interfaces/node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Stock Market App';

  ngOnInit(): void {}
}
