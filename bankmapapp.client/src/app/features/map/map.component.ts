//import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
//import { CommonModule } from '@angular/common';

//// OpenLayers imports
//import Map from 'ol/Map';
//import View from 'ol/View';
//import TileLayer from 'ol/layer/Tile';
//import OSM from 'ol/source/OSM';
//import VectorSource from 'ol/source/Vector';
//import VectorLayer from 'ol/layer/Vector';
//import Draw from 'ol/interaction/Draw';
//import GeoJSON from 'ol/format/GeoJSON';
//import { fromLonLat, toLonLat } from 'ol/proj';
//import Overlay from 'ol/Overlay';
//import { click } from 'ol/events/condition';
//import Select from 'ol/interaction/Select';
//import { Style, Fill, Stroke, Circle, Text } from 'ol/style';
//import Feature from 'ol/Feature';
//import { getCenter } from 'ol/extent';

//// Your application services and components
//import { ApiService } from '../../core/services/api.service';
//import { AuthService } from '../../core/services/auth.service';
//import { Router } from '@angular/router';
//import { PoiListComponent } from '../poi/poi-list/poi-panel.component';

//@Component({
//  standalone: true,
//  selector: 'app-map',
//  templateUrl: './map.component.html',
//  styleUrls: ['./map.component.css'],
//  imports: [CommonModule, PoiListComponent]
//})
//export class MapComponent implements OnInit, AfterViewInit {
//  @ViewChild('popup', { static: true }) popupElement!: ElementRef;

//  private map: Map | undefined;
//  private vectorSource: VectorSource = new VectorSource();
//  private draw: Draw | undefined;
//  private poiSource: VectorSource = new VectorSource();
//  private poiLayer: VectorLayer = new VectorLayer({ source: this.poiSource });
//  private popupOverlay: Overlay | undefined;
//  private select: Select | undefined;

//  public currentDrawType: 'Point' | 'LineString' | 'Polygon' | null = null;
//  public selectedPoi: any = null;
//  public popupPosition: [number, number] = [0, 0];

//  public pois: any[] = [];
//  public visiblePoiIds: Set<string> = new Set();

//  public isModalOpen = false;
//  public isEditing = false;
//  public isAdmin = false;

//  public currentPoiId: string | null = null;

//  public poiForm = {
//    name: '',
//    description: '',
//    isPublic: false,
//    geometry: null as any
//  };

//  constructor(
//    private apiService: ApiService,
//    private authService: AuthService,
//    private router: Router
//  ) { }

//  ngOnInit(): void {
//    this.authService.isAdmin().subscribe(isAdmin => this.isAdmin = isAdmin);
//    this.fetchPois();
//  }

//  ngAfterViewInit(): void {
//    this.initializeMap();
//    this.initializeInteractions();
//  }

//  private initializeMap(): void {
//    const drawLayer = new VectorLayer({
//      source: this.vectorSource,
//      style: new Style({
//        stroke: new Stroke({
//          color: 'rgba(255, 0, 0, 0.7)',
//          width: 2,
//        }),
//        fill: new Fill({
//          color: 'rgba(255, 0, 0, 0.2)',
//        }),
//        image: new Circle({
//          radius: 7,
//          fill: new Fill({
//            color: 'rgba(255, 0, 0, 0.7)',
//          }),
//        }),
//      }),
//    });

//    this.map = new Map({
//      target: 'map',
//      layers: [
//        new TileLayer({
//          source: new OSM(),
//        }),
//        this.poiLayer,
//        drawLayer,
//      ],
//      view: new View({
//        center: fromLonLat([32.8597, 39.9334]), // Center on Ankara by default
//        zoom: 12,
//      }),
//    });

//    // Fix for the autoPanAnimation error
//    this.popupOverlay = new Overlay({
//      element: this.popupElement.nativeElement,
//      autoPan: {
//        animation: {
//          duration: 250,
//        },
//      },
//    });
//    this.map.addOverlay(this.popupOverlay);
//  }

//  private initializeInteractions(): void {
//    if (!this.map) return;

//    // Select interaction to handle clicks on POI features
//    this.select = new Select({
//      condition: click,
//      layers: [this.poiLayer]
//    });

