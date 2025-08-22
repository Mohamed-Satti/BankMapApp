import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Draw, Modify, Select } from 'ol/interaction';
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Geometry } from 'ol/geom';
import { GeometryType } from 'ol/render/webgl/MixedGeometryBatch';
import { CommonModule } from '@angular/common';
import { defaults as defaultControls, Attribution } from 'ol/control';

@Component({
  selector: 'app-map-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.css']
})
export class MapPanelComponent implements OnInit {
  map!: Map;
  vectorSource!: VectorSource;
  vectorLayer!: VectorLayer<any>;
  draw!: Draw;
  modify!: Modify;
  select!: Select;

  poiForm: FormGroup;
  selectedShape: string = 'Point';

  constructor(private fb: FormBuilder) {
    this.poiForm = this.fb.group({
      name: [''],
      type: [''],
      shape: ['Point' as GeometryType]
    });
  }

  ngOnInit(): void {
    this.vectorSource = new VectorSource();

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: new Style({
        fill: new Fill({ color: 'rgba(255, 255, 255, 0.2)' }),
        stroke: new Stroke({ color: '#ffcc33', width: 2 }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({ color: '#ffcc33' })
        })
      })
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.vectorLayer
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
      controls: defaultControls({
        attribution: false
      }).extend([
        new Attribution({
          collapsible: false,
          className: 'custom-attribution'
        })
      ])
    });

    this.modify = new Modify({ source: this.vectorSource });
    this.map.addInteraction(this.modify);

    this.select = new Select();
    this.map.addInteraction(this.select);

    this.addDrawInteraction('Point'); // default
  }

  addDrawInteraction(shapeType: GeometryType) {
    if (this.draw) this.map.removeInteraction(this.draw);

    this.draw = new Draw({
      source: this.vectorSource,
      type: shapeType
    });

    this.draw.on('drawend', (event) => {
      const feature = event.feature;
      const { name, type } = this.poiForm.value;
      feature.setProperties({
        name,
        type
      });
      console.log('Saved feature:', feature.getProperties());
    });

    this.map.addInteraction(this.draw);
  }

  onShapeChange(event: any) {
    this.selectedShape = event.target.value as GeometryType;
    this.addDrawInteraction((this.selectedShape as GeometryType));
  }

  deleteSelected() {
    this.select.getFeatures().forEach((feature) => {
      this.vectorSource.removeFeature(feature);
    });
    this.select.getFeatures().clear();
  }
}



///////////////////////////////////////
//import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
//import Map from 'ol/Map';
//import View from 'ol/View';
//import TileLayer from 'ol/layer/Tile';
//import OSM, { ATTRIBUTION } from 'ol/source/OSM';
//import VectorLayer from 'ol/layer/Vector';
//import VectorSource from 'ol/source/Vector';
//import Draw from 'ol/interaction/Draw';
//import { fromLonLat } from 'ol/proj';
//import { defaults as defaultControls, Attribution } from 'ol/control';
//import { CommonModule } from '@angular/common';


//@Component({
//  selector: 'app-map-panel',
//  standalone: true,
//  imports: [CommonModule],
//  //templateUrl: './map.component.html',
//  //styleUrls: ['./map.component.css']
//  template: `<div id="map" class="map"></div>`,
//  styles: [`
//     .map {
//      width: 100%;
//      height: 100%;
//    }
//  `]
//})
//export class MapPanelComponent implements OnInit {
//  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
//  @Input() role: 'admin' | 'user' = 'user'; // role comes from parent (login)

//  map!: Map;
//  vectorSource = new VectorSource();
//  draw!: Draw;

//  ngOnInit() {
//    this.map = new Map({
//      target: this.mapElement.nativeElement,
//      layers: [
//        new TileLayer({ source: new OSM() }),
//        new VectorLayer({ source: this.vectorSource })
//      ],
//      view: new View({
//        center: fromLonLat([32.6, 40]),
//        zoom: 5
//      }),
//      //controls: defaultControls().extend([
//      //  new Attribution({
//      //    collapsible: false,
//      //  })
//      //])
//    });

//    // Enable drawing for all roles — but restrict data visibility later
//    this.addDrawInteraction('Polygon');
//    //this.addDrawInteraction('Point'); // You can also do 'LineString', 'Point'
//  }

//  addDrawInteraction(type: 'Polygon' | 'LineString' | 'Point') {
//    this.draw = new Draw({
//      source: this.vectorSource,
//      type
//    });

//    this.map.addInteraction(this.draw);

//    this.draw.on('drawend', (event) => {
//      const feature = event.feature;
//      feature.set('owner', this.role); // Tag with role/user
//      console.log('Feature drawn:', feature);
//    });
//  }
//}

////////////////////////////////////////////
//import { Component, AfterViewInit } from '@angular/core';
//import { CommonModule } from '@angular/common';
//import Map from 'ol/Map';
//import View from 'ol/View';
//import TileLayer from 'ol/layer/Tile';
//import OSM from 'ol/source/OSM';

//@Component({
//  selector: 'app-map-panel',
//  standalone: true,
//  imports: [CommonModule],
//  template: `<div id="map" class="map"></div>`,
//  styles: [`
//    .map {
//      width: 100%;
//      height: 100%;
//    }
//  `]
//})
//export class MapPanelComponent implements AfterViewInit {
//  map!: Map;

//  ngAfterViewInit(): void {
//    this.map = new Map({
//      target: 'map',
//      layers: [
//        new TileLayer({
//          source: new OSM()
//        })
//      ],
//      view: new View({
//        center: [0, 0],
//        zoom: 2
//      })
//    });
//  }
//}
