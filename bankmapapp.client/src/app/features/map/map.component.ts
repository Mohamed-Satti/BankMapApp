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
      }
    });

    // Initialize the map
    this.map = new Map({
      target: 'map',
      layers: [
        // base OSM layer
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([35, 39]), // Coordinates for Turkey (approx center)
        zoom: 6.5
      }),
      controls: defaultControls().extend([new FullScreen()])
    });
  }

  /**
   * Toggles the drawing interaction based on the selected type.
   * @param type The geometry type to draw ('Point', 'LineString', or 'Polygon').
   */
  public onDrawTypeChange(type: 'Point' | 'LineString' | 'Polygon'): void {
    // If a drawing interaction is already active, remove it
    if (this.draw) {
      this.map?.removeInteraction(this.draw);
    }

    // Set the current drawing type
    this.currentDrawType = type;

    // Create a new drawing interaction
    this.draw = new Draw({
      source: this.vectorSource,
      type: type
    });

    // Handle the event when drawing is completed
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

      // Call the API service to create the POI
      this.apiService.createPoi(poiData).subscribe({
        next: (response) => {
          console.log('POI created successfully!', response);
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
