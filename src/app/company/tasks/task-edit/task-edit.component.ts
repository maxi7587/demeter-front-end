import { Component, OnInit } from '@angular/core';
import { FieldPlotsService } from 'src/app/shared/services/field-plots.service';
import { User, UsersService } from 'src/app/shared/services/users.service';
import { FieldRowsService } from 'src/app/shared/services/field-rows.service';
import { FieldRow } from 'src/app/shared/services/field-rows.service';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { TaskTypesService, TaskType } from 'src/app/shared/services/task-types.service';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { ProfilesService } from 'src/app/shared/services/profiles.service';
import { FieldsService } from 'src/app/shared/services/fields.service';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Task, TasksService } from 'src/app/shared/services/tasks.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent extends CompanyTemplateComponent implements OnInit {
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
    public task: Task;
    public me: User;

    public constructor(
        public fieldsService: FieldsService,
        public taskTypesService: TaskTypesService,
        public profilesService: ProfilesService,
        public fieldPlotsService: FieldPlotsService,
        public fieldRowsService: FieldRowsService,
        public toolsService: ToolsService,
        public tasksService: TasksService,
        protected usersService: UsersService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
        this.task = this.activatedRoute.snapshot.data.task;
        for (let form_field in this.task_form.controls) {
            if (this.task[form_field]) {
                this.task_form.controls[form_field].setValue(this.task[form_field]);
            }
        }
    }

    public ngOnInit() {
        if (!this.task.id || this.task.id === '0') {
            this.navigationService.actions.next(new SidenavActions(['save']));
        }
        this.usersService
            .getUser()
            .subscribe(
                me => this.me = me
            );
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
        this.navigationService.actions.next(new SidenavActions(['delete', 'save']));
    }

    public save() {
        this.task = { ...this.task, ...this.task_form.value };
        // this.task.created_by = ;
        // TODO: update task contact data before saving
        this.task.created_by = this.me;
        this.tasksService.save(this.task).subscribe((task: Task) => {
            this.task = task;
            this.router.navigate(['..'], {relativeTo: this.activatedRoute});
        });
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

    public updateForm(key, value) {
        this.task_form.controls[key].setValue(value);
    }

}
