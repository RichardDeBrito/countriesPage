import { createCardscountries } from "./createPages.js";

document.addEventListener('DOMContentLoaded', () => {
    const favorites = JSON.parse(localStorage.getItem("favorite-countries")) || [];

    if (favorites.length === 0) {
        document.getElementById("container-countries").innerHTML = '<p>Nenhum favorito salvo.</p>';
        return;
    };

    const nameList = favorites.map(item => item.name.common);
    const capitalList = favorites.map(item => item.capital ? item.capital[0] : 'N/A');
    const regionList = favorites.map(item => item.region);
    const populationList = favorites.map(item => item.population);
    const imgList = favorites.map(item => item.flags);

    createCardscountries(nameList, capitalList, regionList, populationList, imgList, favorites);
});