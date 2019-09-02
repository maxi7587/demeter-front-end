import { Component, Input, Output, EventEmitter, OnInit, Injector } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-forms.component.html'
})
export class DynamicFormComponent implements OnInit {
    @Input() public service: BasicDRFService;
    // @Input() public formCreatorMethod: () => CustomForm;
    public form: FormGroup;

    public constructor(
        public activatedRoute: ActivatedRoute,
        public injector: Injector
    ) {
        this.service = injector.get<BasicDRFService>(this.activatedRoute.snapshot.data.service);
        console.log('Service --->', this.service);
    }

    public ngOnInit() {
        // this.form = this.formCreatorMethod() || this.service.form;
        this.form = this.service.form;
        console.log('form in form', this.form);
    }
}
