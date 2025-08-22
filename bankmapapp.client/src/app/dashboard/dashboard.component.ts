//import { Component } from '@angular/core';

//@Component({
//  selector: 'app-dashboard',
//  imports: [],
//  templateUrl: './dashboard.component.html',
//  styleUrl: './dashboard.component.css'
//})
//export class DashboardComponent {

//}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPanelComponent } from '../dashboard-panels/map-panel/map-panel.component';
import { PoiPanelComponent } from '../dashboard-panels/poi-panel/poi-panel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MapPanelComponent, PoiPanelComponent],
  template: `
    <div class="dashboard">
      <div class="map-section">
        <app-map-panel></app-map-panel>
      </div>
      <div class="poi-section">
        <app-poi-panel></app-poi-panel>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      display: flex;
      height: 100vh;
    }
    .map-section {
      flex: 3; /* 3:1 ratio */
      border-right: 1px solid #ddd;
    }
    .poi-section {
      flex: 1;
      overflow-y: auto;
    }
  `]
})
export class DashboardComponent { }

