import { Injectable } from '@angular/core';
import { DRFResource, BasicDRFService } from 'src/app/shared/basic-drf.service';
import { Web } from 'src/app/shared/services/contacts/webs.service';
import { Phone } from 'src/app/shared/services/contacts/phones.service';
import { Address } from 'src/app/shared/services/contacts/addresses.service';

export class Contact extends DRFResource {
    public name: string;
    public address: Address = new Address();
    public phone: Phone = new Phone();
    public web: Web = new Web();
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService extends BasicDRFService<Contact> {
    public type = 'contacts';
}
