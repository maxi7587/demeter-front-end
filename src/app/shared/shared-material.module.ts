import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    declarations: [],
    imports: [],
    exports: [
        MatFormFieldModule,
        MatDividerModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatListModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTabsModule
    ]
})
export class SharedMaterialModule { }
