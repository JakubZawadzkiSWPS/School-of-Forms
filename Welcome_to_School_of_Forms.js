let chairs = [];
let chairImgs = [];
let button;
let coreSansFont;
let texts = ["Welcome to School of Forms.", "We are happy you're here.", "Many exciting things are waiting for you.", "Explore various deisgn courses(Industrial, Domestic, Fashion, Communication)."];
let currentTextIndex = 0;
let textDisplayInterval = 2000; // Opóźnienie między wyświetlaniem kolejnych linijek tekstu
let lastTextChangeTime = 0;
let showButton = false;

function preload() {
  // Załaduj lokalne obrazy krzeseł
  chairImgs.push(loadImage('chair1.png'));
  chairImgs.push(loadImage('chair2.png'));
  chairImgs.push(loadImage('chair3.png'));
  
  // Załaduj czcionkę
  coreSansFont = loadFont('font/CoreSansC-85Heavy.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(32);
  textFont(coreSansFont);
  fill('#15A3EF');
}

function draw() {
  background(250);

  // Wyświetlanie tekstów jeden po drugim
  if (currentTextIndex < texts.length && millis() - lastTextChangeTime > textDisplayInterval) {
    currentTextIndex++;
    lastTextChangeTime = millis();
  }

  for (let i = 0; i < currentTextIndex; i++) {
    text(texts[i], width / 2 - textWidth(texts[i]) / 2, height / 2 - (texts.length / 2 - i) * 40);
  }

  if (currentTextIndex >= texts.length && !showButton) {
    showButton = true;
    createButtonAfterText();
  }

  // Aktualizacja i rysowanie krzeseł
  for (let chair of chairs) {
    chair.fall();
    chair.display();
  }

  chairs = chairs.filter(chair => chair.y < height + 50);
}

class Chair {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.speed = random(2, 5);
    this.img = img;
  }

  fall() {
    this.y += this.speed;
  }

  display() {
    image(this.img, this.x, this.y, this.img.width / 4, this.img.height / 4); // Dopasuj rozmiar obrazu jeśli jest za duży
  }
}

function createButtonAfterText() {
  button = createButton('Join the squad');
  button.position(width / 2 - 75, height - 100);
  button.style('background-color', '#15A3EF');
  button.style('border', 'none');
  button.style('color', 'white');
  button.style('padding', '15px 32px');
  button.style('text-align', 'center');
  button.style('text-decoration', 'none');
  button.style('display', 'inline-block');
  button.style('font-size', '16px');
  button.style('margin', '4px 2px');
  button.style('cursor', 'pointer');
  button.style('border-radius', '12px');
  button.style('font-family', 'Core Sans C85 Heavy'); // Ustaw czcionkę na przycisku

  // Zmiana koloru po najechaniu
  button.mouseOver(() => button.style('background-color', '#3EB3F2'));
  button.mouseOut(() => button.style('background-color', '#15A3EF'));
  button.mousePressed(buttonPressed);

  // Animacja przycisku pojawiającego się z dołu
  buttonShow();
}

function buttonShow() {
  let targetY = height - 100;
  let buttonY = height;
  let interval = setInterval(() => {
    if (buttonY > targetY) {
      buttonY -= 2; // Zmniejsz tę wartość, aby uzyskać płynniejszą animację
      button.position(width / 2 - 75, buttonY);
    } else {
      clearInterval(interval);
      button.position(width / 2 - 75, targetY);
    }
  }, 16); // Odpowiada około 60 fps
}

function buttonPressed() {
  console.log('Przycisk został kliknięty!');
  setInterval(() => {
    chairs.push(new Chair(random(width), -50, random(chairImgs)));
  }, 100);
}
