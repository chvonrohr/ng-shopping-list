import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'crop'
})
export class CropPipe implements PipeTransform {

  transform(value: any, limit: number = 5) {

    //console.log(args, 'crop args');


    if (value.length < limit) {
      return value;
    }

    return value.substring(0, limit) + '...';
  }

}
