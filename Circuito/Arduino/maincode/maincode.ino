// Librerias
#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <Arduino.h>

#include <DHT.h>

#include <Wire.h>
#include <BH1750.h> // Luxometro

// Configuraciones
  // Wifi
  const char* ssid = "Red EATA"; // Nombre wifi
  const char* password = ""; // Contraseña wifi

  IPAddress local_IP(192,168,10,251);
  IPAddress gateway(192,168,8,1);
  IPAddress subnet(255,255,252,0);
  // IPAddress gateway(192,168,0,1);
  // IPAddress subnet(255,255,255,0);
  IPAddress dns1(1, 1, 1, 1);
  IPAddress dns2(1, 0, 0, 1);
  
  WebServer server(80);
  // Conexion con backend
  String serverip = "http://192.168.10.250:3000";
  // Sensores
    //DHT 11 (Temp y humedad)
      #define DHTPIN 4 // Pin del dht
      #define DHTTYPE DHT11 // Tipo del dht
      DHT dht(DHTPIN, DHTTYPE); // Inicializamos dht
    // Humedad del suelo
      #define pinHumedad1 34
      #define pinHumedad2 35
      #define pinHumedad3 32
      const int AirValue = 2700;   
      const int WaterValue = 1100; 
    // Luxometro
      BH1750 Luxometro;
      int daylight = 400;
    // Reles
      int luces = 0;
      int vent = 0;
      int riego = 0;

      #define pinluces 27
      #define pinvent 13
      #define pinriego 14
    // Configuraciones
      int configluz = 0;
      int configvent = 0;
      int configriego = 0;
    // Horario
      int currentHour;
      int currentMinute;
      int currentSecond;

