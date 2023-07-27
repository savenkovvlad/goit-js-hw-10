import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import Notiflix from 'notiflix';
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_hj3bZ5YYrlS7jC7F7EuKKOPYrFuUayTJnyrIAMNiPu2sdFPugKifPlNkZu0uskLu";

let api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/breeds'
});

const refs = {
    select: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};
refs.select.addEventListener('change', onSelect)

fetchBreeds().then((data) => {
    removeHiddenAtribute(refs.select)
    addHiddenAtribute(refs.loader)
            const catInfo = data
                .map(({ id, name }) => `<option value='' disabled hidden selected>Select cat</option>
                <option value='${id}'>${name}</option>`)
                 .join('');             
     refs.select.insertAdjacentHTML('beforeend', catInfo);   
     }
        )
    .catch(err => {
         addHiddenAtribute(refs.loader)
         addHiddenAtribute(refs.select)     
        Notiflix.Notify.failure(removeHiddenAtribute(refs.error))
         console.log(err);
         addHiddenAtribute(refs.catInfo)         
        })

function onSelect(event) {
            addHiddenAtribute(refs.error)    
            removeHiddenAtribute(refs.loader)   
            addHiddenAtribute( refs.select) 
            addHiddenAtribute(refs.catInfo)
    
    fetchCatByBreed(event.target.value).then((data) => {
       
        let { name, temperament, description } = data[0].breeds[0];
        
        refs.catInfo.innerHTML = `
        <div class="cat-card">
        <img src="${data[0].url}" alt="${name}" srcset=""  class="img-cat"/>
        <div class="cat-description">
       <h2 class="cat-title">${name} </h2>
      <p class="cat-text">${description} </p>
       <p class="cat-temperament"><span class="cat-span-temperament">Temperament:</span>  ${temperament} </p>
       </div>
       </div>
        `
    }).catch(err => {
        addHiddenAtribute(refs.catInfo)
       refs.catInfo.textContent = ''
        Notiflix.Notify.failure(removeHiddenAtribute(refs.error))            
        console.log(err);
        
    }).finally(() => {
        addHiddenAtribute(refs.loader)        
        removeHiddenAtribute(refs.select)        
        removeHiddenAtribute(refs.catInfo)   
        })
}

function removeHiddenAtribute(el) {
    el.hidden = false
}

function addHiddenAtribute(el) {
    el.hidden = true;
}

