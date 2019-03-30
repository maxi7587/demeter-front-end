import { Component, OnInit } from '@angular/core';
import { FieldsService } from 'src/app/shared/services/fields.service';
import { Tool, ToolsService } from 'src/app/shared/services/tools.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Company } from 'src/app/shared/services/companies.service';

@Component({
  selector: 'app-tools-edit',
  templateUrl: './tools-edit.component.html',
  styleUrls: ['./tools-edit.component.scss']
})
export class ToolsEditComponent extends CompanyTemplateComponent implements OnInit {

    public tool_form: FormGroup = new FormGroup({
        name: new FormControl(),
        code: new FormControl(),
        detail: new FormControl(),
        status: new FormControl(),
        field: new FormControl()
    });
    public status_options: Array<string> = ['available', 'in_use', 'broken'];
    public tool: Tool;

    public constructor(
        public fieldsService: FieldsService,
        protected toolsService: ToolsService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
        this.tool = this.activatedRoute.snapshot.data.tool;
    }

    public ngOnInit() {
        this.navigationService.actions.next(new SidenavActions(['delete', 'save']));
    }

    public save() {
        this.tool = { ...this.tool, ...this.tool_form.value };
        console.log(this.tool);
        this.toolsService.save(this.tool).subscribe(tool => {
            console.log('tool saved', tool);
            this.tool = tool;
            console.log('this.tool', this.tool);
        });
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

    public updateForm(key, value) {
        this.tool_form.controls[key].setValue(value);
    }

}
