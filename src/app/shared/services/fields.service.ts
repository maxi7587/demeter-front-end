import { Injectable } from '@angular/core';
import { DRFResource } from 'src/app/shared/basic-drf.service';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Field extends DRFResource {
    public id: string;
    public url: string;
    public name: string;
    public total_area: string;
    public total_area_measure_unit: string;
    public company: {[key: string]: any};
    public manager: {[key: string]: any};
    public contact: {[key: string]: any};
    public details: string;
    public pinned: boolean;
    public type: 'fields';
}

@Injectable({
  providedIn: 'root'
})
export class FieldsService extends CompanyDRFService<Field> {
    public resource = Field;
    protected _type = 'fields';

    public getFieldIdFromURL(parent_url_section = 'fields'): string {
        let splitted_url = location.href.split('/');
        console.log('SPLITTED URL ----------->', splitted_url);
        let fields_url_index = splitted_url.indexOf(parent_url_section);
        if (fields_url_index === -1) {
            return undefined;
        }
        let field_id_index: number = fields_url_index + 1;
        let field_id: string = splitted_url[field_id_index];

        return field_id;
    }
}
