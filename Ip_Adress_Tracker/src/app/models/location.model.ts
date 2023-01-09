export class Location {
  ip: string;
  isp: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
  };

  constructor(
    ip: string,
    isp: string,
    location: {
      country: string;
      region: string;
      city: string;
      lat: number;
      lng: number;
      postalCode: string;
      timezone: string;
      geonameId: number;
    }
  ) {
    this.ip = ip;
    this.isp = isp;
    this.location = location;
  }

  public static fromJson(json: any): Location {
    return new Location(json.ip, json.isp, {
      country: json.location.country,
      region: json.location.region,
      city: json.location.city,
      lat: json.location.lat,
      lng: json.location.lng,
      postalCode: json.location.postalCode,
      timezone: json.location.timezone,
      geonameId: json.location.geonameId,
    });
  }
}
