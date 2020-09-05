const version = 0.1;

module.exports = {
    accessToken : process.env.ACCESSTOKEN,
    // change attribution to yours
    attribution : '©NARWASSCO',
    // change stylefiles URLs to yours
    styles : [
        { title: 'Street', uri: `https://narwassco.github.io/mapbox-stylefiles/street/style.json?version=${version}`,}, 
        { title: 'Satellite', uri: `https://narwassco.github.io/mapbox-stylefiles/satellite/style.json?version=${version}`,},
        { title: 'UN Vector Tile', uri: `https://narwassco.github.io/mapbox-stylefiles/unvt/style.json?version=${version}`,},
    ],
    // change initial location and zoom level to yours
    center: [35.87063, -1.08551],
    zoom: 13,
    // you can put your geojson file for searching functions
    search:{
        url: 'https://narwassco.github.io/vt/meter.geojson',
        target: ['connno', 'serialno'],
        format: (p) => {return `${p.customer}, ${p.connno}, ${p.serialno}, ${p.village}`},
        place_type: ['meter'],
        placeholder: 'Search CONN NO or S/N',
        zoom: 17,
    },
    // please specify layers' name for showing popup with attributes table.
    popup: {
        target: ['meter','flow meter','valve','washout','firehydrant','tank','pipeline'/**,'intake','wtp'*/]
    },
    // please specify your covered area if you have multipul locations to do waterworks
    areaSwitcher: {
        areas : [
            {title: 'Narok',latlng: [35.87063, -1.08551],zoom: 14,}, 
            {title: "Ololulung'a",latlng: [35.65072, -1.0085],zoom: 13}, 
            {title: "Kilgoris",latlng: [34.87533, -1.00278],zoom: 14}, 
            {title: "Suswa",latlng: [36.33078, -1.05307],zoom: 13}
        ]
    },
    // please specify layer name for showing in legend panel.
    legend:{
        targets:{
            'pipeline': 'Pipeline',
            'meter': 'Water Meter',
            'flow meter': 'Flow Meter', 
            'valve': 'Valve', 
            'firehydrant': 'Fire Hydrant', 
            'washout': 'Washout',
            'tank': 'Tank', 
            'wtp': 'WTP', 
            'intake': 'Intake', 
            'parcels': 'Parcels', 
            'village': 'Village', 
            'dma': 'DMA'
        }
    }
}