import { Injectable } from '@angular/core';
import { ResponsiveAction } from 'src/app/shared/app-responsive-actions/responsive-actions-elements/responsive-action';
import { DRFResource } from 'src/app/shared/basic-drf.service';
import { Company } from 'src/app/shared/services/companies.service';
import { Field } from 'src/app/shared/services/fields.service';
import { MeasureUnit } from 'src/app/shared/services/measure-units.service';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class FieldPlot extends DRFResource {
    public id: string;
    public url: string;
    public code: string;
    public label: string;
    public status: 'active'|'inactive';
    public area: number;
    public area_measure_unit: MeasureUnit;
    public field_rows_qty: number;
    public field_rows_distance: number;
    public field_rows_distance_measure_unit: MeasureUnit;
    public plants_distance: number;
    public plants_distance_measure_unit: MeasureUnit;
    public plantation_year: number;
    public plants_origin: string;
    public graft: string;
    public foot: string;
    public anit_hail_net: boolean;
    public irrigation: string;
    public conduction_system: string;
    public field: Field;
    public company: Company;
    public details: string;
    public type: 'field_plots';
}

@Injectable({
  providedIn: 'root'
})
export class FieldPlotsService extends CompanyDRFService<FieldPlot> {
    public static actions_model: Array<ResponsiveAction> = [
        new ResponsiveAction('createElement', 'add', 'New field plot')
    ];
    public resource = FieldPlot;
    protected _type = 'field_plots';
}