// Metodos rutas
  void handle_OnRaiz() {
    server.send(200, "text/plain", "Servidor MCU funcionando correctamente");
  }

  void handle_OnGetSensors() {
    // Temperatura y humedad DHT11
      float h = dht.readHumidity(); // Leemos la humedad relativa
      float t = dht.readTemperature(); // Leemos la temperatura en grados centígrados (por defecto)
      float hic;
      // Comprobamos si ha habido algún error en la lectura
      if (isnan(h) || isnan(t)) {
        Serial.println("Error obteniendo los datos del sensor DHT11");
        h = -1;
        t = -1;
        hic = -1;
      }
      else {
        hic = dht.computeHeatIndex(t, h, false);
      }
      // Calcular el índice de calor en grados centígrados

    // Humedad del suelo
      int soilMoistureValue = analogRead(pinHumedad1);  //put Sensor insert into soil
      int soilmoisturePercent;
      if (isnan(soilMoistureValue)) {
        soilmoisturePercent = -1;
      }
      else {
        soilmoisturePercent = map(soilMoistureValue, AirValue, WaterValue, 0, 100);
        if(soilmoisturePercent >= 100){soilmoisturePercent = 100;}
        else if(soilmoisturePercent <=0){soilmoisturePercent = 0;}
      }

      int soilMoistureValue2 = analogRead(pinHumedad2);  //put Sensor insert into soil
      int soilmoisturePercent2;
      if (isnan(soilMoistureValue2)) {
        soilMoistureValue2 = -1;
      }
      else {
        soilmoisturePercent2 = map(soilMoistureValue2, AirValue, WaterValue, 0, 100);
        if(soilmoisturePercent2 >= 100){soilmoisturePercent2 = 100;}
        else if(soilmoisturePercent2 <=0){soilmoisturePercent2 = 0;}
      }

      int soilMoistureValue3 = analogRead(pinHumedad3);  //put Sensor insert into soil
      int soilmoisturePercent3;
      if (isnan(soilMoistureValue3)) {
        soilMoistureValue3 = -1;
      }
      else {
        soilmoisturePercent3 = map(soilMoistureValue3, AirValue, WaterValue, 0, 100);
        if(soilmoisturePercent3 >= 100){soilmoisturePercent3 = 100;}
        else if(soilmoisturePercent3 <=0){soilmoisturePercent3 = 0;}
      }

     // Promedio de humedades del suelo:
      int humSuelo = (soilmoisturePercent + soilmoisturePercent2 + soilmoisturePercent3) / 3;
      
     // Luxometro
      uint16_t lux = Luxometro.readLightLevel();
      if (isnan(lux)) {
        lux = -1;
      }

     // Creamos el json e injectamos los datos
      StaticJsonDocument<192> doc;
      doc["hum"] = h;
      doc["temp"] = t;
      doc["indCal"] = hic;
      doc["humSuelo"] = humSuelo;
      doc["lux"] = lux;
      doc["vent"] = vent;
      doc["luces"] = luces;
      doc["riego"] = riego;
      String buf;
      serializeJson(doc, buf);
      server.send(200, "application/json", buf);
  }

  void handle_OnUpdateConfig() {
    String body = server.arg("plain");
    StaticJsonDocument<192> doc;
    deserializeJson(doc, body);
    configluz = doc["hsluz"];
    configvent = doc["riego"];
    configriego = doc ["ventilacion"];
    server.send(200, "text/plain", "Configuración actualizada correctamente");
  }

  int getMoisture() {
    // Humedad del suelo
      int soilMoistureValue = analogRead(pinHumedad1);  //put Sensor insert into soil
      int soilmoisturePercent;
      if (isnan(soilMoistureValue)) {
        soilmoisturePercent = -1;
      }
      else {
        soilmoisturePercent = map(soilMoistureValue, AirValue, WaterValue, 0, 100);
        if(soilmoisturePercent >= 100){soilmoisturePercent = 100;}
        else if(soilmoisturePercent <=0){soilmoisturePercent = 0;}
      }

      int soilMoistureValue2 = analogRead(pinHumedad2);  //put Sensor insert into soil
      int soilmoisturePercent2;
      if (isnan(soilMoistureValue2)) {
        soilMoistureValue2 = -1;
      }
      else {
        soilmoisturePercent2 = map(soilMoistureValue2, AirValue, WaterValue, 0, 100);
        if(soilmoisturePercent2 >= 100){soilmoisturePercent2 = 100;}
        else if(soilmoisturePercent2 <=0){soilmoisturePercent2 = 0;}
      }

      int soilMoistureValue3 = analogRead(pinHumedad3);  //put Sensor insert into soil
      int soilmoisturePercent3;
      if (isnan(soilMoistureValue3)) {
        soilMoistureValue3 = -1;
      }
      else {
        soilmoisturePercent3 = map(soilMoistureValue3, AirValue, WaterValue, 0, 100);
        if(soilmoisturePercent3 >= 100){soilmoisturePercent3 = 100;}
        else if(soilmoisturePercent3 <=0){soilmoisturePercent3 = 0;}
      }

     // Promedio de humedades del suelo:
      int humSuelo = (soilmoisturePercent + soilmoisturePercent2 + soilmoisturePercent3) / 3;
      return humSuelo;
  }
  
  void update_config() {
    // Guardamos la direccion a la que ejecutaremos el http request para obtener los valores de las configuraciones
    String serverPath = serverip + "/sendval";

    // Ejecutamos la peticion http en modo GET, al servidor que especificamos arriba
    HTTPClient http;    
    http.begin(serverPath.c_str());
    int httpResponseCode = http.GET();
    String payload = "{}"; 
  
    if (httpResponseCode>0) {
      // Si no hay errores, modificamos las variables de configuracion con el contenido de la respuesta
      Serial.print("UpdateVal HTTP Response code: ");
      Serial.println(httpResponseCode);
      DynamicJsonDocument doc(192);
      deserializeJson(doc, http.getStream());
      configluz = doc["hsluz"];
      configvent = doc["riego"];
      configriego = doc ["ventilacion"];
    }
    else {
      // Si hay un error, se imprime
      Serial.print("UpdateVal HTTP Error code: ");
      Serial.println(httpResponseCode);
    }
    // Se termina la peticion
    http.end();
  }
   
  void handle_NotFound() {
    server.send(404, "text/plain", "La URL no existe");
  }

  void getHour() {
    // Guardamos la direccion a la que ejecutaremos el http request para obtener la hora actual
    String serverPath = serverip + "/gethour";

    // Ejecutamos la peticion http en modo GET, al servidor que especificamos arriba
    HTTPClient http;    
    http.begin(serverPath.c_str());
    int httpResponseCode = http.GET();
  
    if (httpResponseCode>0) {
      // Si no hay errores, guardamos en una variable la hora
      DynamicJsonDocument doc(128);
      deserializeJson(doc, http.getStream());
      currentHour = doc["hour"];
      currentMinute = doc["minute"];
      currentSecond = doc["second"];
    }
    else {
      // Si hay un error, se imprime
      Serial.print("GetHour HTTP Error code: ");
      Serial.println(httpResponseCode);
    }
    // Se termina la peticion
    http.end();
  }
  
