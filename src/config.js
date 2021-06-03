const version = 0.1;

module.exports = {
    accessToken : process.env.ACCESSTOKEN,
    // change attribution to yours
    attribution : '©NARWASSCO',
    // change stylefiles URLs to yours
    styles : [
        { title: 'UN Vector Tile', uri: `https://narwassco.github.io/mapbox-stylefiles/unvt/style.json?version=${version}`,},
        { title: 'Street', uri: `https://narwassco.github.io/mapbox-stylefiles/street/style.json?version=${version}`,}, 
        { title: 'Satellite', uri: `https://narwassco.github.io/mapbox-stylefiles/satellite/style.json?version=${version}`,},
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
            'pipeline_annotation': 'Pipeline Label', 
            'meter': 'Water Meter',
            'flow meter': 'Flow Meter', 
            'valve': 'Valve', 
            'firehydrant': 'Fire Hydrant', 
            'washout': 'Washout',
            'tank': 'Tank', 
            'tank_annotation': 'Tank Label', 
            'wtp': 'WTP', 
            'wtp_annotation': 'WTP Label', 
            'intake': 'Intake', 
            'intake_annotation': 'Intake Label', 
            'parcels': 'Parcels', 
            'parcels_annotation': 'Parcels Label', 
            'village': 'Village', 
            'village_annotation': 'Village Label', 
            'dma': 'DMA',
            'dma-annotation': 'DMA Label', 
            'contour-line': 'Countour',
            'contour-label': 'Contour Label',
            'hillshade': 'Hillshade'
        },
        options: {
            showDefault:false,
            showCheckbox:true,
            reverseOrder:true,
            onlyRendered:true
        }
    },
    elevation: {
        url: 'https://narwassco.github.io/narok-terrain/tiles/{z}/{x}/{y}.png',
        options: {
            font: ['Roboto Medium'],
            fontSize: 12,
            fontHalo: 1,
            mainColor: '#263238',
            haloColor: '#fff',
        }
    },
    valhalla: {
        url: 'https://valhalla.water-gis.com',
        options: {
            Contours: [
                {
                    time: 3,
                    distance: 1,
                    color: 'ff0000',
                },
                {
                    time: 5,
                    distance: 2,
                    color: 'ffff00',
                },
                {
                    time: 10,
                    distance: 3,
                    color: '0000ff',
                },
                {
                    time: 15,
                    distance: 4,
                    color: 'ff00ff',
                },
            ]
        }
    }
}