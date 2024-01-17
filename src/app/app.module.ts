import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		ReactiveFormsModule,
		HttpClientModule,
		StoreModule.forRoot(reducers),
		StoreDevtoolsModule.instrument({}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
