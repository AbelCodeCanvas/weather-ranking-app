import { OpenMeteoClient } from '../clients/OpenMeteoClient';
import { Coordinates } from '../types';

export class GeocodingService {
  static async getCoordinates(city: string): Promise<Coordinates> {
    return OpenMeteoClient.searchLocation(city);
  }
}
