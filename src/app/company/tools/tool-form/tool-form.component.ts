import { Component, OnInit, Input } from '@angular/core';
import { Field, FieldsService } from 'src/app/shared/services/fields.service';
import { Tool, ToolsService } from 'src/app/shared/services/tools.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Company, CompaniesService } from 'src/app/shared/services/companies.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-tool-form',
    templateUrl: './tool-form.component.html',
    styleUrls: ['./tool-form.component.scss']
})
export class ToolFormComponent implements OnInit {

    @Input() public tool: Tool;
    @Input() public field: Field;

    public tool_form: FormGroup = new FormGroup({
        name: new FormControl(),
        code: new FormControl(),
        detail: new FormControl(),
        status: new FormControl(),
        pinned: new FormControl(),
        field: new FormControl()
    });
    public status_options: Array<string> = ['available', 'in_use', 'broken'];

    public constructor(
        public fieldsService: FieldsService,
        public companiesService: CompaniesService,
        protected toolsService: ToolsService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {}

    public ngOnInit() {
        console.log('tool form --------this.field ---------->', this.field);
        if (!this.tool) {
            this.tool = new Tool();
        }
        this.tool.field = this.tool.field || this.field;
        for (let tool in this.tool_form.controls) {
            if (this.tool[tool]) {
                this.tool_form.controls[tool].setValue(this.tool[tool]);
            }
        }
        this.tool.company = this.companiesService.company;
    }

    public save(): Observable<Tool> {
        console.log('saving tool -------->', this.tool.pinned, this.tool_form.value);
        this.tool = { ...this.tool, ...this.tool_form.value };
        return (<Observable<Tool>>this.toolsService.save(this.tool));
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

    public updateForm(key, value) {
        console.log('key, value', key, value);
        this.tool_form.controls[key].setValue(value);
    }

}
