# Background Removal Web App
Test it [online](https://background-removal-blue.vercel.app/)

## Overview
This project is a browser-based background removal tool powered by AI, built using **HTML**, **CSS**, and **JavaScript**. It leverages the **Transformers.js** library to run a pre-trained machine learning model directly in the browser. Once the model is loaded, the application can function **offline**, making it lightweight and accessible without requiring constant internet connectivity.

## Features
- **AI-Powered Background Removal**: Removes backgrounds from images using a machine learning model.
- **Browser-Based**: Runs entirely in the browser with no need for server-side processing.
- **Offline Support**: After the model is loaded, the application works without an internet connection.
- **Built with Transformers.js**: Utilizes the Transformers.js library for efficient model inference in JavaScript.
- **Model**: Xenova/modnet

## Technologies Used
- **HTML**: Structures the web interface.
- **CSS**: Styles the application for a clean and user-friendly experience.
- **JavaScript**: Handles the logic for image processing and model integration.
- **Transformers.js**: A JavaScript library for running machine learning models in the browser.

## Getting Started

### Prerequisites
- A modern web browser (e.g., Chrome, Firefox, Edge) with JavaScript enabled.
- No additional software or server setup is required.

### Usage
1. Open the application in your browser.
2. Wait for the AI model to load (requires an internet connection for the initial load).
3. Upload an image or select a sample image.
4. The model will process the image and remove the background.
5. Download (right click > save) or view the processed image directly in the browser.

> **Note**: The model works better with people or animal images.

## Limitations
- The initial model loading requires an internet connection.
- Performance may vary depending on the browser and device hardware.
- Use people or animal images.

## Acknowledgments
- Built with [Transformers.js](https://huggingface.co/docs/transformers.js/) by Hugging Face.