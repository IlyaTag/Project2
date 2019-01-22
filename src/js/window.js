import render from '../templates/list.hbs';
function window(coords, name, place, commit, date, myPlace, i, objList) {
    var adress;
 
    // eslint-disable-next-line no-undef
    return ymaps.geocode(coords).then(res => {
        const ul = document.querySelector('.elem-content-list'),
            noC = document.querySelector('.no-comment'),
            li = document.createElement('li');
            
        adress = res.geoObjects.get(0).getCountry() + ' ' + res.geoObjects.get(0).getAddressLine();
        myPlace.properties
            .set({
                header: place,
                adress: adress,
                comment: commit,
                data: date
            })
        if (objList.hasOwnProperty(coords)) {
            objList[coords].push( { name: name, place: place, commit: commit, date: date, adress: adress } );
        } else {
            objList[coords] = [];
            objList[coords].push( { name: name, place: place, commit: commit, date: date, adress: adress } );
        }     
        const html = render(objList[coords][i]);
        
        if (noC) {
            noC.remove();
        }
        li.innerHTML = html;
        ul.appendChild(li);
    });
    
}

export {
    window
}