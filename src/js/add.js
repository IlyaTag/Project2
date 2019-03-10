import render from '../templates/list.hbs';
import { btn } from './btn';

function add(e, coords, objList, target, myMap, clusterer, div, i, myPlace) {
    const noC = document.querySelector('.no-comment'),
        ul = document.querySelector('.elem-content-list'),
        li = document.createElement('li');

    if (target.options._name === 'geoObject') {
        ul.removeChild(noC);
        // eslint-disable-next-line guard-for-in
        for (const iterator in objList[coords]) {
            const html = render(objList[coords][iterator]);

            li.innerHTML = html;
            ul.appendChild(li);
        }
    } else {
        const balloon = document.querySelector('.ymaps-2-1-73-balloon__layout');

        balloon.addEventListener('click', (e) => {
            if (e.target.className === 'ballon_links') {
                var time = document.querySelector('.ballon_footer').textContent,
                    linkTarget = e.target.textContent;

                clusterer.balloon.close();

                // eslint-disable-next-line no-undef
                ymaps.geocode(linkTarget).then(res => {
                    document.body.appendChild(div);
                    document.querySelector('.elem-header-div').textContent = linkTarget;
                    coords = res.geoObjects.get(0).geometry._coordinates;
                })
                    .then(() => {
                        const noC = document.querySelector('.no-comment'),
                            ul = document.querySelector('.elem-content-list');

                        ul.removeChild(noC);
                        // eslint-disable-next-line guard-for-in
                        for (const iterator in objList[coords]) {
                            const li = document.createElement('li'),
                                html = render(objList[coords][iterator]);

                            li.innerHTML = html;
                            ul.appendChild(li);
                            if ( objList[coords][iterator].date == time) {
                                li.scrollIntoView();
                                li.classList.toggle('comment-cheked');
                                setTimeout( ()=> {
                                    li.classList.toggle('comment-cheked');
                                }, 1000)
                            }
                        }

                        btn(coords, i, clusterer, myMap, myPlace, objList, clusterer);
                        document.querySelector('.fa-times').addEventListener('click', () => {
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