//    this.map.addInteraction(this.select);

//    this.select.on('select', (event) => {
//      const feature = event.selected.length ? event.selected[0] : null;
//      if (feature) {
//        this.selectedPoi = feature.getProperties();
//        const geometry = feature.getGeometry();
//        if (geometry) {
//          this.popupOverlay?.setPosition(getCenter(geometry.getExtent()));
//        }
//      } else {
//        this.selectedPoi = null;
//        this.popupOverlay?.setPosition(undefined);
//      }
//    });
//  }

//  private getFeatureStyle(poi: any): Style {
//    const color = poi.Data?.color || 'rgba(0, 150, 255, 0.7)';
//    return new Style({
//      stroke: new Stroke({
//        color: color,
//        width: 2,
//      }),
//      fill: new Fill({
//        color: color.replace('0.7)', '0.2)'),
//      }),
//      image: new Circle({
//        radius: 7,
//        fill: new Fill({
//          color: color,
//        }),
//      }),
//      text: new Text({
//        text: poi.Name,
//        font: '12px sans-serif',
//        fill: new Fill({ color: '#000' }),
//        stroke: new Stroke({ color: '#fff', width: 2 }),
//        offsetY: -15
//      })
//    });
//  }

//  private fetchPois(): void {
//    this.apiService.getPois().subscribe({
//      next: (pois: any[]) => {
//        this.pois = pois;
//        this.visiblePoiIds.clear();
//        this.poiSource.clear();
//        const geojsonFormat = new GeoJSON();

//        // Clear existing features
//        this.poiSource.clear();

//        pois.forEach(poi => {
//          // Read the feature (this will return a single feature as we're looping)
//          const features = geojsonFormat.readFeatures(JSON.stringify(poi.Geometry), {
//            dataProjection: 'EPSG:4326',
//            featureProjection: 'EPSG:3857',
//          });

//          const feature = features[0];

//          // Add a null/undefined check for the feature before setting properties and style
//          if (feature) {
//            feature.setProperties(poi);
//            feature.setStyle(this.getFeatureStyle(poi));
//            this.poiSource.addFeature(feature);
//            this.visiblePoiIds.add(poi.Id);
//          }
//        });
//      },
//      error: (err) => {
//        console.error('Failed to fetch POIs', err);
//      }
//    });
//  }

//  public onDrawTypeChange(type: 'Point' | 'LineString' | 'Polygon'): void {
//    this.currentDrawType = type;
//    if (this.draw) {
//      this.map?.removeInteraction(this.draw);
//    }
//    this.addDrawInteraction(type);
//  }

//  private addDrawInteraction(type: 'Point' | 'LineString' | 'Polygon'): void {
//    this.draw = new Draw({
//      source: this.vectorSource,
//      type: type,
//    });

//    this.draw.on('drawend', (event) => {
//      this.isModalOpen = true;
//      this.isEditing = false;
//      this.poiForm.geometry = event.feature;
//    });

//    this.map?.addInteraction(this.draw);
//  }

//  public onSavePoi(): void {
//    if (!this.poiForm.name || (!this.isEditing && !this.poiForm.geometry)) {
//      return;
//    }

//    const poiData = {
//      Name: this.poiForm.name,
//      Type: this.isEditing ? null : this.poiForm.geometry.getGeometry().getType(),
//      Data: {
//        description: this.poiForm.description,
//        isPublic: this.isAdmin && this.poiForm.isPublic,
//      },
//      Geometry: this.isEditing ? null : new GeoJSON().writeGeometryObject(this.poiForm.geometry.getGeometry(), {
//        dataProjection: 'EPSG:4326',
//        featureProjection: 'EPSG:3857'
//      }),
//    };

//    if (this.isEditing && this.currentPoiId) {
//      this.apiService.updatePoi(this.currentPoiId, poiData).subscribe({
//        next: (response) => {
//          console.log('POI updated successfully!', response);
//          this.fetchPois();
//          this.resetAndCloseModal();
//        },
//        error: (err) => {
//          console.error('Failed to update POI', err);
//        }
//      });
//    } else {
//      this.apiService.createPoi(poiData).subscribe({
//        next: (response) => {
//          console.log('POI created successfully!', response);
//          this.fetchPois();
//          this.resetAndCloseModal();
//        },
//        error: (err) => {
//          console.error('Failed to create POI', err);
//        }
//      });
//    }
//  }

