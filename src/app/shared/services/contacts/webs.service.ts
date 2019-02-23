import { Injectable } from '@angular/core';
import { DRFResource, DRFCollection } from 'src/app/shared/basic-drf.service';
import { SocialMedia } from 'src/app/shared/services/contacts/social-media.service';

@Injectable({
  providedIn: 'root'
})
export class Web extends DRFResource {
    public email: string;
    public web_url: string;
    public social_media: DRFCollection<SocialMedia>;
}
