import { createDetailsPage } from "./createPages.js";
import { captureCurrencies, captureLanguages, captureBorders, captureDomains, favoriteButton } from "./utils.js";

const country = JSON.parse(localStorage.getItem("selectcountry"));

const languages = Object.values(country.languages);
const currencies = Object.values(country.currencies);

const borders = country.borders;
const lat = country.latlng[0];
const lng = country.latlng[1];

const name = country.name.common;
const nameOfficial = country.name.official;
const flag = country.flags.svg;
const capital = country.capital;
const population = country.population.toLocaleString('pt-BR');
const area = country.area.toLocaleString('pt-BR') + ' km²';
const region = country.region;
const domain = country.tld;

const currenciesText = captureCurrencies(currencies);
const languageText = captureLanguages(languages);
const domainsText = captureDomains(domain);
const borderValues = captureBorders(borders);


const mapsLink = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-1}%2C${lat-1}%2C${lng+1}%2C${lat+1}&layer=mapnik&marker=${lat}%2C${lng}`;

const iframe = document.getElementById('iframe');
iframe.src = mapsLink;

document.addEventListener('DOMContentLoaded', () => {
    createDetailsPage(name, nameOfficial, flag, capital, population, area, region, languageText, currenciesText, domainsText, borderValues);
    favoriteButton(country);
});