import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtil {
 public formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  // Add other date utilities as needed
}