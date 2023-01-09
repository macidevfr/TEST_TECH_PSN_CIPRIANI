import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from '../../app/models/location.model';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  private resource = 'https://geo.ipify.org/api/v2';

  constructor(private http: HttpClient) {}

  getLocationInfos(ipAddress?: string): Observable<Location> {
    let url = `${this.resource}/country,city?apiKey=${environment.ipify_api_key}`;

    if (ipAddress) {
      const isIpAddress = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(
        ipAddress
      );
      const isDomainName = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}$/.test(
        ipAddress
      );

      if (!isIpAddress && !isDomainName) {
        throw new Error('Invalid IP address or domain name');
      }
      url += `&${isIpAddress ? 'ipAddress' : 'domain'}=${ipAddress}`;
    }

    return this.http.get(url).pipe(map((json) => Location.fromJson(json)));
  }
}
