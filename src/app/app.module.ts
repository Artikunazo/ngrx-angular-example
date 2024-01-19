import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {StoreModule} from '@ngrx/store';
import {effects, reducers} from './store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';

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
		EffectsModule.forRoot(effects),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
