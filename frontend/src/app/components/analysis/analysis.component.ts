import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { Router } from '../../../../node_modules/@angular/router';
import { jsonpCallbackContext } from '../../../../node_modules/@angular/common/http/src/module';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {
  host = window.location.host;
  ws;

  loadingMessage = '';

  plot1;
  plot2;

  constructor(private upload: UploadService, private router: Router) {
    this.loadingMessage = this.upload.fileName;
  }

  ngOnInit() {
    if (!this.upload.fileName) {
      this.router.navigate(['start']);
    }
    this.host = '127.0.0.1:8888';
    this.ws = new WebSocket('ws://' + this.host + '/api/ws');
    this.setupListeners();
  }

  setupListeners() {
    this.ws.onopen = ev => {
      console.log(ev);
      // Send start graphing
      if (this.upload.fileName) {
        this.ws.send(
          JSON.stringify({
            message_type: 'start',
            logfile: this.upload.fileName
          })
        );
      }
      console.log(this.ws);
    };
    this.ws.onmessage = ev => {
      console.log(ev);
      const messageData = JSON.parse(ev.data);
      switch (messageData['message_type']) {
        case 'update':
          this.loadingMessage = messageData['message'];
          break;
        case 'finish':
          this.plot1 = 'http://127.0.0.1:8888/plots/' + this.processPlotName(messageData['plot1']);
          this.plot2 = 'http://127.0.0.1:8888/plots/' + this.processPlotName(messageData['plot2']);
          break;
      }
    };
    this.ws.onclose = ev => {
      console.log(ev);
    };
    this.ws.onerror = ev => {
      console.log(ev);
    };
  }

  processPlotName(plotname) {
    const pathArray = plotname.split('/');
    return pathArray[pathArray.length - 1];
  }
}
