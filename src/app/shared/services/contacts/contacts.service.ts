import { Injectable } from '@angular/core';
import { DRFResource, BasicDRFService } from 'src/app/shared/basic-drf.service';
import { Web } from 'src/app/shared/services/contacts/webs.service';
import { Phone } from 'src/app/shared/services/contacts/phones.service';
import { Address } from 'src/app/shared/services/contacts/addresses.service';

export class RawContactData {
    public email: string;
    public country_code: number;
    public area_code: number;
    public phone_number: number;
    public country: string;
    public state: string;
    public city: string;
    public street_name: string;
    public street_number: number;
}

export class Contact extends DRFResource {
    public name: string;
    public address: Address = new Address();
    public phone: Phone = new Phone();
    public web: Web = new Web();

    public updateContactData(
        contact_data: RawContactData
    ) {
        this.address.setAttributes(
            {
                country: contact_data.country,
                state: contact_data.state,
                city: contact_data.city,
                street_name: contact_data.street_name,
                street_number: contact_data.street_number
            }
        );
        this.phone.setAttributes(
            {
                country_code: contact_data.country_code,
                area_code: contact_data.area_code,
                phone_number: contact_data.phone_number
            }
        );
        this.web.setAttributes(
            { email: contact_data.email }
        );

        // this.address = {
        //     ...this.address,
        //     ...{
        //         country: contact_data.country,
        //         state: contact_data.state,
        //         city: contact_data.city,
        //         street_name: contact_data.street_name,
        //         street_number: contact_data.street_number
        //     }
        // };
        // this.phone = {
        //     ...this.phone,
        //     ...{
        //         country_code: contact_data.country_code,
        //         area_code: contact_data.area_code,
        //         phone_number: contact_data.phone_number
        //     }
        // };
        // this.web = {
        //     ...this.web,
        //     ...{ email: contact_data.email }
        // };
    }
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService extends BasicDRFService<Contact> {
    public type = 'contacts';
    public resource = Contact;
}
