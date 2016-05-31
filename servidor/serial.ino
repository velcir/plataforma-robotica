void setup()
{
    Serial.begin(9600);

    pinMode(13, OUTPUT);
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

void blink()
{
    digitalWrite(13, HIGH);
    delay(1000);
    digitalWrite(13, LOW);
    delay(1000);
}

long porta, graus, a;
char sentido;

void loop()
{
    porta = aguardarValorInt();

    switch (porta)
    {
    case 2:
        sentido = aguardarValorChar();
        graus = aguardarValorInt();

        if (sentido == '-') graus = graus * (-1);

        blink();
        break;

    case 4://SERVO
        sentido = aguardarValorChar();
        graus = aguardarValorInt();
        if (sentido == '-') graus = graus * (-1);

        blink();
        break;

    case 8://SERVO
        sentido = aguardarValorChar();
        graus = aguardarValorInt();
        if (sentido == '-') graus = graus * (-1);

        blink();

        break;

    case 12: //SERVO
        sentido = aguardarValorChar();
        graus = aguardarValorInt();
        if (sentido == '-') graus = graus * (-1);

        blink();
        break;

    case 18: //DELAY
        sentido = aguardarValorChar();
        a = aguardarValorInt();
        delay(a * 1000);
        break;
    }

    Serial.println('p');
    Serial.flush();
}
