import { Injectable } from '@angular/core';
import { DRFResource } from 'src/app/shared/basic-drf.service';

@Injectable({
  providedIn: 'root'
})
export class SocialMedia extends DRFResource {
    public social_network: string;
    public link: string;
}
