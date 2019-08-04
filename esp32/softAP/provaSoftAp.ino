#include <Adafruit_Fingerprint.h>
#include <ArduinoJson.h>
#include <SPI.h>
#include <WiFi.h>
#include <WiFiClient.h>

//Sensor global variables
HardwareSerial mySerial(1);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

//Network Credentials
const char* ssid     = "LoreCase";
const char* password = "11235813";

IPAddress local_IP(192, 168, 1, 42);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 0, 0);
IPAddress primaryDNS(8, 8, 8, 8);   
IPAddress secondaryDNS(8, 8, 4, 4); 

WiFiServer server(80);

// Variable to store the HTTP request
String header;

// Auxiliar variables to store the current led state
String greenLedState = "off";
String redLedState = "off";

const int greenLed = 5;
const int redLed = 15;
const int yellowLed = 4;

String msg;
boolean response=false;
int id=0;
uint8_t enrollID;

void setup() {

  //Starting Serial
  Serial.begin(9600);
  while (!Serial);
  delay(100);

  //Setting up UART serial ports
  mySerial.begin(57600,SERIAL_8N1,26,25);

  //Initialize pin modes
  pinMode(greenLed, OUTPUT);
  pinMode(redLed, OUTPUT);
  pinMode(yellowLed, OUTPUT);

  //initialize pin states
  digitalWrite(greenLed, LOW);
  digitalWrite(redLed, LOW);
  digitalWrite(yellowLed, LOW);

  // Connect to Wi-Fi network with SSID and password
  Serial.print("Connecting to ");
  Serial.println(ssid);
  //WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS);
  //WiFi.begin(ssid, password);
  //while (WiFi.status() != WL_CONNECTED) {
  //  delay(500);
  //  Serial.print(".");
  //}
  Serial.println(WiFi.softAP(ssid, password)? "Ready" : "Failed!");

  delay(100);
  
  WiFi.softAPConfig(local_IP, gateway, subnet);
  
  
  // Print local IP address and start web server
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.softAPIP());
  server.begin();
}

