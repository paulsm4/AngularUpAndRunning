import { Component, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';
import { TNodeFlags } from '@angular/core/src/render3/interfaces/node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Stock Market App';

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.message = 'Hello MessageService!';
  }
}
