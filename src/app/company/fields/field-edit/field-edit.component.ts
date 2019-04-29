import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolDialogComponent } from 'src/app/company/tools/tool-dialog/tool-dialog.component';
import { ProfilesComponent } from 'src/app/company/profiles/profiles.component';
import { ToolsComponent } from 'src/app/company/tools/tools.component';
import { FieldPlotsComponent } from 'src/app/company/field-plots/field-plots.component';
import { TasksComponent } from 'src/app/company/tasks/tasks.component';
import { TaskDialogComponent } from 'src/app/company/tasks/task-dialog/task-dialog.component';
import { TaskFullfilmentDialogComponent } from 'src/app/company/tasks/task-fullfilment-dialog/task-fullfilment-dialog.component';
import { Tool } from 'src/app/shared/services/tools.service';
import { Task } from 'src/app/shared/services/tasks.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { ContactFormComponent } from 'src/app/shared/components/contact-form/contact-form.component';
import { Contact } from 'src/app/shared/services/contacts/contacts.service';
import { ProfilesService } from 'src/app/shared/services/profiles.service';
import { MeasureUnit, MeasureUnitsService } from 'src/app/shared/services/measure-units.service';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Field, FieldsService } from 'src/app/shared/services/fields.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

@Component({
    selector: 'app-field-edit',
    templateUrl: './field-edit.component.html',
    styleUrls: ['./field-edit.component.scss']
})
export class FieldEditComponent extends CompanyTemplateComponent implements OnInit {
    @ViewChild('contactForm') public contact_form: ContactFormComponent;
    @ViewChild('fieldPlots') public fieldPlotsComponent: FieldPlotsComponent;
    @ViewChild('tasks') public tasksComponent: TasksComponent;
    @ViewChild('tools') public toolsComponent: ToolsComponent;
    @ViewChild('profiles') public profilesComponent: ProfilesComponent;
    @ViewChild('tabGroup') public tabGroup: MatTabGroup;

    public field_plots_route: string;
    public measure_units: DRFCollection<MeasureUnit>;

    public field_form: FormGroup = new FormGroup({
        name: new FormControl(),
        active: new FormControl(true),
        manager: new FormControl(),
        total_area: new FormControl(),
        total_area_measure_unit: new FormControl(),
        pinned: new FormControl(),
        details: new FormControl()
    });
    public field: Field;

    public tab_index = {
        0: 'field',
        1: 'field_plots',
        2: 'tasks',
        3: 'tools',
        4: 'profiles'
    };

    public constructor(
        public profilesService: ProfilesService,
        public fieldsService: FieldsService,
        public companiesService: CompaniesService,
        public dialog: MatDialog,
        protected measureUnitsService: MeasureUnitsService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
        this.field = this.activatedRoute.snapshot.data.field;
        for (let form_field in this.field_form.controls) {
            if (this.field.hasOwnProperty(form_field)) {
                this.field_form.controls[form_field].setValue(this.field[form_field]);
            }
        }
    }

    public ngOnInit() {
        this.field_plots_route = `fields/${this.field.id}/field_plots`;
        if (!this.field.id || this.field.id === '0') {
            this.navigationService.actions.next(new SidenavActions(['save', 'cancel']));
        } else {
            this.navigationService.actions.next(new SidenavActions(['cancel', 'delete', 'save']));
        }

        this.measureUnitsService
            .all(undefined, undefined, { quantity_type: 'area' })
            .subscribe(
                measure_units => this.measure_units = measure_units
            );
    }

    public selectedTabChange(tab: MatTabChangeEvent) {
        console.log('tab changed -------------->', tab);
        let selected_tab = this.tab_index[tab.index];
        console.log('tab index changed -------------->', selected_tab);

        switch (selected_tab) {
            case 'field':
                if (!this.field.id || this.field.id === '0') {
                    this.navigationService.actions.next(new SidenavActions(['save', 'cancel']));
                } else {
                    this.navigationService.actions.next(new SidenavActions(['cancel', 'delete', 'save']));
                }
                break;
            case 'field_plots':
            case 'tasks':
            case 'tools':
            case 'profiles':
                this.navigationService.actions.next(new SidenavActions(['search', 'add']));
                break;
        }
    }

