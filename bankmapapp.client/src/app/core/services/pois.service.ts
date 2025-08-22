import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoisService {
  // Use a BehaviorSubject to hold the current list of POIs
  // This allows components to subscribe and get the latest value
  private poisSubject = new BehaviorSubject<any[]>([]);
  public pois$ = this.poisSubject.asObservable();

  constructor(private apiService: ApiService) { }

  fetchPois(): void {
    this.apiService.getPois().subscribe({
      next: (pois: any[]) => {
        // Update the BehaviorSubject with the new list of POIs
        this.poisSubject.next(pois);
      },
      error: (err) => {
        console.error('Failed to fetch POIs', err);
      }
    });
  }
}
