import { Component, OnInit } from '@angular/core';
import { Task, TasksService } from 'src/app/shared/services/tasks.service';
import { Profile, ProfilesService } from 'src/app/shared/services/profiles.service';
import { Tool, ToolsService } from 'src/app/shared/services/tools.service';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { Field, FieldsService } from 'src/app/shared/services/fields.service';
import { NavigationService, SidenavActions } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public links = [
        {
            text: 'Staff',
            section: 'profiles',
            icon: 'account_circle'
        },
        {
            text: 'Fields',
            section: 'fields',
            icon: 'wb_sunny'
        },
        {
            text: 'Tasks',
            section: 'tasks',
            icon: 'assignment'
        },
        {
            text: 'Tools',
            section: 'tools',
            icon: 'build'
        }
    ];
    public fields: DRFCollection<Field>;
    public uncompleted_tasks: Array<Task> = [];
    public completed_tasks: Array<Task> = [];
    public profiles: DRFCollection<Profile>;
    public tools: DRFCollection<Tool>;

    public constructor(
        protected router: Router,
        public activatedRoute: ActivatedRoute,
        public fieldsService: FieldsService,
        public profilesService: ProfilesService,
        public tasksService: TasksService,
        public toolsService: ToolsService,
        public navigationService: NavigationService
    ) {
        console.log('inside dashboard component');
        this.navigationService.title = this.activatedRoute.snapshot.data.title;
        this.fieldsService.all()
            .subscribe(
                (fields: DRFCollection<Field>) => this.fields = fields
            );

        this.profilesService.all(
            undefined,
            undefined,
            { pinned: '1' }
        )
            .subscribe(
                (profiles: DRFCollection<Profile>) => this.profiles = profiles
            );

        this.toolsService.all(
            undefined,
            undefined,
            { pinned: '1' }
        )
            .subscribe(
                (tools: DRFCollection<Tool>) => this.tools = tools
            );

        this.tasksService.all()
            .subscribe(
                (tasks: DRFCollection<Task>) => {
                    for (let task of tasks.results) {
                        if (task.status === 'done') {
                            this.completed_tasks.push(task);
                        } else {
                            this.uncompleted_tasks.push(task);
                        }
                    }
                }
            );
    }

    ngOnInit() {
        this.navigationService.actions.next(new SidenavActions());
    }

    public goToSection(section: string) {
        this.router.navigate(['..', section], { relativeTo: this.activatedRoute });
    }

    public goToField(field: Field) {
        this.router.navigate(['..', 'fields', field.id], { relativeTo: this.activatedRoute });
    }

    public goToTask(task: Task) {
        this.router.navigate(['..', 'tasks', task.id], { relativeTo: this.activatedRoute });
    }

    public goToProfile(profile: Profile) {
        this.router.navigate(['..', 'profiles', profile.id], { relativeTo: this.activatedRoute });
    }

    public goToTool(tool: Tool) {
        this.router.navigate(['..', 'tools', tool.id], { relativeTo: this.activatedRoute });
    }

}
