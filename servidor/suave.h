#include <Servo.h>
#include <Arduino.h>
#include <math.h>

class Suave{
private:
  Servo s;
  int last_pos;
  float resolve_eq(float d, float b, float a){
    float q, r, term1, dum1, r13;
    float x3;
    b/=a;
    d/=a;
    q = -pow(b,2)/9;
    r = (-27*d -2*pow(b,3))/54;
    term1 = (b/3.0);
    q = -q;
    dum1 = pow(q,3);
    dum1 = acos(r/sqrt(dum1));
    r13 = 2.0*sqrt(q);
    x3 = -term1 + r13*cos((dum1 + 4.0*3.1415)/3.0);
    return x3;
  }

public:
  void conecta(int port){
    s.attach(port);
    if(!s.attached()) return;
    last_pos=s.read();  
  }
  void conecta(int port, int init_pos){
    if(port < 0) return;
    s.attach(port);
    if(!s.attached()) return;
    s.write(init_pos);
    last_pos=init_pos;
  }
  void mover(int pf){
    if(pf == last_pos) return;
    float a2, a3, raiz;
    int intervalo;
    int a0=last_pos;
    int tf = 50*(pf-a0)/3;
    int ultimo = 0;
    
    if(a0>pf) tf *= -1;
    a2 = (3.0/pow((tf/1000.0),2)) * (pf-a0);
    a3 = (-2.0/pow((tf/1000.0),3)) * (pf-a0);
  
    if(a0<pf){
      for(int i = a0+1; i <= pf; i++){
        s.write(i);
        raiz = resolve_eq(a0-i, a2, a3);
        intervalo = raiz*1000-ultimo;
        delay(intervalo);
        ultimo=raiz*1000;
      }
    }else{
      for(int i = a0-1; i >= pf; i--){
        s.write(i);
        raiz = resolve_eq(a0-i, a2, a3);
        intervalo = raiz*1000-ultimo;
        delay(intervalo);
        ultimo=raiz*1000;
      }
    }
    last_pos=pf;
  }
  void mover(int pf, int spd){
    if(pf == last_pos) return;
    if(spd < 1 || spd > 10) spd=5;
    float a2, a3, raiz;
    int intervalo;
    int a0=last_pos;
    int tf = 250*(pf-a0)/(3*spd);
    int ultimo = 0;
    
    if(a0>pf) tf *= -1;
    a2 = (3.0/pow((tf/1000.0),2)) * (pf-a0);
    a3 = (-2.0/pow((tf/1000.0),3)) * (pf-a0);
  
    if(a0<pf){
      for(int i = a0+1; i <= pf; i++){
        s.write(i);
        raiz = resolve_eq(a0-i, a2, a3);
        intervalo = raiz*1000-ultimo;
        delay(intervalo);
        ultimo=raiz*1000;
      }
    }else{
      for(int i = a0-1; i >= pf; i--){
        s.write(i);
        raiz = resolve_eq(a0-i, a2, a3);
        intervalo = raiz*1000-ultimo;
        delay(intervalo);
        ultimo=raiz*1000;
      }
    }
    last_pos=pf;
  }
  int read(){
    return last_pos;  
  }
  boolean attached(){
    return s.attached(); 
  }
  void detach(){
    s.detach();  
  }
};
