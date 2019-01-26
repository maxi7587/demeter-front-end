import { NgModule } from '@angular/core';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { DynamicPipe } from './dynamic-pipe/dynamic-pipe';
import { NavigationComponent } from './navigation/navigation.component';
import { AvatarModule } from 'ngx-avatar';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ExpandableInputComponent } from './expandable-input/expandable-input.component';
import { RolesService } from './services/roles.service';
import { ProfilesService } from './services/profiles.service';
import { ToolsService } from './services/tools.service';
import { TaskTypesService } from './services/task-types.service';
import { FieldElementsService } from './services/field-elements.service';
import { FieldsService } from './services/fields.service';
import { TasksService } from './services/tasks.service';
import { UsersService } from './services/users.service';

@NgModule({
    declarations: [TableComponent, DynamicPipe, NavigationComponent, AutocompleteComponent, ExpandableInputComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        HttpClientModule,
        AvatarModule,
        SharedMaterialModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        HttpClientModule,
        SharedMaterialModule,
        TableComponent,
        DynamicPipe,
        NavigationComponent,
        AutocompleteComponent,
        ExpandableInputComponent
    ],
    providers: [
        BasicDRFService,
        CompaniesService,
        RolesService,
        ProfilesService,
        ToolsService,
        TaskTypesService,
        FieldElementsService,
        FieldsService,
        TasksService,
        UsersService
    ]
})
export class SharedModule { }
