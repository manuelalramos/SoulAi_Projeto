
//Capturando a div slider
const cardSlider = document.querySelector(".cards-slider");
//Verificando se existe o slider na página antes
if (cardSlider) {
    //Capturando todos os cards
    const sliderCards = cardSlider.querySelector(".slider-card");
    //Capturando o botão esquerda
    const leftButton = cardSlider.querySelector("#button-left");
    //Capturando o botão direito
    const rightButton = cardSlider.querySelector("#button-right");
    //Capturando as bolinhas de status dos cards
    const sliderDots = cardSlider.querySelector(".slider-dot");

    //Card do momento
    let currentCard = 0;

    //Função que mostra apenas o card escolhido
    function showCard(cardIndex) {
        //Tirando a classe active 
        sliderCards.forEach(function(card) {
            card.classList.remove("active")
        });
        //Active apenas no que deve aparecer
        sliderCards[cardIndex].classList.add("active");

        //Tirando o active das bolinhas
        sliderDots.forEach(function (dot) {
            dot.classList.remove("active");
        });

        //Active da bolinha apenas no card atual
        sliderDots[cardIndex].classList.add("active");
    }

    
}