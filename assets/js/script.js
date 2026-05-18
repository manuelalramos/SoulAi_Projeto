//Cabeçalho do HOME
const homeHeader = document.querySelector(".home-header");

function changeHeaderBackground() {
    if (homeHeader) {
        if (window.scrollY > 30) {
            homeHeader.classList.add("scrolled");
        } else {
            homeHeader.classList.remove("scrolled");
        }
    }
}

changeHeaderBackground();
window.addEventListener("scroll", changeHeaderBackground);


//Capturando a div slider
const cardSlider = document.querySelector(".cards-slider"); 
//Verificando se existe o slider na página antes
if (cardSlider) {
    //Capturando todos os cards
    const sliderCards = cardSlider.querySelectorAll(".slider-card");
    //Capturando o botão esquerda
    const leftButton = cardSlider.querySelector("#button-left");
    //Capturando o botão direito
    const rightButton = cardSlider.querySelector("#button-right");
    //Capturando as bolinhas de status dos cards
    const sliderDots = document.querySelectorAll(".slider-dot");

    //Card do momento
    let currentCard = 0;

    //Função que mostra apenas o card escolhido
    function showCard(cardIndex) {
        //Tirando a classe active 
        sliderCards.forEach(function(card) {
            card.classList.remove("active");
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

    //Seta direita
    rightButton.addEventListener("click", function () {
        //Soma 1
        currentCard = currentCard + 1;

        // Loop 
        if (currentCard >= sliderCards.length){
            currentCard = 0;
        }
        
        showCard(currentCard);
    });

    //Seta esquerda
    leftButton.addEventListener("click", function () {
        currentCard = currentCard - 1; 

        //Loop
        if (currentCard < 0) {
            currentCard = sliderCards.length - 1;
        }

        showCard(currentCard);
        
    });

    //Click nas bolinhas
    sliderDots.forEach(function (dot) {
        //Click na bolinha leva direto para o card certo
        dot.addEventListener("click", function () {
            //Pega o numero do data-slider
            currentCard = Number(dot.dataset.sliderDot);

            showCard(currentCard)
        });
        
    });

    
}

//Abrindo e fechando cada pergunta
const faqQuestions = document.querySelectorAll(".faq-pergunta");

faqQuestions.forEach((question) => {
  question.addEventListener("click", function () {

    const faqItem = question.parentElement;

    faqItem.classList.toggle("active");

  });
});
