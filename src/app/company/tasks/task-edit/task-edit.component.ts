import { Component, OnInit } from '@angular/core';
import { User, UsersService } from 'src/app/shared/services/users.service';
import { FieldElementsService } from 'src/app/shared/services/field-elements.service';
import { FieldElement } from 'src/app/shared/services/field-elements.service';
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
    public field_elements: DRFCollection<FieldElement>;
    public status_options: Array<string> = ['todo', 'in_developement', 'ready'];
    public task_form: FormGroup = new FormGroup({
        name: new FormControl(),
        field: new FormControl(),
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
        from_element: new FormControl(),
        to_element: new FormControl()
    });
    protected task: Task;
    protected me: User;

    public constructor(
        public fieldsService: FieldsService,
        public taskTypesService: TaskTypesService,
        public profilesService: ProfilesService,
        public fieldElementsService: FieldElementsService,
        public toolsService: ToolsService,
        public tasksService: TasksService,
        protected usersService: UsersService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
        this.task = this.activatedRoute.snapshot.data.task;
        console.log('recieved task --->', this.task);
        for (let form_field in this.task_form.controls) {
            if (this.task[form_field]) {
                this.task_form.controls[form_field].setValue(this.task[form_field]);
            }
        }
    }

    public ngOnInit() {
        console.log('On init');
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
                task_types => this.task_types = task_types
            );
        this.fieldElementsService
            .all()
            .subscribe(
                field_elements => this.field_elements = field_elements
            );
        this.navigationService.actions.next(new SidenavActions(['delete', 'save']));
    }

    public save() {
        this.task = { ...this.task, ...this.task_form.value };
        // this.task.created_by = ;
        // TODO: update task contact data before saving
        console.log('me ----------->', this.me);
        this.task.created_by = this.me;
        console.log(this.task);
        this.tasksService.save(this.task).subscribe(task => {
            console.log('task saved', task);
            this.task = task;
            console.log('this.task', this.task);
        });
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

    public updateForm(key, value) {
        this.task_form.controls[key].setValue(value);
    }

}
