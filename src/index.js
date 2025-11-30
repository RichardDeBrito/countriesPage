import { apiRoutes } from "./api.js";
import { createCardscountries } from "./createPages.js";
import { captureTotalcountries, inputSearch, filterByRegion } from "./utils.js";

document.addEventListener('DOMContentLoaded', async () => {
    const listNamescountries = await apiRoutes.captureNamescountries();
    const listCapitalcountries = await apiRoutes.captureCapitalcountries();
    const listRegioncountries = await apiRoutes.captureRegioncountries();
    const listPopulationcountries = await apiRoutes.capturePopulationcountries();
    const listImagecountry = await apiRoutes.captureImagecountry();
    
    createCardscountries(listNamescountries,listCapitalcountries,listRegioncountries,listPopulationcountries, listImagecountry);
    captureTotalcountries();
    inputSearch();
    filterByRegion();
});