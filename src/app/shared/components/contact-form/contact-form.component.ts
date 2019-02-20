import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Contact, ContactsService } from 'src/app/shared/services/contacts/contacts.service';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

    // 'name', 'address', 'phone', 'web'
    // 'country', 'state', 'city', 'street_name', 'street_number', 'floor', 'department', 'zip', 'details'
    // 'country_code', 'area_code', 'phone_number'
    // 'social_network', 'link'
    // 'email', 'web_url', 'social_media'

    @Input() public contact: Contact;
    @Output() public contactUpdate: EventEmitter<Contact> = new EventEmitter();

    public contact_form: FormGroup = new FormGroup({
        name: new FormControl()
    });
    public address_form: FormGroup = new FormGroup({
        country: new FormControl(),
        state: new FormControl(),
        city: new FormControl(),
        street_name: new FormControl(),
        street_number: new FormControl(),
        floor: new FormControl(),
        department: new FormControl(),
        zip: new FormControl(),
        details: new FormControl()
    });
    public phone_form: FormGroup = new FormGroup({
        country_code: new FormControl(),
        area_code: new FormControl(),
        phone_number: new FormControl()
    });
    public social_media_form: FormGroup = new FormGroup({
        social_network: new FormControl(),
        link: new FormControl()
    });
    public web_form: FormGroup = new FormGroup({
        email: new FormControl(),
        web_url: new FormControl()
    });

    public constructor(
        public contactsService: ContactsService
    ) { }

    public ngOnInit() {
    }

    public submit() {
        let contact = {
            ...this.contact_form.value,
            ...{
                address: this.address_form.value,
                phone: this.phone_form.value,
                web: {
                    ...this.web_form.value,
                    ...{
                        social_media: this.social_media_form.value
                    }
                }
            }
        };
        this.contactUpdate.emit(contact);
    }

}
