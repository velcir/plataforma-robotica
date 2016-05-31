#include <Servo.h>

Servo myservo8;
Servo myservo4;
Servo myservo2;
Servo myservo12;

int servo4 = 4;
int servo8 = 8;
int servo2 = 2;
int servo12 = 12;

int i;
long porta;
char sentido;
char com;
long graus;
int aux = 0;
long a;

void setup() {
    Serial.begin(9600); //frequência da porta serial

    myservo4.attach(servo4);
    myservo8.attach(servo8);
    myservo2.attach(servo2);
    myservo12.attach(servo12);

    myservo2.write(75); //posiço inicial base
    myservo4.write(140);//Posiço inicial braço
    myservo8.write(70);  //Posiço inicial altura
    myservo12.write(20);  //posiço inicial pinça
}

long aguardarValorInt()
{
    while (Serial.available() < 1)
        delay(1);

    return Serial.parseInt();
}


char aguardarValorChar()
{
    while (Serial.available() <= 0)
        delay(1);

    return Serial.read();
}



void loop() {


    porta = aguardarValorInt(); // Lê byte do buffer serial;


    switch (porta) {


    case 2://SERVO
        sentido = aguardarValorChar();
        graus = aguardarValorInt();

        if (sentido == '-') graus = graus * (-1);

        if( graus + myservo2.read() < 0 || graus + myservo2.read() > 150)
          break;

        myservo2.write(graus + myservo2.read());

    break;

    case 4://SERVO
        sentido = aguardarValorChar();
        graus = aguardarValorInt();
        if (sentido == '-') graus = graus * (-1);
        if( graus + myservo4.read() < 80 || graus + myservo4.read() > 180)
          break;

        myservo4.write(graus + myservo4.read());

    break;

    case 8://SERVO
        sentido = aguardarValorChar();
        graus = aguardarValorInt();
        if (sentido == '-') graus = graus * (-1);

         if( graus + myservo8.read() < 60 || graus + myservo8.read() > 120)
          break;

        myservo8.write(graus + myservo8.read());


     break;

    case 12: //SERVO
        sentido = aguardarValorChar();
        graus = aguardarValorInt();
         if (sentido == '-') graus = graus * (-1);
         if( graus + myservo12.read() < 20 || graus + myservo12.read() > 60)
          break;

        myservo12.write(graus + myservo12.read());


     break;

    case 13://LED
        com = aguardarValorChar();
        if (com == 'H') digitalWrite(13, HIGH); //liga o pino ledPin
        else if (com == 'L') digitalWrite(13, LOW); //desliga o pino ledPin

    break;

    case 18: //DELAY
	sentido = aguardarValorChar();
        a = aguardarValorInt();
        delay(a * 1000);

    break;
    }

    delay(2000);
    Serial.println('p');
    Serial.flush();
}
