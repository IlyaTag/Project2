import { window } from './window';

function createPlacemark(coords) {
    // eslint-disable-next-line no-undef
    return new ymaps.Placemark(coords, {}, {
        openBalloonOnClick: false
    });
}

var time = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

function btn(coords, i, clusterer, myMap, myPlace, objList) {
    let btnAdd = document.querySelector('.addbtn');

    btnAdd.addEventListener('click', () => {
        var name = document.querySelector('.input-name').value.trim(),
            place = document.querySelector('.input-place').value.trim(),
            commit = document.querySelector('.input-commit').value.trim(),
            date = new Date();

        if (name === '' || place === '' || commit === '') {
            alert('Остались не заполненные поля!!!');
        } else {
            myPlace = createPlacemark(coords);
            
            // eslint-disable-next-line max-len
            date = date.getFullYear() +'.'+ date.toLocaleString('ru', { month: 'numeric', day: 'numeric' }) + ' ' + date.toLocaleString('ru', time);
            clusterer.add(myPlace);
            // eslint-disable-next-line no-undef
            myMap.geoObjects.add(clusterer);
            i = objList[coords] ? objList[coords].length : 0;
            document.querySelector('.input-name').value = '';
            document.querySelector('.input-place').value = '';
            document.querySelector('.input-commit').value = '';
            window(coords, name, place, commit, date, myPlace, i, objList);           
        }
    })

}

export {
    btn
}