void loop() {
  WiFiClient client = server.available();   // Listen for incoming clients

  if (client) {                             
    Serial.println("New Client.");          
    String currentLine = "";                
    while (client.connected()) {          
      if (client.available()) {             
        char c = client.read();             
        Serial.write(c);                    
        header += c;
        if (c == '\n') { 
                             
          //end of the client HTTP request, sending a response:
          if (currentLine.length() == 0) {
            
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:json");
            client.println("Access-Control-Allow-Credentials:true");
            client.println("Access-Control-Allow-Origin:*");
            client.println("Access-Control-Allow-Methods: GET, POST");
            client.println("Access-Control-Allow-Headers:x-csrftoken");
            client.println("Connection: close");
            client.println();
            
            if (header.indexOf("GET /match") >=0){
              if (!finger.verifyPassword()) {
                msg = "Error! Didn't find the sensor! Try again!";
                StaticJsonDocument<512> doc;
                doc["msg"]=msg;
                doc["response"]=response;
                doc["id"]=id;
                serializeJson(doc, Serial);
                serializeJson(doc,client);
                client.println();
              }else{
              int temp = 0;
              digitalWrite(yellowLed, HIGH);
              Serial.println("FIRING");
              finger.fingerID=0;
              while(temp<=100 && id<=0){
                id = getFingerprintIDez();
                delay(50);
                temp=temp+1;
              }
              digitalWrite(yellowLed,LOW);
              temp=0;
              
              if(id<=0){
                msg = "Finger recognition failed!";
                digitalWrite(redLed, HIGH);
                delay(2000);
                digitalWrite(redLed, LOW);
              }else{
                response=true;
                msg="Success!";
                digitalWrite(greenLed, HIGH);
                delay(2000);
                digitalWrite(greenLed, LOW);
              }
              StaticJsonDocument<512> doc;
              doc["msg"]=msg;
              doc["response"]=response;
              doc["id"]=id;
              serializeJson(doc, Serial);
              serializeJson(doc,client);
              client.println();
             }
             }
             else if (header.indexOf("POST /enroll") >=0){
              if (!finger.verifyPassword()) {
                msg = "Error! Didn't find the sensor! Try again!";
                StaticJsonDocument<512> doc;
                doc["msg"]=msg;
                doc["response"]=response;
                doc["id"]=id;
                serializeJson(doc, Serial);
                serializeJson(doc,client);
                client.println();
              }else{
                Serial.println("Firing!");
                String asd;
                char temp;
                while(client.available()){
                    temp=client.read();
                    asd+=temp;
                 }
                
                Serial.println();
                
                String subasd = asd.substring(4);
                enrollID= subasd.toInt();
                Serial.println(enrollID);
                Serial.println("Arrivato!");
                int check =getFingerprintEnroll();
                Serial.println(enrollID);
                if( check > 0){
                  id= enrollID;
                  response=true;
                  msg="Success, loading your page...";
                  
                } else{
                  msg="An error occurred, please follow the guidelines and try again.";
                }
                enrollID =0;
                subasd = "";
                asd="";
                
                StaticJsonDocument<512> doc;
                doc["msg"]=msg;
                doc["response"]=response;
                doc["id"]=id;
                serializeJson(doc, Serial);
                serializeJson(doc,client);
                client.println();
              }
            } else if (header.indexOf("GET /deleteAll") >=0){
              if (!finger.verifyPassword()) {
                msg = "Error! Didn't find the sensor! Try Again";
                StaticJsonDocument<512> doc;
                doc["msg"]=msg;
                doc["response"]=response;
                doc["id"]=id;
                serializeJson(doc, Serial);
                serializeJson(doc,client);
                client.println();
              }else{

                uint8_t check;

                check = finger.emptyDatabase();
                if(check == FINGERPRINT_OK){
                  
                  response=true;
                  msg="Successfully erased all the fingerprint from the sensor!";
                  
                }else{
                  msg="An error occurred, please follow the guidelines and try again.";
                }

                
                StaticJsonDocument<512> doc;
                doc["msg"]=msg;
                doc["response"]=response;
                doc["id"]=id;
                serializeJson(doc, Serial);
                serializeJson(doc,client);
                client.println();
              }
            } else if (header.indexOf("POST /delete") >=0){
              if (!finger.verifyPassword()) {
                msg = "Error! Didn't find the sensor! Try again!";
                StaticJsonDocument<512> doc;
                doc["msg"]=msg;
                doc["response"]=response;
                doc["id"]=id;
                serializeJson(doc, Serial);
                serializeJson(doc,client);
                client.println();
              }else{


                Serial.println("Firing!");
                String asd;
                char temp;
                while(client.available()){
                    temp=client.read();
                    asd+=temp;
                 }
                
                Serial.println();
                
                String subasd = asd.substring(4);
                enrollID= subasd.toInt();
                Serial.println(enrollID);
                Serial.println("Arrivato!");

                Serial.print("Deleting ID #");
                Serial.println(enrollID);
                uint8_t check;
                check = deleteFingerprint(enrollID);

                if(check == FINGERPRINT_OK){
                  id= enrollID;
                  response=true;
                  msg="Successfully erased the fingerprint from the sensor!";
                  
                }else{
                  msg="An error occurred, please follow the guidelines and try again.";
                }

                enrollID =0;
                subasd = "";
                asd="";
                
                
                StaticJsonDocument<512> doc;
                doc["msg"]=msg;
                doc["response"]=response;
                doc["id"]=id;
                serializeJson(doc, Serial);
                serializeJson(doc,client);
                client.println();
              }
            } else if (header.indexOf("GET /getNum") >=0){
              if (!finger.verifyPassword()) {
                msg = "Error! Didn't find the sensor! Try again!";
                StaticJsonDocument<512> doc;
                doc["msg"]=msg;
                doc["response"]=response;
                doc["id"]=id;
                serializeJson(doc, Serial);
                serializeJson(doc,client);
                client.println();
              }else{
                id = getNum();
                msg = "Success!";
                response = true;
                StaticJsonDocument<512> doc;
                doc["msg"]=msg;
                doc["response"]=response;
                doc["id"]=id;
                serializeJson(doc, Serial);
                serializeJson(doc,client);
                client.println();
              }
            } else if (header.indexOf("GET /getConnection") >=0){
              if (!finger.verifyPassword()) {
                msg = "Error! Didn't find the sensor! Try again!";
                StaticJsonDocument<512> doc;
                doc["msg"]=msg;
                doc["response"]=response;
                doc["id"]=id;
                serializeJson(doc, Serial);
                serializeJson(doc,client);
                client.println();
              }else{
                msg = "Success!";
                response = true;
                StaticJsonDocument<512> doc;
                doc["msg"]=msg;
                doc["response"]=response;
                doc["id"]=id;
                serializeJson(doc, Serial);
                serializeJson(doc,client);
                client.println();
              }
            }
       
            msg="";
            response=false;
            id=0;
           
            // Ending HTTP Response with another blank line
            client.println();
            
            // Breaking out of the while loop
            break;
            
          } else { // got a newline, clearing currentLine
            currentLine = "";
          }
        } else if (c != '\r') {  //anything else but a carriage return character,
          currentLine += c;      // adding it to the end of the currentLine
        }
      }
    }
    // Clearing the header variable
    header = "";
    
    // Closing the connection
    client.stop();
    Serial.println("Client disconnected.");
    Serial.println("");
  }
}

