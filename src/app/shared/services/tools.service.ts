import { Injectable } from '@angular/core';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';
import { Field } from './fields.service';

export class Tool {
    public name: string;
    public code: string;
    public internal_code: string;
    public status: string;
    public field: Field;
}

@Injectable({
  providedIn: 'root'
})
export class ToolsService extends BasicDRFService<Tool> {
    protected _type = 'tools';
}
