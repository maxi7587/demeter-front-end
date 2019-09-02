import { Component, OnInit, Input } from '@angular/core';
import { FieldPlotsService } from 'src/app/shared/services/field-plots.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { Observable } from 'rxjs';
import { User, UsersService } from 'src/app/shared/services/users.service';
import { FieldRowsService } from 'src/app/shared/services/field-rows.service';
import { FieldRow } from 'src/app/shared/services/field-rows.service';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { TaskTypesService, TaskType } from 'src/app/shared/services/task-types.service';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { Profile, ProfilesService } from 'src/app/shared/services/profiles.service';
import { Field, FieldsService } from 'src/app/shared/services/fields.service';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Task, TasksService } from 'src/app/shared/services/tasks.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
    @Input() public task: Task = new Task();
    @Input() public field: Field;
    public task_types: DRFCollection<TaskType>;
    public field_rows: DRFCollection<FieldRow>;
    public status_options: Array<string> = ['todo', 'in_developement', 'ready'];
    public task_form: FormGroup = new FormGroup({
        name: new FormControl(),
        field: new FormControl(),
        field_plot: new FormControl(),
        task_type: new FormControl(),
        priority: new FormControl(),
        duration: new FormControl(),
        status: new FormControl(this.status_options[0]),
        created_by: new FormControl(),
        supervised_by: new FormControl(),
        assigned_worker: new FormControl(),
        details: new FormControl(),
        started_at: new FormControl(),
        finished_at: new FormControl(),
        tool: new FormControl(),
        from_row: new FormControl(),
        to_row: new FormControl()
    });
    // protected me: Profile;

    public constructor(
        public fieldsService: FieldsService,
        public fieldPlotsService: FieldPlotsService,
        public taskTypesService: TaskTypesService,
        public profilesService: ProfilesService,
        public fieldRowsService: FieldRowsService,
        public toolsService: ToolsService,
        public tasksService: TasksService,
        public companiesService: CompaniesService,
        protected usersService: UsersService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {}

    public ngOnInit() {
        console.log('recieved task --->', this.task);
        for (let form_field in this.task_form.controls) {
            if (this.task[form_field]) {
                this.task_form.controls[form_field].setValue(this.task[form_field]);
            }
        }
        this.task.company = this.companiesService.company;

        // IMPORTANT: have to update manually both values because it uses DRFCollectionAutocomplete
        this.task_form.controls.field.setValue(this.task.field || this.field);
        this.task.field = this.task.field || this.field;
        console.log(this.task_form.value);
        // this.usersService
        //     .getUser()
        //     .subscribe(
        //         me => this.me = me
        //     );
        this.taskTypesService
            .all()
            .subscribe(
                (task_types: DRFCollection<TaskType>) => this.task_types = task_types
            );
        this.fieldRowsService
            .all()
            .subscribe(
                field_rows => this.field_rows = field_rows
            );
        // this.navigationService.actions.next(new SidenavActions(['delete', 'save']));
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

    public updateForm(key, value) {
        this.task_form.controls[key].setValue(value);
    }

    public save(): Observable<Task> {
        console.log('task --------------------------------->', this.task_form.value);
        this.task = { ...this.task, ...this.task_form.value };
        // this.task.created_by = ;
        // TODO: update task contact data before saving
        // console.log('me ----------->', this.me);
        // this.task.created_by = this.me;
        return (<Observable<Task>>this.tasksService.save(this.task));
        // .subscribe((task: Task) => {
        //     console.log('task saved', task);
        //     this.task = task;
        //     console.log('this.task', this.task);
        // });
    }

}
