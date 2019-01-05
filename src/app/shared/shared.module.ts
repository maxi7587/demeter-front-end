import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        HttpClientModule,
        SharedMaterialModule
    ],
    exports: [
        ReactiveFormsModule,
        FlexLayoutModule,
        HttpClientModule,
        SharedMaterialModule
    ]
})
export class SharedModule { }