//  public onEditPoi(poi: any): void {
//    this.isModalOpen = true;
//    this.isEditing = true;
//    this.currentPoiId = poi.Id;
//    this.poiForm.name = poi.Name;
//    this.poiForm.description = poi.Data?.description || '';
//    this.poiForm.isPublic = poi.Data?.isPublic || false;
//  }

//  public onDeletePoi(poi: any): void {
//    if (confirm(`Are you sure you want to delete the POI "${poi.Name}"?`)) {
//      this.apiService.deletePoi(poi.Id).subscribe({
//        next: () => {
//          console.log('POI deleted successfully!');
//          this.fetchPois();
//        },
//        error: (err) => {
//          console.error('Failed to delete POI', err);
//        }
//      });
//    }
//  }

//  private resetAndCloseModal(): void {
//    this.isModalOpen = false;
//    this.isEditing = false;
//    this.poiForm = { name: '', description: '', isPublic: false, geometry: null };
//    this.vectorSource.clear();
//  }

//  public onCancelModal(): void {
//    this.resetAndCloseModal();
//    this.vectorSource.clear();
//  }

//  public onToggleVisibility(poi: any): void {
//    const feature = this.poiSource.getFeatureById(poi.Id);
//    if (!feature) return;

//    if (this.visiblePoiIds.has(poi.Id)) {
//      this.visiblePoiIds.delete(poi.Id);
//      feature.setStyle(undefined);
//    } else {
//      this.visiblePoiIds.add(poi.Id);
//      feature.setStyle(this.getFeatureStyle(poi));
//    }
//  }

//  public onClosePopup(): void {
//    this.selectedPoi = null;
//    this.popupOverlay?.setPosition(undefined);
//  }

//  public onLogout(): void {
//    this.authService.logout();
//  }
//}



//22222222222222/////////////////////
//import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
//import { CommonModule } from '@angular/common';

//// OpenLayers imports
//import Map from 'ol/Map';
//import View from 'ol/View';
//import TileLayer from 'ol/layer/Tile';
//import OSM from 'ol/source/OSM';
//import VectorSource from 'ol/source/Vector';
//import VectorLayer from 'ol/layer/Vector';
//import Draw from 'ol/interaction/Draw';
//import GeoJSON from 'ol/format/GeoJSON';
//import { fromLonLat } from 'ol/proj';
//import FullScreen from 'ol/control/FullScreen.js';
//import { defaults as defaultControls } from 'ol/control/defaults.js';

//import { Feature, Overlay } from 'ol';
//import { getCenter } from 'ol/extent';

//// application services
//import { ApiService } from '../../core/services/api.service';
//import { AuthService } from '../../core/services/auth.service';
//import { Router } from '@angular/router';
//import { PoiPanelComponent } from '../poi/poi-list/poi-panel.component';
//import { Geometry } from 'ol/geom';
//import { Select } from 'ol/interaction';
////import Feature from 'ol/Feature';

//@Component({
//  standalone: true,
//  selector: 'app-map',
//  templateUrl: './map.component.html',
//  styleUrls: ['./map.component.css'],
//  imports: [CommonModule, PoiPanelComponent]
//})
//export class MapComponent implements OnInit, AfterViewInit {
//  @ViewChild('popup', { static: true }) popupElement!: ElementRef;

//  private map: Map | undefined; // OpenLayers map instance
//  private vectorSource: VectorSource = new VectorSource(); // Vector source to hold the drawn features
//  private draw: Draw | undefined; // Drawing interaction
//  private poiSource: VectorSource = new VectorSource();
//  private poiLayer: VectorLayer = new VectorLayer({ source: this.poiSource });
//  private popupOverlay: Overlay | undefined;
//  private select: Select | undefined;

//  public currentDrawType: 'Point' | 'LineString' | 'Polygon' | null = null;   // Currently selected drawing type
//  selectedPoi: any = null;
//  popupPosition: [number, number] = [0, 0];

