![Trailbit Logo](./app/assets/images/trailbit_banner.png)

# Trailbit

Trailbit es una aplicación móvil revolucionaria desarrollada para MoviePlay, una empresa recientemente establecida en Argentina y especializada en la industria cinematográfica. La aplicación permite a los usuarios ver y recomendar películas, prometiendo transformar el mercado. Desarrollada con un backend robusto y desplegada en la nube, Trailbit busca mejorar la experiencia de ver películas para todos los usuarios.

## Integrantes del Equipo 04

- Lucas Hernan Muñoz lucamunoz@uade.edu.ar 1141508
- Alejandro Susmelj asusmelj@uade.edu.ar 1139793
- Felipe Costa cfelipe@uade.edu.ar 1135873
- Ignacio Cesarani icesarani@uade.edu.ar 1137115
- Cristian Merenda cmerenda@uade.edu.ar 1110652

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js (preferiblemente versión LTS)
- npm (viene incluido con Node.js) o yarn
- Git

### Opcional

- Para correr en Android:
  - Android Studio con Android SDK instalado
  - Un emulador de Android configurado o un dispositivo Android conectado

- Para correr en iOS:
  - Un dispositivo con macOS y Xcode instalado
  - CocoaPods (sudo gem install cocoapods)

## Configuración Inicial

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/lucashmunoz/TrailbitG04DAI.git
   cd trailbitg04dai
   ```
   
2. **Instalar dependencias:**

   ```bash
   npm install
   # o
   yarn install
   ```
3. **Ejecutar la Aplicacion:**

   - Android: (Asegúrate de que un emulador de Android esté en ejecución o conecta un dispositivo Android.)
      1. Iniciar Metro:
         ```bash
         npx react-native start
         ```
      2. En una nueva terminal, compilar y ejecutar la aplicación en el emulador o dispositivo:
         ```bash
         npx react-native run-android
         ```
   - IOS: (Asegúrate de que un simulador de iOS esté en ejecución.)
      1. Instalar dependencias nativas de iOS:
         ```bash
         cd ios
         pod install
         cd ..
         ```
      2. Iniciar Metro (el servidor de desarrollo):
         ```bash
         npx react-native start
         ```
      3. En una nueva terminal, compilar y ejecutar la aplicación en el simulador de iOS:
         ```bash
         npx react-native run-ios
         ```
         
