# Invernadero

El invernadero automatizado y monitoreado es un proyecto llevado a cabo en el úlitmo año del secundario como monografía. A continuación se explican todas las partes del proyecto.

Informe con información detallada: https://docs.google.com/document/d/1FhA-2R22m6VjRX9H3Iv1nAXqOsCNjsUM5NXob_GzLWQ/edit?usp=sharing

## Backend

Se encuentra en el directorio ./Backend.

### ¿Cómo funciona?
Utiliza express y conecta el frontend con la base de datos, permitiendo al usuario acceder a los datos actuales e históricos del invernadero.
### ¿Cómo usar?
1. Instalar dependencias con comando "npm install"
2. Ejecutar comando "node src/index.js"

## Frontend (App y Web)

Se encuentra en el directorio ./InvernaderoApp.

### ¿Cómo funciona?
Utiliza angular e Ionic para poder compilar en android y ios.
### ¿Cómo usar?
1. Instalar dependencias con comando "npm install"
2. Ejecutar comando "ionic serve"

## Circuito Electrónico

Se encuentra en el directorio ./Circuito. Contiene todos los archivos que se ejecutan en el microcontrolador (MCU ESP32) y sus correspondientes maquetas (Fritzing).