    public updateForm(key, value) {
        console.log('key --->', key);
        console.log('value --->', value);
        this.field_form.controls[key].setValue(value);
        console.log(this.field_form.value);
    }

    public add() {
        console.log(this.tabGroup.selectedIndex);
        let selected_tab = this.tab_index[this.tabGroup.selectedIndex];

        switch (selected_tab) {
            case 'field_plots':
                this.fieldPlotsComponent.showFieldPlotsDialog();
                break;
            case 'tasks':
                this.tasksComponent.createTaskDialog();
                break;
            case 'tools':
                this.toolsComponent.createToolDialog();
                break;
            case 'profiles':
                this.profilesComponent.showProfileDialog();
                break;
        }
    }

    public search(filter: string) {
        console.log('inside search method: ', filter);
        let selected_tab = this.tab_index[this.tabGroup.selectedIndex];

        switch (selected_tab) {
            case 'field_plots':
                let field_plots_filter = {
                    ...this.fieldPlotsComponent.filters_form.value,
                    ...{ label: filter }
                };
                this.fieldPlotsComponent.getList(
                    this.fieldPlotsComponent.route,
                    field_plots_filter
                );
                break;
            case 'tasks':
                let tasks_filter = {
                    ...this.tasksComponent.filters_form.value,
                    ...{ name: filter }
                };
                console.log('this.tasksComponent.filters_form.value --->', this.tasksComponent.filters_form.value);
                console.log('filter --->', filter);
                console.log('tasks_filter --->', tasks_filter);
                this.tasksComponent.getList(tasks_filter);
                break;
            case 'tools':
                let tools_filter = {
                    ...this.toolsComponent.filters_form.value,
                    ...{ name: filter }
                };
                this.toolsComponent.getList(tools_filter);
                break;
            case 'profiles':
                let profiles_filter = {name: filter};
                this.profilesComponent.getList(profiles_filter);
                break;
        }
    }

    public save() {
        this.contact_form.submit();
        this.field = { ...this.field, ...this.field_form.value };
        // TODO: update field contact data before saving
        console.log(this.field);
        this.fieldsService.save(this.field).subscribe((field: Field) => {
            console.log('field saved', field);
            this.field = field;
            this.router.navigate(['..'], { relativeTo: this.activatedRoute });
            console.log('this.field', this.field);
        });
    }

    public updateContact(contact: Contact) {
        this.field.contact = contact;
        console.log('updated field contact data?', this.field);
    }

    public goToTask(task: Task) {
        console.log('inside go to task');
        const dialogRef = this.dialog.open(TaskFullfilmentDialogComponent, {
            width: '600px',
            data: { task: task }
        });

        return;

        console.log(`will navigate to --->../../tasks/${task.id}`);
        this.router.navigate([`../../tasks/${task.id}`], { relativeTo: this.activatedRoute });
    }

    public goToTool(tool: Tool) {
        const dialogRef = this.dialog.open(ToolDialogComponent, {
            width: '600px',
            data: { tool: tool }
        });

        return;

        console.log(`will navigate to --->../../tools/${tool.id}`);
        this.router.navigate([`../../tools/${tool.id}`], { relativeTo: this.activatedRoute });
    }

    public cancel() {
        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    }
    //
    // public createTaskDialog(): void {
    //     console.log('should open field plot dialog');
    //     const dialogRef = this.dialog.open(TaskDialogComponent, {
    //         width: '720px',
    //         data: { field: this.field }
    //     });
    //
    //     dialogRef.afterClosed()
    //         .subscribe(result => {
    //             if (result) {
    //                 console.log('The dialog was closed', result);
    //                 this.tasksComponent.getList(this.tasksComponent.filters_form.value);
    //             }
    //         }
    //     );
    // }

}