//  public pois: any[] = [];
//  public visiblePoiIds: Set<string> = new Set();

//  public isModalOpen = false;
//  public isEditing = false;
//  public isAdmin = false;

//  public currentPoiId: string | null = null;

//  public poiForm = {
//    name: '',
//    description: '',
//    isPublic: false,
//    geometry: null as any
//  };

//  constructor(
//    private apiService: ApiService,
//    private authService: AuthService,
//    private router: Router
//  ) { }

//  ngOnInit(): void {
//    this.authService.isAdmin().subscribe(isAdmin => this.isAdmin = isAdmin);
//    this.fetchPois();
//  }

//  ngAfterViewInit(): void {
//    this.initializeMap();
//    this.initializeInteractions();
//  }

//  /**
//   * Initializes the OpenLayers map and layers.
//   */
//  private initializeMap(): void {
//    // Create the vector layer for drawn features
//    const vectorLayer = new VectorLayer({
//      source: this.vectorSource,
//      style: {
//        'stroke-color': 'rgba(255, 0, 0, 0.7)',
//        'stroke-width': 2,
//        'fill-color': 'rgba(255, 0, 0, 0.2)',
//        'circle-radius': 7,
//        'circle-fill-color': 'rgba(255, 0, 0, 0.7)',
//      },
//    });

//    this.map = new Map({
//      controls: defaultControls().extend([
//        new FullScreen({
//          source: 'fullscreen',
//        }),
//      ]),
//      target: 'map', // The ID of the HTML element for the map
//      layers: [
//        // Base layer for the map (OpenStreetMap)
//        new TileLayer({
//          source: new OSM(),
//        }),
//        vectorLayer // Layer for drawing POIs
//      ],
//      view: new View({
//        center: fromLonLat([0, 0]), // Initial center of the map
//        zoom: 2, // Initial zoom level
//      }),
//    });
//  }

//  /**
//   * Toggles the drawing interaction based on the selected type.
//   * @param type The geometry type to draw ('Point', 'LineString', or 'Polygon').
//   */
//  public onDrawTypeChange(type: 'Point' | 'LineString' | 'Polygon'): void {
//    this.currentDrawType = type;
//    // Remove any existing drawing interaction before adding a new one
//    if (this.draw) {
//      this.map?.removeInteraction(this.draw);
//    }
//    this.addDrawInteraction(type);
//  }

//  /**
//   * Adds a new drawing interaction to the map.
//   * @param type The geometry type to draw.
//   */
//  private addDrawInteraction(type: 'Point' | 'LineString' | 'Polygon'): void {
//    // Create a new draw interaction
//    this.draw = new Draw({
//      source: this.vectorSource,
//      type: type,
//    });

//    // Add event listener for when the drawing is complete
//    this.draw.on('drawend', (event) => {
//      this.isModalOpen = true;
//      this.isEditing = false;
//      this.poiForm.geometry = event.feature;

//      ////////////
//      // Get the drawn feature
//      //const feature = event.feature;
//      //// Convert the feature to GeoJSON format
//      //const geojsonFormat = new GeoJSON();
//      //const geojsonFeature = geojsonFormat.writeFeatureObject(feature, {
//      //  dataProjection: 'EPSG:4326', // Use WGS84 for GeoJSON
//      //  featureProjection: 'EPSG:3857' // Map projection
//    });

//    this.map?.addInteraction(this.draw);
//  }

//  public onSavePoi(): void {
//    if (!this.poiForm.name || !this.poiForm.geometry) {
//      return;
//    }

//    const geojsonFormat = new GeoJSON();
//    const geometryObject = geojsonFormat.writeGeometryObject(this.poiForm.geometry.getGeometry(), {
//      dataProjection: 'EPSG:4326',
//      featureProjection: 'EPSG:3857'
//    });

//    const poiData = {
//      Name: this.poiForm.name,
//      Type: this.poiForm.geometry.getGeometry().getType(),
//      Data: {
//        description: this.poiForm.description,
//        isPublic: this.isAdmin && this.poiForm.isPublic,
//      },
//      Geometry: geometryObject,
//    };

