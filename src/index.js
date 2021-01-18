import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import RulerControl from 'mapbox-gl-controls/lib/ruler';
import CompassControl from 'mapbox-gl-controls/lib/compass';
import { MapboxStyleSwitcherControl } from "@watergis/mapbox-gl-style-switcher";
import "@watergis/mapbox-gl-style-switcher/styles.css"
import MapboxPopupControl from '@watergis/mapbox-gl-popup';
import '@watergis/mapbox-gl-popup/css/styles.css';
import MapboxPitchToggleControl from '@watergis/mapbox-gl-pitch-toggle-control';
import '@watergis/mapbox-gl-pitch-toggle-control/css/styles.css';
import MapboxAreaSwitcherControl from '@watergis/mapbox-gl-area-switcher';
import '@watergis/mapbox-gl-area-switcher/css/styles.css';
import MapboxLegendControl from "@watergis/mapbox-gl-legend";
import '@watergis/mapbox-gl-legend/css/styles.css';
import { MapboxExportControl}  from "@watergis/mapbox-gl-export";
import '@watergis/mapbox-gl-export/css/styles.css';
import config from './config';

$(function(){
    mapboxgl.accessToken = config.accessToken;

    const map = new mapboxgl.Map({
        container: 'map',
        style: config.styles[0].uri,
        center: config.center,
        zoom: config.zoom,
        hash:true,
        attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl({showCompass:false}), 'top-right');
    map.addControl(new CompassControl(), 'top-right');
    map.addControl(new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true},trackUserLocation: true}), 'top-right');
    map.addControl(new MapboxPitchToggleControl({minpitchzoom: 19})); 
    MapboxStyleSwitcherControl.DEFAULT_STYLE = config.styles[0].title;
    map.addControl(new MapboxStyleSwitcherControl(config.styles), 'top-right');
    map.addControl(new MapboxAreaSwitcherControl(config.areaSwitcher.areas), 'top-right');
    map.addControl(new RulerControl(), 'top-right');
    map.addControl(new MapboxExportControl(), 'top-right');
    map.addControl(new mapboxgl.ScaleControl({maxWidth: 80, unit: 'metric'}), 'bottom-left');
    map.addControl(new mapboxgl.AttributionControl({compact: true,customAttribution: config.attribution}), 'bottom-right');
    if (config.popup)map.addControl(new MapboxPopupControl(config.popup.target));
    
    if (config.legend){
        const legendCtrl = new MapboxLegendControl(config.legend.targets, config.legend.options);
        map.addControl(legendCtrl, 'bottom-left')
    }

    if (config.search){
        $.getJSON(config.search.url , customerData =>{
            function forwardGeocoder(query) {
                var matchingFeatures = [];
                for (var i = 0; i < customerData.features.length; i++) {
                    var feature = customerData.features[i];
                    config.search.target.forEach(v=>{
                        var target = feature.properties[v];
                        if (!target){
                            return;
                        }
                        // handle queries with different capitalization than the source data by calling toLowerCase()
                        if ((target.toString().toLowerCase().search(query.toString().toLowerCase()) !== -1)) {
                            feature['place_name'] = config.search.format(feature.properties);
                            feature['center'] = feature.geometry.coordinates;
                            feature['place_type'] = config.search.place_type;
                            matchingFeatures.push(feature);
                        }
                    })
                }
                return matchingFeatures;
            }
            map.addControl(
                new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    localGeocoder: forwardGeocoder,
                    localGeocoderOnly:true,
                    zoom: config.search.zoom,
                    placeholder: config.search.placeholder,
                    mapboxgl: mapboxgl,
                }),
                'top-left'
            );
        });
    }
})