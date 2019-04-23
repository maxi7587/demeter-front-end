import { Injectable } from '@angular/core';
import { DRFResource } from 'src/app/shared/basic-drf.service';

export class Address extends DRFResource {
    public country: string;
    public state: string;
    public city: string;
    public street_name: string;
    public street_number: number;
    public floor: number;
    public department: string;
    public zip: string;
    public details: string;
}