// Inicio
void setup() {
  Serial.begin(115200);

  // Configuración wifi
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  
  // Conectamos a wifi
  Serial.println("MAC: " + WiFi.macAddress()); // Imprimimos mac
  Serial.println("Conectando ");
  Serial.println(ssid);

  WiFi.begin(ssid, password); // Intentamos la conexion a la WIFI

  // Configuramos la ip estática
  if (!WiFi.config(local_IP, gateway, subnet, dns1)) {
    Serial.println("STA Failed to configure");
  }
  
  while (WiFi.status() != WL_CONNECTED)
       {  delay(1000);
          Serial.print(".");      // Escribiendo puntitos hasta que conecte
        }
  Serial.println("");
  Serial.println("WiFi conectado!");
  Serial.println("Nuestra IP: "); // Imprimir nuestra IP al conectar
  Serial.println(WiFi.localIP());

  // Actualizamos la configuracion de riego, ventilacion y luz
  update_config();

  // Ruteo
  server.on("/", handle_OnRaiz);
  server.on("/sensores", HTTP_GET, handle_OnGetSensors);
  server.on("/config", HTTP_POST, handle_OnUpdateConfig);
  server.onNotFound(handle_NotFound);
  // Inicializacion del servidor http
  server.begin();
  Serial.println("Servidor HTTP iniciado");

  // Inicializacion de sensores
  dht.begin(); // DHT11
  Wire.begin();
  Luxometro.begin(BH1750::CONTINUOUS_HIGH_RES_MODE); // Luxometro

  // Inicializacion de reles
  pinMode(pinluces, OUTPUT);
  pinMode(pinvent, OUTPUT);
  pinMode(pinriego, OUTPUT);

  // Inicializacion de tareas (threading)
  xTaskCreate(TaskVent,"ventYluz",2048,NULL,2,NULL);
  xTaskCreate(TaskRiego,"riego",2048,NULL,1,NULL);
}

// Variables globales que necesitamos que no se reinicien en cada loop
int minutosluzdia = 0;
int lastsecond = 0;
int counter = 0;
int lastminute = 0;
int lightminutes = 0;

void loop() {
  // Server
  server.handleClient();

  // Se prenden y apagan las luces, riego y ventilacion segun las variables.
  if (luces == 1) {
    digitalWrite(pinluces, HIGH);
  }
  else {
    digitalWrite(pinluces, LOW);
  }
  if (vent == 1) {
    digitalWrite(pinvent, HIGH);
  }
  else {
    digitalWrite(pinvent, LOW);
  }
  if (riego == 1) {
    digitalWrite(pinriego, HIGH);
  }
  else {
    digitalWrite(pinriego, LOW);
  }
}

void TaskVent(void *pvParameters) {
  while (1) {
    // Se obtiene la hora minutos y segundos actuales
    getHour();
    // Prender y apagar la ventilacion segun las configuraciones
    switch(configvent) {
      case 0:
        if (currentHour >= 22 && currentHour <= 23 && currentMinute <= 19) {
          vent = 1;
        }
        else if (currentHour == 0 && currentMinute <= 19) {
          vent = 1;
        }
        else if (currentHour >= 10 && currentHour <= 12 && currentMinute <= 19) {
          vent = 1;
        }
        else {vent = 0;}
        break;
       case 1:
        if (currentHour >= 0 && currentHour <= 3 && currentMinute <= 19) {
          vent = 1;
        }
        else if (currentHour >= 10 && currentHour <= 15 && currentMinute < 19) {
          vent = 1;
        }
        else if (currentHour >= 22 && currentHour <= 23 && currentMinute < 19) {
          vent = 1;
        }
        else {vent = 0;}
        break;
       case 2:
        if (currentMinute < 19) {
          vent = 1;
        }
        else {vent = 0;}
        break;
       case 3:
        vent = 1;
        break;
       case -1:
        vent = 0;
        break;
       default:
        vent = 0;
        break;
    }

    // En cada minuto, se mide la luz y se prenden y apagan las luces segun la configuracion
    if (currentMinute != lastminute) {
    if(currentMinute == 0 && currentHour == 8) {minutosluzdia = 0;}
    uint16_t lux = Luxometro.readLightLevel();
    lastminute = currentMinute;
    if (lux < daylight) {
      switch (configluz) {
        case 0:
          if (minutosluzdia < 540) {
            luces = 1;
            minutosluzdia++;
          }
          break;
        case 1:
          if (minutosluzdia < 630) {
            luces = 1;
            minutosluzdia++;
          }
        case 2:
          if (minutosluzdia < 720) {
            luces = 1;
            minutosluzdia++;
          }
        case 3:
          break;
        case -1:
          break;
        default:
          luces = 0;
      }
    }
    else {
      minutosluzdia++;
      luces = 0;
    }
   }
   if (configluz == 3) {
     luces = 1;
   }
   if (configluz == -1) {
     luces = 0;
   }
    vTaskDelay(60000 / portTICK_RATE_MS);
  }
}

void TaskRiego(void *pvParameters) {
  while(1) {
    // Cada 5 segundos se mide la humedad y se prende y apaga el riego segun la configuracion
    int soilMoisture = getMoisture();
    switch (configriego) {
      case 0:
        if(soilMoisture < 55) {
          riego = 1;
        }
        else {riego = 0;}
        break;
      case 1:
        if (soilMoisture < 65) {
          riego = 1;
        }
        else {riego = 0;}
        break;
      case 2:
        if (soilMoisture < 75) {
          riego = 1;
        }
        else {riego = 0;}
        break;
      case 3:
        riego = 1;
        break;
      case -1:
        riego = 0;
        break;
      default:
        riego = 0;
        break;
     }
    vTaskDelay(5000 / portTICK_RATE_MS);
  }
}
