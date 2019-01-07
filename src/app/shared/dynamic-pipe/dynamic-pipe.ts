import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dynamic'})
export class DynamicPipe implements PipeTransform {
    public transform(value: string, pipe, arg) {
        if (!pipe) { return value; }

        return new pipe().transform(value, arg);
    }
}
