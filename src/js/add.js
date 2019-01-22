import render from '../templates/list.hbs';
import { btn } from './btn';

function add(e, coords, objList, target, myMap, clusterer, div, i, myPlace) {
    const noC = document.querySelector('.no-comment'),
        ul = document.querySelector('.elem-content-list'),
        li = document.createElement('li');

    if (target.options._name === 'geoObject') {
        noC.remove();
        console.log(1000, objList[coords]);
        for (const iterator of objList[coords]) {
            const html = render(iterator);

            li.innerHTML = html;
            ul.appendChild(li);
        }
    } else {
        const y = document.querySelector('.ymaps-2-1-72-b-cluster-carousel__layout');

        y.addEventListener('click', (e) => {
            if (e.target.className === 'ballon_links') {
                clusterer.balloon.close();

                ymaps.geocode(e.target.textContent).then(res => {
                    document.body.appendChild(div);
                    document.querySelector('.elem-header-div').textContent = e.target.textContent;//***
                    coords = res.geoObjects.get(0).geometry._coordinates;
                })
                    .then(() => {
                        const noC = document.querySelector('.no-comment'),
                            ul = document.querySelector('.elem-content-list');

                        noC.remove();
                        for (const iterator of objList[coords]) {
                            const li = document.createElement('li'),
                                html = render(iterator);
                                
                            li.innerHTML = html;
                            ul.appendChild(li);
                        }
                        btn(coords, i, clusterer, myMap, myPlace, objList, clusterer);
                        document.querySelector('.fa-times').addEventListener('click', ()=> {
                            document.body.removeChild(div);
                        })

                    })
            }
        });
    }

}

export {
    add
}