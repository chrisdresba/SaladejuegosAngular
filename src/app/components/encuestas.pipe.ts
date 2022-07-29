import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encuestas'
})
export class EncuestasPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
