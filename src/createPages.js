import { apiRoutes } from "./api.js";

export async function createCardsContries(nameList, capitalList, regionList, populationList, imgList) {

    const containerContries = document.getElementById('container-contries');
    containerContries.innerHTML = '';
    const quantCards = nameList.length;

    for(let i = 0; i < quantCards; i ++) {
        const contrieCard = document.createElement('div');
        contrieCard.classList.add('contrie-card');
        contrieCard.setAttribute('id', `${i}`);
        contrieCard.setAttribute('data-name', nameList[i]);

        const imgCard = document.createElement('img');
        const src = imgList[i].png;
        imgCard.src = src;
        contrieCard.appendChild(imgCard);

        const legendContrie = document.createElement('div');
        legendContrie.classList.add('legend-contrie');
        
        const contrieName = document.createElement('p');
        contrieName.classList.add('contrie-name');
        contrieName.innerHTML = nameList[i];
        legendContrie.appendChild(contrieName);

        const containerInfos = document.createElement('div');
        containerInfos.classList.add('container-infos-card');

        const capitalRegion = document.createElement('span');
        capitalRegion.classList.add('capital-region');
        capitalRegion.innerHTML = `${capitalList[i]}, ${regionList[i]}`;

        const population = document.createElement('span');
        population.innerHTML = `${populationList[i].toLocaleString('pt-BR')} habitantes`;

        containerInfos.appendChild(capitalRegion);
        containerInfos.appendChild(population);

        legendContrie.appendChild(containerInfos);
        contrieCard.appendChild(legendContrie);

        containerContries.appendChild(contrieCard);

        contrieCard.addEventListener('click', async (event) => {
            if(event && typeof event.preventDefault === 'function') event.preventDefault();

            const nameContrie = contrieCard.getAttribute('data-name');

            try {
                const data = await apiRoutes.seachForCompleteName(nameContrie);

                if (!data || data.length === 0) {
                    console.error('País não encontrado:', nameContrie);
                    return;
                }

                localStorage.setItem('selectContrie', JSON.stringify(data[0]));
                window.location.href = "./../public/detailsPage.html";

            } catch(error) {
                console.error('Error ao buscar dados do país', error);
            };
        });
    };
};

export async function createDetailsPage(name, officialName, flags, capital, population, area, region, languages, currencies, internetDomain, borders){
    const containerMain = document.getElementById('container-main');

    const flag = document.createElement('div');
    flag.classList.add('flag');
    flag.classList.add('flag-contrie');
    const imgFlag = document.createElement('img');
    imgFlag.src = flags;
    flag.appendChild(imgFlag);

    const infosContries = document.createElement('div');
    infosContries.classList.add('div-info');
    infosContries.setAttribute('id', 'geral-info');

    const infoTitle = document.createElement('div');
    infoTitle.classList.add('info-title');

    const nameContrie = document.createElement('h1');
    nameContrie.innerHTML = name;
    const nameContrieOfficial = document.createElement('p');
    nameContrieOfficial.innerHTML = officialName;
    
    const containerMoreInfo = document.createElement('div');
    containerMoreInfo.classList.add('container-more-info');
    
    const infoNames = ['Capital', 'Região', 'População', 'Área'];
    const infoValues = [capital, region, population, area];

    for(let i = 0; i < 4; i++) {
        let boxInfo = document.createElement('div');
        boxInfo.classList.add('box-info');
        let nameInfo = document.createElement('p');
        nameInfo.classList.add('name-info');
        nameInfo.innerHTML = infoNames[i];
        let valueInfo = document.createElement('p');
        valueInfo.classList.add('value-info');
        valueInfo.innerHTML = infoValues[i];

        boxInfo.appendChild(nameInfo);
        boxInfo.appendChild(valueInfo);

        containerMoreInfo.appendChild(boxInfo);
    }

    infoTitle.appendChild(nameContrie);
    infoTitle.appendChild(nameContrieOfficial);

    infosContries.appendChild(infoTitle);
    infosContries.appendChild(containerMoreInfo);

    const principalDiv = document.createElement('div');
    principalDiv.setAttribute('id', 'principal-div');
    principalDiv.appendChild(flag);
    principalDiv.appendChild(infosContries);
    containerMain.appendChild(principalDiv);


    const listTitleInfosOne = ['Idiomas', 'Moedas', 'Domínios de Internet', 'Países na Fronteira'];
    const valuesInfosOne = [languages, currencies, internetDomain, borders];
    const secundaryDiv = document.createElement('div');
    secundaryDiv.setAttribute('id', 'secundary-div');

    for(let i = 0; i < 4; i++) {
        
        if(valuesInfosOne[i] === undefined) {
            console.log('Esse país não faz fronteira com nenhum outro.');

        } else {
            const divOneInfo = document.createElement('div');
            divOneInfo.classList.add('div-info');
            divOneInfo.classList.add('div-one-info');

            const titleOneInfo = document.createElement('div');
            titleOneInfo.classList.add('title-one-info');
            const textTitleOneInfo = document.createElement('h3');
            textTitleOneInfo.innerHTML = listTitleInfosOne[i];
            titleOneInfo.appendChild(textTitleOneInfo);

            const valueOneInfo = document.createElement('div');
            const textValueOneInfo = document.createElement('p');

            if(i === 0 || i === 2) {
                textValueOneInfo.classList.add('language');
            }

            textValueOneInfo.innerHTML = valuesInfosOne[i];
            valueOneInfo.appendChild(textValueOneInfo);

            divOneInfo.appendChild(titleOneInfo);
            divOneInfo.appendChild(valueOneInfo);

            secundaryDiv.appendChild(divOneInfo);

            containerMain.appendChild(secundaryDiv);
        };
    };
};