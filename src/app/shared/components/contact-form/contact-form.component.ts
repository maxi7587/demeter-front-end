import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Contact, ContactsService } from 'src/app/shared/services/contacts/contacts.service';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

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
        if (this.contact) {
            this.fillForm();
        }
    }

    public fillForm() {
        let { name: contact_name, address, phone, web: {social_media: social_media, ...web} } = this.contact;
        this.contact_form.controls.name.setValue(contact_name);
        this.address_form.setValue(address);
        this.phone_form.setValue(phone);
        this.web_form.setValue(web);
        // TODO: suppont multiple social media links
        this.social_media_form.setValue(social_media[0]);
        console.log(this.web_form);
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
                        social_media: [this.social_media_form.value]
                    }
                }
            }
        };
        this.contactUpdate.emit(contact);
    }

}
