import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        SharedMaterialModule
    ],
    exports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        SharedMaterialModule
    ]
})
export class SharedModule { }
