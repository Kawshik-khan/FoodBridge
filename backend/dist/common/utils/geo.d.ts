export interface GeoPoint {
    lat: number;
    lng: number;
}
export declare function haversineDistanceKm(a: GeoPoint, b: GeoPoint): number;
