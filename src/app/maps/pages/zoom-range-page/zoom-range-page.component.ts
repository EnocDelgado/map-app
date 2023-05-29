import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit,OnDestroy {

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 5;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.5, 40);


  ngAfterViewInit(): void {

    // Validation
    if ( !this.divMap ) throw 'HTML element not found!'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      });

      this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  // Listeners to Angular can change zoom Values
  mapListeners() {
    if ( !this.map ) throw 'Map was not init'

    this.map.on('zoom', ( event ) => {
      this.zoom = this.map!.getZoom();
    })

    // zoom no greater than 18
    this.map.on('zoomed', ( event ) => {
      if ( this.map!.getZoom() < 18 ) return;

      this.map!.zoomTo(18);
    })

    // Default Lng and Lat
    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
      const { lng, lat } = this.currentLngLat;

    })
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged( value: string ) {
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom );
  }


}
