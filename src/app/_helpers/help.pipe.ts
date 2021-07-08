import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'replaceAll'})
export class HelperPipe implements PipeTransform {
  transform(value: string): string {
    value = value.replace(/ \(.*\)/g, "");
    return value.replace(/ /g, "-");
  }
}

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {
  transform(val:string, params:string):string {
    return val.split(params)[0];
  }
}

/*
@Pipe({
  name: 'chunks'
})
export class ChunksPipe implements PipeTransform {
  transform(arr: any, chunkSize: number) {
    return arr.reduce((prev, cur, index) => (index % chunkSize) ? prev : prev.concat([arr.slice(index, index + chunkSize)]), []);
  }
}

*/
