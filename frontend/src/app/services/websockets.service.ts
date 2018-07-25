import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  host = window.location.host;
  websocket: WebSocket;

  constructor() { }

  connectToServer() {
    this.websocket = new WebSocket('ws://' + this.host + '/api/ws');
  }
}
