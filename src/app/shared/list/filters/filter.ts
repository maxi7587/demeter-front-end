import { FormGroup, FormControl } from '@angular/forms';

export class FlexClass {
    flex = '';
    layout = '';
    layout_align = '';
    layout_gap = '';

    public setFxFlex = (fx_flex): this => {
        this.flex = fx_flex;

        return this;
    }

    public setFxLayout = (fx_layout): this => {
        this.layout = fx_layout;

        return this;
    }

    public setFfcFxLayoutAlign = (fx_layout_align): this => {
        this.layout_align = fx_layout_align;

        return this;
    }

    public setFfcFxLayoutGap = (fx_layout_gap): this => {
        this.layout_gap = fx_layout_gap;

        return this;
    }
}

type FFCType = 'input'|'select'|'autocomplete'|'title';
type FFCInputType = 'text'|'number'|'email'|'password';

export class FfcSelectOption {
    public constructor(
        public text: string,
        public value: any
    ) {}

    public setText(text): this {
        this.text = text;

        return this;
    }

    public setValue(value): this {
        this.value = value;

        return this;
    }
}

export class FilterFormControl extends FormControl {
    public ffc_type: FFCType = 'input';
    public ffc_input_type: FFCInputType = 'text';
    public ffc_select_options: Array<FfcSelectOption> = [];
    public ffc_placeholder: string;
    public ffc_value: any;
    public ffc_classes: Array<string> = [];
    public ffc_flex: FlexClass = new FlexClass();

    public setFfcType(type: FFCType): this {
        this.ffc_type = type;

        return this;
    }

    public setFfcPlaceholder(placeholder: string): this {
        this.ffc_placeholder = placeholder;

        return this;
    }

    public setFfcValue(value: any): this {
        this.ffc_value = value;

        return this;
    }

    public addFfcSelectOptions(options: Array<any>): this {
        this.ffc_select_options = [...this.ffc_select_options, ...options];

        return this;
    }

    public addFfcClasses(classes: Array<string>): this {
        this.ffc_classes = [...this.ffc_classes, ...classes];

        return this;
    }
}

export class FilterFormGroup extends FormGroup {
    public ffg_classes: Array<string> = [];
    public ffg_flex: FlexClass = new FlexClass();
    public ffg_flex_form_container_classes: Array<string> = [];

    public addFfgClasses(classes: Array<string>): this {
        this.ffg_classes = [...this.ffg_classes, ...classes];

        return this;
    }

    public addFfgFlexFormContainerClasses(classes: Array<string>): this {
        this.ffg_flex_form_container_classes = [...this.ffg_flex_form_container_classes, ...classes];

        return this;
    }
}