//    if (this.isEditing && this.currentPoiId) {
//      this.apiService.updatePoi(this.currentPoiId, poiData).subscribe({
//        next: (response) => {
//          console.log('POI updated successfully!', response);
//          this.fetchPois(); // Refresh the map to show changes
//          this.resetAndCloseModal();
//        },
//        error: (err) => {
//          console.error('Failed to update POI', err);
//        }
//      });
//    } else {
//      this.apiService.createPoi(poiData).subscribe({
//        next: (response) => {
//          console.log('POI created successfully!', response);
//          this.fetchPois(); // Refresh the map to show new POI
//          this.resetAndCloseModal();
//        },
//        error: (err) => {
//          console.error('Failed to create POI', err);
//        }
//      });
//    }
//  }
//      // You can add more data here, like a name or description for the POI
//      //const poiData = {
//      //  Name: 'New POI',
//      //  Type: type,
//      //  Data: { description: `This is a new ${type} POI.` },
//      //  Geometry: geojsonFeature.geometry, // Send the GeoJSON object
//      //};
//      //console.log('Sending POI:', poiData); DEBUGGING

//      // Call the API service to create the POI
//      //this.apiService.createPoi(poiData).subscribe({
//      //  next: (response) => {
//      //    console.log('POI created successfully!', response);
//      //    // You could add the returned feature to the map if you want to
//      //    // show it with its new ID from the backend.
//      //  },
//      //  error: (err) => {
//      //    console.error('Failed to create POI', err);
//      //  }
//      //});

//  public onEditPoi(poi: any): void {
//    this.isModalOpen = true;
//    this.isEditing = true;
//    this.currentPoiId = poi.Id;
//    this.poiForm.name = poi.Name;
//    this.poiForm.description = poi.Data?.description || '';
//    this.poiForm.isPublic = poi.Data?.isPublic || false;
//    // the feature is already on the map, no need for geometry
//  }

//  public onDeletePoi(poi: any): void {
//    if (confirm(`Are you sure you want to delete the POI "${poi.Name}"?`)) {
//      this.apiService.deletePoi(poi.Id).subscribe({
//        next: () => {
//          console.log('POI deleted successfully!');
//          this.fetchPois(); // Refresh the map to reflect deletion
//        },
//        error: (err) => {
//          console.error('Failed to delete POI', err);
//        }
//      });
//    }
//  }

//  private resetAndCloseModal(): void {
//    this.isModalOpen = false;
//    this.isEditing = false;
//    this.poiForm = { name: '', description: '', isPublic: false, geometry: null };
//    this.vectorSource.clear();
//  }

//  public onCancelModal(): void {
//    this.resetAndCloseModal();
//    this.vectorSource.clear();
//  }

//  public onToggleVisibility(poi: any): void {
//    const feature = this.poiSource.getFeatureById(poi.Id);
//    if (!feature) return;

//    if (this.visiblePoiIds.has(poi.Id)) {
//      this.visiblePoiIds.delete(poi.Id);
//      feature.setStyle(null); // Set an empty style to hide the feature
//    } else {
//      this.visiblePoiIds.add(poi.Id);
//      feature.setStyle(this.getFeatureStyle(poi)); // Re-apply the style
//    }
//  }

//  public onClosePopup(): void {
//    this.selectedPoi = null;
//    this.popupOverlay?.setPosition(undefined);
//  }

//  public onLogout(): void {
//    this.authService.logout();
//  }

//}
/////////////////222222222222222222////////////////////


//FULLY FUNCTIONING VERSION
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// OpenLayers imports
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Draw from 'ol/interaction/Draw';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import FullScreen from 'ol/control/FullScreen.js';
import { defaults as defaultControls } from 'ol/control/defaults.js';

// application services
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
//import { PoiPanelComponent } from '../poi/poi-list/poi-panel.component';
import { Geometry } from 'ol/geom';
import Feature from 'ol/Feature';

