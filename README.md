# watson-textToSpeech

## Basic Node code to send request for Watson Text to Speech API.  
Requires a .env file with KEY and ENDPOINT variables to make call to Watson API.  

### synthesizeParams  
__text__ decides the text  
__accept__ decides sound format  
__voice__ decides voice of the speech  

### listVoices()  
Will return a console.log list of all available voices.  
Voice is currently set to Lisa as denoted by the __voice:'en-US_LisaV3Voice'__  

## Run  
Running node watson.js will send the API request. The response will create an audio file in directory named "speech" denoted by __accept__ , with __text__ spoken by __voice__ .
