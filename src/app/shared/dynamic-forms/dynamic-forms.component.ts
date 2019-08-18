import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';

/**
 * Basic Custom Form Field class should be abstract
 */
export class CustomFormField {
    public type: string;
    public classes: string;
    public fx_flex: string;
    public placeholder: string;
    public form_control_name: string;
}

/**
 * Options shown inside a CustomSelect field
 */
class CustomSelectOption {
    public value: any;
    public displayed_value: string;
}

/**
 * Custom Select field
 */
class CustomSelect {
    public select_options: Array<CustomSelectOption>;
}

/**
 * Custom Input field
 */
export class CustomInput extends CustomFormField {
    public input_type: string;
}

/**
 * Custom Form
 */
export class CustomForm {
    public fields: Array<CustomFormField> = [];
}

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {
    @Input() public service: BasicDRFService;
    @Input() public formCreatorMethod: () => CustomForm;
    public form: CustomForm;

    public ngOnInit() {
        this.form = this.formCreatorMethod() || this.service.createForm();
    }
}
