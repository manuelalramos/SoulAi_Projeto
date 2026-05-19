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


// Validando campos contato
// Capturando a div 
const contactForm = document.querySelector(".contact-form");

// Função de mensagem de erro
function showError(field, message) {
  // Pegando o pai. A div pai
  const formGroup = field.parentElement;

  // Captutando dentro da div pai a mensagem de erro
  const errorMessage = formGroup.querySelector(".error-mensagem");

  // Adicionando a classe error
  formGroup.classList.add("error");

  // Coloca o texto da mensagem de erro
  errorMessage.textContent = message;
}

// Limpando o campo de erro
function clearError(field) {
    //Div pai
  const formGroup = field.parentElement;

  // Capturando a mensagem de erro
  const errorMessage = formGroup.querySelector(".error-mensagem");

  // Removendo a classe erro
  formGroup.classList.remove("error");

  // Apagando a mensagem
  errorMessage.textContent = "";
}


//Validando o email para aparecer mensagem de erro
function emailIsValid(email) {
  return email.includes("@") && email.includes(".");
}

if (contactForm) {
  // Envio do form
  contactForm.addEventListener("submit", function (event) {
    // Sem envio automatico antes do Java
    event.preventDefault();

    // Captura cada campos do form
    const name = contactForm.elements.name;
    const email = contactForm.elements.email;
    const subject = contactForm.elements.assunto;
    const message = contactForm.elements.mensagem;

    // Capturando p da ,ensagem de suceeso
    const feedback = contactForm.querySelector(".feedback-forms");

    // Varievel da validação
    let formIsValid = true;

    // Se houver erro limpa
    clearError(name);
    clearError(email);
    clearError(subject);
    clearError(message);
    feedback.textContent = "";

    // Validando nome
    if (name.value.trim() === "") {
      showError(name, "Preencha seu nome.");
      formIsValid = false;
    }

    // Validando e-mail
    if (email.value.trim() === "" || !emailIsValid(email.value)) {
      showError(email, "Digite um e-mail válido.");
      formIsValid = false;
    }

    // Validando assunto
    if (subject.value === "") {
      showError(subject, "Selecione um assunto.");
      formIsValid = false;
    }

    // Validando mensagem
    if (message.value.trim() === "") {
      showError(message, "Digite uma mensagem.");
      formIsValid = false;
    }

    // SSucesso
    if (formIsValid) {
      feedback.textContent = "Mensagem enviada com sucesso!";
      contactForm.reset();
    }
  });
}

