#include <Servo.h>
#include "suave.h"

Suave garra;
Suave pulso;
Suave cotovelo;
Suave ombroI;
Suave ombroII;
Suave base;

int i;
long porta;
char sentido;
char com;
long graus;
int aux = 0;
long a;
int extra = 0;
int pos;

void setup() {
    Serial.begin(9600); //frequência da porta serial

    garra.conecta(2,50);
    pulso.conecta(4,70);
    cotovelo.conecta(6,15);
    ombroI.conecta(8,90);
    ombroII.conecta(10,180 - ombroI.read());
    base.conecta(12,97);
    
}

long aguardarValorInt()
{
    while (Serial.available() < 1)
        delay(1);
    return Serial.parseInt();
}

//int ler (Suave servo){
//  return servo.read(); 
//}

int ler (Suave servo){ // USADO PARA TESTE
  return 10; 
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

    case 2://garra
        sentido = aguardarValorChar();
        graus = aguardarValorInt();

        if (sentido == '-') graus = graus * (-1);

        if( graus + ler(garra) < 0 || graus + ler(garra) > 180)
          break;
        
        garra.mover(graus + ler(garra),10);

    break;

    case 4://pulso
        sentido = aguardarValorChar();
        graus = aguardarValorInt();
        if (sentido == '-') graus = graus * (-1);
        if( graus + ler(pulso) < 20 || graus + ler(pulso) > 180)
          break;

        pulso.mover(graus + ler(pulso),3);

    break;

    case 6://cotovelo
        sentido = aguardarValorChar();
        graus = aguardarValorInt();
        if (sentido == '-') graus = graus * (-1);

         if( graus + ler(cotovelo) < 15 || graus + ler(cotovelo) > 180)   //voltar para       if( graus + cotovelo.read() < 15 || graus + cotovelo.read() > 180)
          break;

        cotovelo.mover(graus + ler(cotovelo),3);

     break;
      
    case 8://ombroI e ombroII
        extra = 0;
        sentido = aguardarValorChar();
        graus = aguardarValorInt();
        pos = ler(ombroI);
        if (sentido == '-') graus = graus * (-1);

        if( graus + ler(ombroI) < 1 || graus + ler(ombroI) > 180)
          break;
          
        if( graus < 0){
              for( int i = 0; i > graus; i--){
                  pos--;
                  ombroI.mover(pos,1);
                  ombroII.mover(180 -pos,1);
        }
          
        }
        else{   
              for( int i = 0; i < graus; i++){
                  pos++;
                  ombroI.mover(pos,1);
                  ombroII.mover(180 -pos,1);
              }
        }
    break;

    case 12: //BASE 
        sentido = aguardarValorChar();
        graus = aguardarValorInt();
         if (sentido == '-') graus = graus * (-1);
         if( graus + ler(base) < 25 || graus + ler(base) > 160)
          break;

        base.mover(graus + ler(base),3);

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
    
    case 19:  //resetar
    
          cotovelo.mover(70,3);
          delay(500);
          ombroI.mover(90,3);
          ombroII.mover(180-90,3);
          delay(500);
          base.mover(90,3);
          pulso.mover(20,3);
          garra.mover(40,3);
          delay(500);
          cotovelo.mover(15,3);
          delay(500);
    
         
              
    break;
    
  }

    delay(500);
    Serial.println('p');
    Serial.flush();
}

    

