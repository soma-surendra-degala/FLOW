import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'fileUrl',
  standalone: true, // ✅ important so it can be imported in standalone components
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(file: File | string): SafeResourceUrl {
    if (file instanceof File) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(file)
      );
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(file);
  }
}
