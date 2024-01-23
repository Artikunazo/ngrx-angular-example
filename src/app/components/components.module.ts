import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {CustomerFormComponent} from './customer-form/customer-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../material/material.module';

@NgModule({
	declarations: [CustomerListComponent, CustomerFormComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModule,
		HttpClientModule,
	],
	exports: [CustomerListComponent, CustomerFormComponent],
})
export class ComponentsModule {}
