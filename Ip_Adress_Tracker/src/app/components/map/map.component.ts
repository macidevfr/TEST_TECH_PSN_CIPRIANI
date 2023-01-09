import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  Map,
  MapOptions,
  tileLayer,
  latLng,
  ZoomAnimEvent,
  LeafletEvent,
  marker,
  icon,
} from 'leaflet';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnChanges {
  @Output() map$: EventEmitter<Map> = new EventEmitter();
  @Output() zoom$: EventEmitter<number> = new EventEmitter();
  @Input() location: Location;
  @Input() options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        opacity: 0.7,
        maxZoom: 19,
        detectRetina: true,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
    zoom: 17,
    center: latLng(0, 0),
    zoomControl: false,
  };
  public map: Map;
  public zoom: number;
  layers = [];

  constructor() {}
  ngOnChanges(): void {
    this.options.center = latLng(
      this.location.location.lat,
      this.location.location.lng
    );
    this.layers = [
      marker([this.location.location.lat, this.location.location.lng], {
        icon: icon({
          iconSize: [35, 45],
          iconUrl: 'assets/icon-location.svg',
        }),
      }),
    ];
  }

  ngOnDestroy() {
    this.map.clearAllEventListeners;
    this.map.remove();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
  }

  onMapZoomEnd(e: LeafletEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }
}
