import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Contact, ContactsService } from 'src/app/shared/services/contacts/contacts.service';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

    @Input() public contact: Contact;
    @Output() public contactUpdate: EventEmitter<Contact> = new EventEmitter();

    public constructor(
        public contactsService: ContactsService
    ) { }

    public ngOnInit() {
    }

}
