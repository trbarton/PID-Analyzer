import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatTabsModule
} from '@angular/material';
import { StartComponent } from './components/start/start.component';
import { UploadService } from './services/upload.service';

import { AnalysisComponent } from './components/analysis/analysis.component';

@NgModule({
  declarations: [AppComponent, StartComponent, AnalysisComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatListModule,
    MatProgressBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  providers: [UploadService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
