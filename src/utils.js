import { apiRoutes } from "./api.js";

export async function captureTotalContries(name, optionSearch = 0, region) {
    let contriesList = [];

    if(optionSearch === 0 || name === "") {
        contriesList = await apiRoutes.searchAllContries();
    } else if(optionSearch === 1) {
        contriesList = await apiRoutes.searchForName(name);
    } else {
        contriesList = await apiRoutes.seachForRegion(region);
    };

    const totalContriesText = document.getElementById('contries-total-text');
    
    let quantContries = contriesList.length;

    if (quantContries === undefined) {
        totalContriesText.innerHTML = 'Nenhum país encontrado.';
    } else {
        totalContriesText.innerHTML = `${contriesList.length} países encontrados`;
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
    let contriesBorder = '';

    for(let contrie of borders) {
        contriesBorder += `${contrie} `;
    };

    if (borders.length === 0) {
        return undefined;
    } else {
        return contriesBorder;
    };
};

export function captureDomains(domains) {
    let domainsStr = '';

    for(let domain of domains) {
        domainsStr += `<strong>${domain}</strong>`;
    };

    return domainsStr;
};