int getNum(){
  finger.getTemplateCount();
  Serial.print("Sensor contains "); Serial.print(finger.templateCount); Serial.println(" templates");
  int temp = finger.templateCount;
  return temp;
}


int getFingerprintIDez() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK){
    Serial.println("nope!");
    return -1;
  }
  

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK){
    Serial.println("nope2!");
    return -1;
  }

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK){ 
    Serial.println("nope!");
    return -1;
  }
  
  // found a match!
  Serial.print("Found ID #"); Serial.print(finger.fingerID); 
  Serial.print(" with confidence of "); Serial.println(finger.confidence);
  return finger.fingerID; 
}

int getFingerprintEnroll() {

  int p = -1;
  Serial.print("Waiting for valid finger to enroll as #"); Serial.println(enrollID);
  digitalWrite(greenLed, HIGH); 

  int count= 0;
  bool found = false;
  while (p != FINGERPRINT_OK && count<100 && !found) {
    p = finger.getImage();
    
    switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image taken");
      found= true;
      break;
    case FINGERPRINT_NOFINGER:
      Serial.println(".");
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      break;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      break;
    default:
      Serial.println("Unknown error");
      break;
    }
    count=count+1;
    delay(50);
  }
  delay(2000);
  digitalWrite(greenLed, LOW);

  if(!found){
    return -1;
  }

  // OK success!

  p = finger.image2Tz(1);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return -1;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return -1;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return -1;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return -1;
    default:
      Serial.println("Unknown error");
      return -1;
  }
  
  
  
  digitalWrite(yellowLed, HIGH);
  
  Serial.println("Remove finger");
  delay(2000);
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }
  delay(2000);
  digitalWrite(yellowLed, LOW);
  
  
  
  
  
  Serial.print("ID "); Serial.println(enrollID);
  p = -1;
  digitalWrite(greenLed, HIGH);
  Serial.println("Place same finger again");
  count=0;
  found = false;
  while (p != FINGERPRINT_OK && count<100 && !found) {
    p = finger.getImage();
    
    switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image taken");
      found = true;
      break;
    case FINGERPRINT_NOFINGER:
      Serial.print(".");
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      break;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      break;
    default:
      Serial.println("Unknown error");
      break;
    }
    delay(50);
    count=count+1;
  }
  count=0;

  if(!found){
    return -1;
  }

  // OK success!

  p = finger.image2Tz(2);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return -1;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return -1;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return -1;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return -1;
    default:
      Serial.println("Unknown error");
      return -1;
  }
  
  // OK converted!

  digitalWrite(greenLed, LOW);
  
  Serial.print("Creating model for #");  Serial.println(enrollID);
  
  p = finger.createModel();
  if (p == FINGERPRINT_OK) {
    Serial.println("Prints matched!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return -1;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    Serial.println("Fingerprints did not match");
    return -1;
  } else {
    Serial.println("Unknown error");
    return -1;
  }   
  
  Serial.print("ID "); Serial.println(enrollID);
  p = finger.storeModel(enrollID);
  if (p == FINGERPRINT_OK) {
    Serial.println("Stored!");
    return enrollID;
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return -1;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Could not store in that location");
    return -1;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Error writing to flash");
    return -1;
  } else {
    Serial.println("Unknown error");
    return -1;
  }   
}


uint8_t deleteFingerprint(uint8_t id) {
  uint8_t p = -1;
  
  p = finger.deleteModel(id);

  if (p == FINGERPRINT_OK) {
    Serial.println("Deleted!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return -1;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Could not delete in that location");
    return -1;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Error writing to flash");
    return -1;
  } else {
    Serial.print("Unknown error: 0x"); Serial.println(p, HEX);
    return -1;
  }   
}
