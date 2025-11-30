export class apiRoutes {
    static baseURL = 'https://restcountries.com/v3.1/';

    static async searchAllcountries() {
        try {
            const response = await fetch(`${apiRoutes.baseURL}all?fields=name,capital,currencies,flags,region,population`);
            const data = await response.json();

            const countriesList = [];

            for(let i = 0; i < data.length; i++) {
                countriesList.push(data[i]);
            }

            return countriesList;

        } catch (error) {
            console.error('Erro ao buscar países:', error);
        }
    }

    static async searchByName(name = 'A') {
        try {
            const response = await fetch(`${this.baseURL}name/${name}?fields=name,capital,currencies,flags,region,population`);
            const data = await response.json();

            return data;

        } catch(error) {
            console.error('Erro ao buscar país pelo nome.', error);
        };
    }

    static async searchByRegion(region) {
        try {
            const response = await fetch(`${this.baseURL}region/${region}?fields=name,capital,currencies,flags,region,population`);
            const data = await response.json();

            return data;

        } catch (error) {
            console.error('Erro ao buscar países pelo continente.', error);
        };
    }

    static async searchByCompleteName(name) {
        try {
            const response = await fetch(`${this.baseURL}name/${name}?fields=name,capital,currencies,flags,region,population,tld,borders,area,languages,subregion,latlng,maps`);
            const data = await response.json(); 

            return data;

        } catch(error) {
            console.error('Erro ao buscar informações do país', error);
        }
    }

    static async captureNamescountries(name = 'A', optionSearch = 0, region = 'Americas') {
        try {
            let countriesList = [];

            if (optionSearch === 0 || name === "") {
                countriesList = await this.searchAllcountries();
            } else if(optionSearch === 1) {
                countriesList = await this.searchByName(name);
            } else {
                countriesList = await this.searchByRegion(region);
            };

            const countriesNameList = [];
    
            for (let i = 0; i < countriesList.length; i++) {
                countriesNameList.push(countriesList[i].name.common);
            };
            
            return countriesNameList;
            
        } catch (error) {
            console.error('Erro ao buscar nome do pais', error);
        }
    }

    static async captureRegioncountries(name = 'A', optionSearch = 0, region = 'Americas') {
        try {
            let countriesList = [];
            const countriesRegionsList = [];

            if (optionSearch === 0 || name === "") {
                countriesList = await this.searchAllcountries();
            } else if(optionSearch === 1) {
                countriesList = await this.searchByName(name);
            } else {
                countriesList = await this.searchByRegion(region);
            }
    
            for (let i = 0; i < countriesList.length; i++) {
                countriesRegionsList.push(countriesList[i].region);
            };
    
            return countriesRegionsList;
            
        } catch (error) {
            console.error('Erro ao buscar região do país', error);
        }
    }

    static async captureCapitalcountries(name = 'A', optionSearch = 0, region = 'Americas') {
        try {
            let countriesList = [];

            if (optionSearch === 0 || name === "") {
                countriesList = await this.searchAllcountries();
            } else if(optionSearch === 1){
                countriesList = await this.searchByName(name);
            } else {
                countriesList = await this.searchByRegion(region);
            }

            const countriesCapitalsList = [];
    
            for (let i = 0; i < countriesList.length; i++) {
                countriesCapitalsList.push(countriesList[i].capital[0]);
            };
    
            return countriesCapitalsList;

        } catch (error) {
            console.error('Erro ao buscar capital do país', error);
        }
    }

    static async capturePopulationcountries(name = 'A', optionSearch = 0, region = 'Americas') {
        try {
            let countriesList = [];

            if (optionSearch === 0 || name === "") {
                countriesList = await this.searchAllcountries();
            } else if(optionSearch === 1){
                countriesList = await this.searchByName(name);
            } else {
                countriesList = await this.searchByRegion(region);    
            }

            const countriesPopulationList = [];
    
            for (let i = 0; i < countriesList.length; i++) {
                countriesPopulationList.push(countriesList[i].population);
            };
    
            return countriesPopulationList;

        } catch (error) {
            console.error('Erro ao buscar capital do país', error);
        }
    }

    static async captureImagecountry(name = 'A', optionSearch = 0, region = 'Americas') {
        try {
            let countriesList = [];

            if (optionSearch === 0 || name === "") {
                countriesList = await this.searchAllcountries();
            } else if(optionSearch === 1){
                countriesList = await this.searchByName(name);
            } else {
                countriesList = await this.searchByRegion(region);
            };

            const countriesFlagsList = [];

            for (let i = 0; i < countriesList.length; i++) {
                countriesFlagsList.push(countriesList[i].flags);
            }

            return countriesFlagsList;

        } catch (error) {
            console.error('Erro ao buscar bandeira do pais', error);
        };
    }
}