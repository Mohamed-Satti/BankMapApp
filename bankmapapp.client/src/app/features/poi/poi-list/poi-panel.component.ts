import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poi-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
      <h3 class="text-lg font-bold text-gray-800 mb-4">Points of Interest</h3>
      <div *ngIf="pois.length === 0" class="text-center text-gray-500">
        No POIs to display.
      </div>
      <ul class="space-y-3">
        <li *ngFor="let poi of pois" class="flex items-center justify-between p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
          <div class="flex-grow">
            <span class="text-sm font-medium text-gray-700">{{ poi.Name }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <!-- Visibility Toggle Icon -->
            <button 
              class="p-2 rounded-full hover:bg-gray-200 transition-colors"
              (click)="toggleVisibility(poi)">
              <svg *ngIf="isPoiVisible(poi)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg *ngIf="!isPoiVisible(poi)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7c.753 0 1.484.14 2.17.411m-1.47 2.108a3 3 0 11-4.243 4.243M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <!-- Edit Icon -->
            <button 
              class="p-2 rounded-full hover:bg-gray-200 transition-colors"
              (click)="editPoi(poi)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
              </svg>
            </button>
            <!-- Delete Icon -->
            <button 
              class="p-2 rounded-full hover:bg-gray-200 transition-colors"
              (click)="deletePoi(poi)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </li>
      </ul>
    </div>
  `,
  styleUrls: [] // No specific styles needed, Tailwind handles it
})
export class PoiListComponent {
  @Input() pois: any[] = [];
  @Input() visiblePois: Set<string> = new Set();
  @Output() toggleVisibilityEvent = new EventEmitter<any>();
  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  isPoiVisible(poi: any): boolean {
    return this.visiblePois.has(poi.Id);
  }

  toggleVisibility(poi: any): void {
    this.toggleVisibilityEvent.emit(poi);
  }

  editPoi(poi: any): void {
    this.editEvent.emit(poi);
  }

  deletePoi(poi: any): void {
    this.deleteEvent.emit(poi);
  }
}




//import { Component } from '@angular/core';
//import { CommonModule } from '@angular/common';

//interface Poi {
//  id: number;
//  name: string;
//  type: string;
//}

//@Component({
//  selector: 'app-poi-panel',
//  standalone: true,
//  imports: [CommonModule],
//  template: `
//    <div class="poi-panel">
//      <h3>Points of Interest</h3>
//      <ul>
//        <li *ngFor="let poi of pois">
//          <strong>{{ poi.name }}</strong> ({{ poi.type }})
//          <button (click)="editPoi(poi.id)">Edit</button>
//          <button (click)="deletePoi(poi.id)">Delete</button>
//        </li>
//      </ul>
//    </div>
//  `,
//  styles: [`
//    .poi-panel {
//      padding: 1rem;
//    }
//    ul {
//      list-style: none;
//      padding: 0;
//    }
//    li {
//      margin-bottom: 0.5rem;
//      border-bottom: 1px solid #ddd;
//      padding-bottom: 0.5rem;
//    }
//    button {
//      margin-left: 0.5rem;
//    }
//  `]
//})
//export class PoiPanelComponent {
//  pois: Poi[] = [
//    { id: 1, name: 'ATM 1', type: 'ATM' },
//    { id: 2, name: 'Branch A', type: 'Branch' },
//    { id: 3, name: 'ATM 2', type: 'ATM' }
//  ];

//  editPoi(id: number) {
//    console.log('Edit POI', id);
//  }

//  deletePoi(id: number) {
//    this.pois = this.pois.filter(p => p.id !== id);
//    console.log('Deleted POI', id);
//  }
//}
