import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
	declarations: [],
	imports: [CommonModule],
	exports: [
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		MatIconModule,
		MatTooltipModule,
	],
})
export class MaterialModule {}