@Component({
  standalone: true,
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [CommonModule]
})
export class MapComponent implements OnInit, AfterViewInit {
  // OpenLayers map instance
  private map: Map | undefined;
  // Vector source to hold the drawn features
  private vectorSource: VectorSource = new VectorSource();
  // Drawing interaction
  private draw: Draw | undefined;
  // Currently selected drawing type
  public currentDrawType: 'Point' | 'LineString' | 'Polygon' | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  /**
   * Initializes the OpenLayers map and layers.
   */
  private initializeMap(): void {
    // Create the vector layer for drawn features
    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: {
        'stroke-color': 'rgba(255, 0, 0, 0.7)',
        'stroke-width': 2,
        'fill-color': 'rgba(255, 0, 0, 0.2)',
        'circle-radius': 7,
        'circle-fill-color': 'rgba(255, 0, 0, 0.7)',
      },
    });

    this.map = new Map({
      controls: defaultControls().extend([
        new FullScreen({
          source: 'fullscreen',
        }),
      ]),
      target: 'map', // The ID of the HTML element for the map
      layers: [
        // Base layer for the map (OpenStreetMap)
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer // Layer for drawing POIs
      ],
      view: new View({
        center: fromLonLat([0, 0]), // Initial center of the map
        zoom: 2, // Initial zoom level
      }),
    });
  }

  /**
   * Toggles the drawing interaction based on the selected type.
   * @param type The geometry type to draw ('Point', 'LineString', or 'Polygon').
   */
  public onDrawTypeChange(type: 'Point' | 'LineString' | 'Polygon'): void {
    this.currentDrawType = type;
    // Remove any existing drawing interaction before adding a new one
    if (this.draw) {
      this.map?.removeInteraction(this.draw);
    }
    this.addDrawInteraction(type);
  }

  /**
   * Adds a new drawing interaction to the map.
   * @param type The geometry type to draw.
   */
  private addDrawInteraction(type: 'Point' | 'LineString' | 'Polygon'): void {
    // Create a new draw interaction
    this.draw = new Draw({
      source: this.vectorSource,
      type: type,
    });

    // Add event listener for when the drawing is complete
    this.draw.on('drawend', (event) => {
      // Get the drawn feature
      const feature = event.feature;
      // Convert the feature to GeoJSON format
      const geojsonFormat = new GeoJSON();
      const geojsonFeature = geojsonFormat.writeFeatureObject(feature, {
        dataProjection: 'EPSG:4326', // Use WGS84 for GeoJSON
        featureProjection: 'EPSG:3857' // Map projection
      });

      // You can add more data here, like a name or description for the POI
      const poiData = {
        Name: 'New POI',
        Type: type,
        Data: { description: `This is a new ${type} POI.` },
        Geometry: geojsonFeature.geometry, // Send the GeoJSON object
      };
      //console.log('Sending POI:', poiData); DEBUGGING

      // Call the API service to create the POI
      this.apiService.createPoi(poiData).subscribe({
        next: (response) => {
          console.log('POI created successfully!', response);
          // You could add the returned feature to the map if you want to
          // show it with its new ID from the backend.
        },
        error: (err) => {
          console.error('Failed to create POI', err);
        }
      });
    });

    // Add the drawing interaction to the map
    this.map?.addInteraction(this.draw);
  }

  /**
   * Handles user logout.
   */
  public onLogout(): void {
    this.authService.logout();
  }
}

//*********8888888******************************/



//--------------111111111111-----------------
///// <reference path="../../app/dashboard-panels/map-panel/map-panel.component.ts" />
//import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
//import Map from 'ol/Map';
//import View from 'ol/View';
//import TileLayer from 'ol/layer/Tile';
//import OSM, { ATTRIBUTION } from 'ol/source/OSM';
//import VectorLayer from 'ol/layer/Vector';
//import VectorSource from 'ol/source/Vector';
//import { Draw, Modify, Select } from 'ol/interaction';
//import { fromLonLat } from 'ol/proj';
//import { defaults as defaultControls, Attribution } from 'ol/control';
//import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style';
//import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
//import { GeometryType } from 'ol/render/webgl/MixedGeometryBatch';


