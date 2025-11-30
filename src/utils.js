import { apiRoutes } from "./api.js";
import { createCardscountries } from "./createPages.js";

export async function captureTotalcountries(name, optionSearch = 0, region) {
    let countriesList = [];

    if(optionSearch === 0 || name === "") {
        countriesList = await apiRoutes.searchAllcountries();
    } else if(optionSearch === 1) {
        countriesList = await apiRoutes.searchByName(name);
    } else {
        countriesList = await apiRoutes.searchByRegion(region);
    };

    const totalcountriesText = document.getElementById('countries-total-text');
    
    let quantcountries = countriesList.length;

    if (quantcountries === undefined) {
        totalcountriesText.innerHTML = 'Nenhum país encontrado.';
    } else {
        totalcountriesText.innerHTML = `${countriesList.length} países encontrados`;
    };
};

export function captureCurrencies(currencies) {
    let currenciesText = '';

    for(let i = 0; i < currencies.length; i++) {
        if(currenciesText === '') {
            currenciesText += `<strong>nome:</strong> ${currencies[i].name} <strong>simbolo:</strong> ${currencies[i].symbol}`;
        } else {
            currenciesText += `<br> <strong>nome:</strong> ${currencies[i].name} <strong>simbolo:</strong> ${currencies[i].symbol}`;
        };
    };

    return currenciesText;
};

export function captureLanguages(languages) {
    let languageText = '';

    const languagesLength = languages.length;

    for(let i = 0; i < languagesLength; i++) {
        if(languageText === '') {
            languageText += `<strong>${languages[i]}</strong>`;
        } else {
            languageText += ` <strong>${languages[i]}</strong>`;
        };
    };

    return languageText;
};

export function captureBorders(borders) {
    let countriesBorder = '';

    for(let country of borders) {
        countriesBorder += `${country} `;
    };

    if (borders.length === 0) {
        return undefined;
    } else {
        return countriesBorder;
    };
};

export function captureDomains(domains) {
    let domainsStr = '';

    for(let domain of domains) {
        domainsStr += `<strong>${domain}</strong>`;
    };

    return domainsStr;
};

export function inputSearch() {
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener("input", async () => {
        const namecountry = searchInput.value;

        const containercountries = document.getElementById('container-countries');
        captureTotalcountries(namecountry, 1);

        containercountries.innerHTML = '';

        const listNamescountries = await apiRoutes.captureNamescountries(namecountry, 1);
        const listCapitalscountries = await apiRoutes.captureCapitalcountries(namecountry, 1);
        const listRegionscountries = await apiRoutes.captureRegioncountries(namecountry, 1);
        const listPopulationcountries = await apiRoutes.capturePopulationcountries(namecountry, 1);
        const listImagecountry = await apiRoutes.captureImagecountry(namecountry, 1);
        const listcountriesAll = await apiRoutes.searchByCompleteName(namecountry, 1);

        createCardscountries(listNamescountries, listCapitalscountries,listRegionscountries, listPopulationcountries,listImagecountry, listcountriesAll);
    });
};

export function filterByRegion() {
    const listContrinentBox = document.querySelectorAll('.continent-box');

    for (let continentBox of listContrinentBox) {
        continentBox.addEventListener('click', async () => {
            const containercountries = document.getElementById('container-countries');
            const filterActive = document.getElementById('active');
            filterActive.removeAttribute('id');

            continentBox.setAttribute('id', 'active');

            containercountries.innerHTML = '';

            let continent = continentBox.innerHTML;
            let continentTraslate = '';

            switch (continent) {
                case 'Todos':
                    continentTraslate = 'nada';
                    captureTotalcountries(0);
                    break;

                case 'África':
                    continentTraslate = 'africa';
                    captureTotalcountries('A', 3, continentTraslate);
                    break;

                case 'Americas':
                    continentTraslate = 'americas';
                    captureTotalcountries('A', 3, continentTraslate);
                    break;
                
                case 'Ásia':
                    continentTraslate = 'asia';
                    captureTotalcountries('A', 3, continentTraslate);
                    break;

                case 'Europa':
                    continentTraslate = 'europe';
                    captureTotalcountries('A', 3, continentTraslate);
                    break;
                
                case 'Oceania':
                    continentTraslate = 'oceania';
                    captureTotalcountries('A', 3, continentTraslate);
                    break;
            
                default:
                    break;
            }

            if (continentTraslate === 'nada') {
                createCardscountries(await apiRoutes.captureNamescountries(0), await apiRoutes.captureCapitalcountries(0), await apiRoutes.captureRegioncountries(0), await apiRoutes.capturePopulationcountries(0), await apiRoutes.captureImagecountry(0));
            } else {
                createCardscountries(await apiRoutes.captureNamescountries('A', 3, continentTraslate), await apiRoutes.captureCapitalcountries('A', 3, continentTraslate), await apiRoutes.captureRegioncountries('A', 3, continentTraslate), await apiRoutes.capturePopulationcountries('A', 3, continentTraslate), await apiRoutes.captureImagecountry('A', 3, continentTraslate));
            };
        });
    };
};

export function favoriteButton(country) {
    const favoriteButton = document.getElementById('favorite-country');

    favoriteButton.addEventListener('click', () => {
        let favorites = JSON.parse(localStorage.getItem('favorite-countries')) || [];

        const exists = favorites.some(
            (item) => item.name.common === country.name.common
        );

        if (!exists) {
            favorites.push(country);
            localStorage.setItem('favorite-countries', JSON.stringify(favorites));
        } else {
            console.log('Esse país já está nos favoritos!');
        };
    });
};