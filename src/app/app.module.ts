import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WidgetComponent } from './widget/widget.component';
import { ChooseComponent } from './widget/choose/choose.component';

@NgModule({
    declarations: [
        AppComponent,
        WidgetComponent,
        ChooseComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
