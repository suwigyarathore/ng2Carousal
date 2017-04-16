import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { CarouselComponent } from './carousel/crousel.component';
import { ImageComponent } from './image/image.component';
import { AppComponent } from './app.component';

@NgModule({
  entryComponents: [
   ImageComponent
  ],
  declarations: [
    CarouselComponent,
    ImageComponent,
    AppComponent,
    CarouselComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
