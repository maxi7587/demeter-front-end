import { NgModule } from '@angular/core';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { DynamicPipe } from './dynamic-pipe/dynamic-pipe';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
    declarations: [TableComponent, DynamicPipe, NavigationComponent],
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
        SharedMaterialModule,
        TableComponent,
        DynamicPipe,
        NavigationComponent
    ],
    providers: [
        BasicDRFService,
        CompaniesService
    ]
})
export class SharedModule { }