//@Component({
//  selector: 'app-map',
//  standalone: true,
//  imports: [ReactiveFormsModule],
//  templateUrl: './map.component.html',
//  styleUrls: ['./map.component.css']
//})
//export class MapComponent implements OnInit {
//  //@ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
//  //@Input() role: 'admin' | 'user' = 'user'; // role comes from parent (login)

//  map!: Map;
//  vectorSource!: VectorSource;  //  was: vectorSource = new VectorSource();
//  vectorLayer!: VectorLayer<any>;
//  draw!: Draw;
//  modify!: Modify;
//  select!: Select;

//  poiForm: FormGroup;
//  selectedShape: 'Point' | 'LineString' | 'Polygon' = 'Point'; // default shape type

//  constructor(private fb: FormBuilder) {
//    this.poiForm = this.fb.group({
//      name: [''],
//      type: [''],
//      shape: ['Point' as GeometryType]
//    });
//  }

//  ngOnInit(): void {
//    this.vectorSource = new VectorSource();

//    this.vectorLayer = new VectorLayer({
//      source: this.vectorSource,
//      style: new Style({
//        fill: new Fill({ color: 'rgba(255, 255, 255, 0.4)' }), //polygon fill color
//        stroke: new Stroke({ color: '#ff6633', width: 2 }),
//        image: new CircleStyle({
//          radius: 7,
//          fill: new Fill({ color: '#ff6633' }) // point fill color
//        })
//      })
//    });

//    this.map = new Map({
//      target: 'map',
//      layers: [
//        new TileLayer({
//          source: new OSM()
//        }),
//        this.vectorLayer
//      ],
//      view: new View({
//        center: [0,0],
//        zoom: 2
//      }),
//      controls: defaultControls({
//        attribution: false
//      }).extend([
//        new Attribution({
//          collapsible: false,
//          className: 'custom-attribution'
//        })
//      ])
//    });

//    this.modify = new Modify({ source: this.vectorSource });
//    this.map.addInteraction(this.modify);

//    this.select = new Select();
//    this.map.addInteraction(this.select);

//    this.addDrawInteraction('Point'); // default
//  }

//  addDrawInteraction(shapeType: GeometryType) {
//    if (this.draw) this.map.removeInteraction(this.draw);

//    this.draw = new Draw({
//      source: this.vectorSource,
//      type: shapeType
//    });

//    this.draw.on('drawend', (event) => {
//      const feature = event.feature;
//      const { name, type } = this.poiForm.value;
//      feature.setProperties({
//        name,
//        type
//      });
//      console.log('Saved feature:', feature.getProperties());
//    });

//    this.map.addInteraction(this.draw);
//  }

//  onShapeChange(event: any) {
//    this.selectedShape = event.target.value;
//    this.addDrawInteraction(this.selectedShape); //as GeometryType previously
//  }

//  deleteSelected() {
//    this.select.getFeatures().forEach((feature) => {
//      this.vectorSource.removeFeature(feature);
//    });
//    this.select.getFeatures().clear();
//  }
//////------------------11111111----------------


  //v1////////////////////
  //ngOnInit() {
  //  this.map = new Map({
  //    target: this.mapElement.nativeElement,
  //    layers: [
  //      new TileLayer({ source: new OSM() }),
  //      new VectorLayer({ source: this.vectorSource })
  //    ],
  //    view: new View({
  //      center: fromLonLat([32.6,40]),
  //      zoom: 5
  //    }),
  //    controls: defaultControls().extend([
  //      new Attribution({
  //        collapsible: false,
  //        className: 'custom-attribution',
  //      })
  //    ])
  //  });

  //  // Enable drawing for all roles — but restrict data visibility later
  //  this.addDrawInteraction('Polygon');
  //  //this.addDrawInteraction('Point'); // You can also do 'LineString', 'Point'
  //}

  //v1///////////////////
  //addDrawInteraction(type: 'Polygon' | 'LineString' | 'Point') {
  //  this.draw = new Draw({
  //    source: this.vectorSource,
  //    type
  //  });

  //  this.map.addInteraction(this.draw);

  //  this.draw.on('drawend', (event) => {
  //    const feature = event.feature;
  //    feature.set('owner', this.role); // Tag with role/user
  //    console.log('Feature drawn:', feature);
  //  });
  //}
//}

