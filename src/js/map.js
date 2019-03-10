import { element } from './element';

function yMap() {

    // eslint-disable-next-line no-undef
    ymaps.ready(function() {
        // eslint-disable-next-line no-undef
        var myMap = new ymaps.Map('map', {
            center: [47.214142, 38.920946],
            zoom: 14,
            controls: ['zoomControl'],
            behaviors: ['default', 'scrollZoom']
        }, { searchControlProvider: 'yandex#search' });

        // eslint-disable-next-line no-undef
        var maketCluster = ymaps.templateLayoutFactory.createClass(
            // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
            '<div class="ballon">' +
            '<div class=ballon_header>{{ properties.header|raw }}</div>' +
            // eslint-disable-next-line max-len
            '<div class=ballon_body><a href=# class=ballon_links>{{ properties.adress|raw }}</a></br></div>' +
            '<div class=ballon_body2>{{ properties.comment|raw }}</br></div>' +
            '<div class=ballon_footer>{{ properties.data|raw }}</div>' +
            '</div>'
        );
        // eslint-disable-next-line no-undef
        var clusterer = new ymaps.Clusterer({
                preset: 'islands#invertedVioletClusterIcons',
                // gridSize: 128,
                clusterBalloonContentLayout: 'cluster#balloonCarousel',
                clusterBalloonContentHeader: 'geoObject.properties.balloonContentHeader',
                clusterBalloonPagerSize: 5,
                clusterDisableClickZoom: true,
                // Устанавливаем собственный макет.
                clusterBalloonItemContentLayout: maketCluster
            }),
            objList = {},
            div = document.createElement('div'),
            i,
            coords,
            target,
            myPlace;
        
        myMap.events.add('click', function(e) {
            if (document.querySelector('body').contains(document.querySelector('.elem'))) {
                document.body.removeChild(div);
            } else {
                element(e, div, clusterer, myPlace, i, objList, myMap, coords);

            }
        });
        // 
        clusterer.events.add('click', function(e) {
            if (e.get('target').options._name === 'geoObject' || e.get('target').options._name === 'cluster' ) {
                target = e.get('target');
                if (document.querySelector('body').contains(document.querySelector('.elem'))) {
                    document.body.removeChild(div);
                } else {
                    element(e, div, clusterer, myPlace, i, objList, myMap, target, coords);

                }
            } 
        });
    });
}

export {
    yMap
}