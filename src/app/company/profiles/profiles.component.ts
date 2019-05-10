import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ProfileDialogComponent } from 'src/app/company/profiles/profile-dialog/profile-dialog.component';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfilesService, Profile } from 'src/app/shared/services/profiles.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';
import { Field } from 'src/app/shared/services/fields.service';
import { Task } from 'src/app/shared/services/tasks.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-profiles',
    templateUrl: './profiles.component.html',
    styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent extends CompanyTemplateComponent implements OnInit, AfterViewInit {
    @Input() public field: Field;
    @Input() public showActions = true;
    @Input() public tableClasses: Array<string>;
    @Input() public filter: {[key: string]: string};
    @Input() public overrideRowClick: boolean;
    @Input() public showInDialog: boolean;
    @Output() public rowClick: EventEmitter<Task> = new EventEmitter();
    // @Input() public overrideCreate: boolean;
    // @Output() public createButton: EventEmitter<Task> = new EventEmitter();
    @Input() public createFromDialog: boolean;

    @ViewChild('nameTemplate') public name_template: TemplateRef<any>;

    private _profiles: {[key: string]: any} = {};
    set profiles(profiles: {[key: string]: any}) { this._profiles = profiles; }
    get profiles(): {[key: string]: any} { return this._profiles; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(
        public matDialog: MatDialog,
        private profilesService: ProfilesService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
    }

    public ngOnInit() {
        this.getList(this.filter);
    }

    public ngAfterViewInit() {
        // TODO: improve for mobile
        // this.columns.push(new Column('first_name', 'first_name', 'first_name').setTemplate(this.name_template));
        this.columns.push(new Column('first_name', 'first_name').setTemplate(this.name_template));
        this.columns.push(new Column('charge.name', 'charge', '', ''));
        this.columns.push(new Column('role.name', 'role', '', '', 'end center'));
    }

    public goToElement(element: Profile) {
        if (this.showInDialog) {
            this.showProfileDialog(element);

            return;
        }
        this.router.navigate([this.router.url, element.id]);
    }

    public getList(filter) {
        this.profilesService.all(undefined, undefined, filter).subscribe(profiles => {
            console.log('profiles ------------------->', profiles);
            this.profiles = profiles;
            // TODO: uncomment following for loop for desktop
            // for (let key of Object.keys(profiles.results[0])) {
            //     if (['id', 'url'].indexOf(key) === -1) {
            //         this.columns.push(new Column(key, key));
            //     }
            // }
        });
    }

    // public add() {
    //     console.log('--------------------------');
    //     console.log('inside profiles add method');
    //     console.log('--------------------------');
    //     this.createElement();
    // }

    public createElement() {
        console.log('--------------------------');
        console.log('inside profiles createElement method');
        console.log('--------------------------');
        if (this.createFromDialog) {
            this.showProfileDialog();

            return;
        }
        this.router.navigate([this.router.url, '0']);
    }

    public showProfileDialog(profile?: Profile): void {
        let dialog_data: {profile: Profile; field: Field} = {
            profile: profile ? profile : new Profile(),
            field: this.field
        };
        console.log('should open profiles dialog');
        const dialogRef = this.matDialog.open(ProfileDialogComponent, {
            width: '720px',
            data: dialog_data
        });

        dialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    console.log('The dialog was closed', result);
                    this.getList(this.filter);
                }
            }
        );
    }

}
