import { Injectable } from '@angular/core';
import { DRFResource } from 'src/app/shared/basic-drf.service';

@Injectable({
  providedIn: 'root'
})
export class Phone extends DRFResource {
    public country_code: number;
    public area_code: number;
    public phone_number: number;
}
