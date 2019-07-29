import { NgModule } from '@angular/core';
import {
    DrfCollectionChipsAutocompleteComponent
} from 'src/app/shared/drf-collection-chips-autocomplete/drf-collection-chips-autocomplete.component';
import { MeasureUnitsService } from 'src/app/shared/services/measure-units.service';
import { ContactsService } from 'src/app/shared/services/contacts/contacts.service';
import { ChargesService } from 'src/app/shared/services/charges.service';
import { ContractTypesService } from 'src/app/shared/services/contract-types.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { HttpClientModule } from '@angular/common/http';
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
import { FieldRowsService } from './services/field-rows.service';
import { FieldsService } from './services/fields.service';
import { TasksService } from './services/tasks.service';
import { UsersService } from './services/users.service';
import { DrfCollectionAutocompleteComponent } from './drf-collection-autocomplete/drf-collection-autocomplete.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { AppExpansionPanelComponent } from './app-expansion-panel/app-expansion-panel.component';
import { FlexFormContainerComponent } from './flex-form-container/flex-form-container.component';
import { ActionsPadComponent } from './actions-pad/actions-pad.component';

@NgModule({
    declarations: [
        TableComponent,
        DynamicPipe,
        NavigationComponent,
        AutocompleteComponent,
        ExpandableInputComponent,
        DrfCollectionAutocompleteComponent,
        DrfCollectionChipsAutocompleteComponent,
        ContactFormComponent,
        AppExpansionPanelComponent,
        FlexFormContainerComponent,
        ActionsPadComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        // HttpClientModule,
        AvatarModule,
        TranslateModule,
        SharedMaterialModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        // HttpClientModule,
        SharedMaterialModule,
        AvatarModule,
        TableComponent,
        DynamicPipe,
        NavigationComponent,
        AutocompleteComponent,
        TranslateModule,
        ExpandableInputComponent,
        DrfCollectionAutocompleteComponent,
        DrfCollectionChipsAutocompleteComponent,
        AppExpansionPanelComponent,
        ContactFormComponent,
        FlexFormContainerComponent,
        ActionsPadComponent
    ],
    providers: [
        BasicDRFService,
        CompaniesService,
        RolesService,
        ProfilesService,
        ToolsService,
        TaskTypesService,
        FieldRowsService,
        FieldsService,
        ContractTypesService,
        ChargesService,
        TasksService,
        UsersService,
        MeasureUnitsService,
        ContactsService
    ]
})
export class SharedModule { }
