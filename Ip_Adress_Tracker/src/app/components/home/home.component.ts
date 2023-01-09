import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, tap } from 'rxjs';
import { Location } from 'src/app/models/location.model';
import { IpService } from 'src/app/services/ip.service';
import { Map } from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  // location$: Observable<Location> = this.ipService.getLocationInfos();
  location$: Observable<Location> = of({
    ip: '192.47.586.47',
    location: {
      country: 'France',
      region: 'Île-de-France',
      city: 'Paris',
      lat: 48.8566,
      lng: 2.3522,
      postalCode: '75000',
      timezone: 'Europe/Paris',
      geonameId: 2988507,
    },
    isp: 'Free SAS',
  });
  searchForm: FormControl = new FormControl('');
  private map: Map;
  private zoom: number;

  constructor(private readonly ipService: IpService) {}

  ngOnInit(): void {}

  search(): void {
    const ipAddress = this.searchForm.value;
    this.location$ = this.ipService.getLocationInfos(ipAddress);
  }

  receiveMap(map: Map) {
    this.map = map;
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }
}
