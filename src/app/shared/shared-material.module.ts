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
        MatToolbarModule
    ]
})
export class SharedMaterialModule { }
