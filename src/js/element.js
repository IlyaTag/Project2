import { btn } from './btn';
import { add } from './add';
import render from '../templates/window.hbs';

function element(e, div, clusterer, myPlace, i, objList, myMap, target, coords) {

    if (e.get('target').options._name === 'geoObject') {
        coords = e.get('target').geometry._coordinates;
        console.log(1, coords);
    } else {
        coords = e.get('coords');
        console.log(2, coords);
    }
    console.log(3, e);
    var html = render();

    div.className = 'elem';
    div.innerHTML = html;
    let x = e.get('pagePixels')[0],
        y = e.get('pagePixels')[1],
        razX = document.documentElement.clientWidth - x,
        razY = document.documentElement.clientHeight - y;

    x = razX < 400? x - (400 - razX):x;
    y = razY < 550? y - (550 - razY):y;
    div.style.top = y + 'px';
    div.style.left = x + 'px';
    // eslint-disable-next-line no-undef
    ymaps.geocode(coords).then(res => {
        if (!(e.get('target').options._name === 'cluster')) {
            document.body.appendChild(div);
            document.querySelector('.elem-header-div').textContent = res.geoObjects.get(0).getAddressLine();//***
            console.log(4, res.geoObjects.get(0));
            coords = res.geoObjects.get(0).geometry._coordinates;
        }
    })
        .then(() => {
            if (target) {
                if (target.options._name === 'geoObject' || target.options._name === 'cluster') {
                    add(e, coords, objList, target, myMap, clusterer, div, i, myPlace);
                }
            }

            btn(coords, i, clusterer, myMap, myPlace, objList, clusterer);
            document.querySelector('.fa-times').addEventListener('click', ()=> {
                document.body.removeChild(div);
            })
        })
}

export {
    element
}