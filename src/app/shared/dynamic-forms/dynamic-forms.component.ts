import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent {
    public service: BasicDRFService;
    public form;
}
