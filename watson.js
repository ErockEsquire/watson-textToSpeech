const fs = require('fs');
require('dotenv').config();
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.KEY,
  }),
  serviceUrl: process.env.ENDPOINT,
  // disableSslVerification: true,
});

const synthesizeParams = {
  text: `<p><s>Eric cannot come to the phone right now. <break time="200ms"/> Please leave a message, <prosody rate="-15%">after the beep</prosody></s></p>`,
  accept: 'audio/wav',
  voice: 'en-US_LisaV3Voice',
};

textToSpeech.synthesize(synthesizeParams)
  .then(response => {
    // only necessary for wav formats,
    // otherwise `response.result` can be directly piped to a file
    return textToSpeech.repairWavHeaderStream(response.result);
  })
  .then(buffer => {
    fs.writeFileSync('speech.wav', buffer);
  })
  .catch(err => {
    console.log('error:', err);
  });

textToSpeech.listVoices()
  .then(voices => {
    console.log(JSON.stringify(voices, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });

  const getVoiceParams = {
    voice: 'ko-KR_YoungmiVoice',
  };

  
// textToSpeech.getVoice(getVoiceParams)
//   .then(voice => {
//     console.log(JSON.stringify(voice, null, 2));
//   })
//   .catch(err => {
//     console.log('error:', err);
//   });

// const synthesizeParams = {
//   text: `<p><s><prosody rate="-10%">Good morning. In less than an hour, aircraft from here will join others from around the world. And you will be launching the largest aerial battle in this history of mankind.
//   <break time="300ms"/>
//   Mankind. <break time="300ms"/>-- that word should have new meaning for all of us today.<break time="200ms"/>
  
//   We can't be consumed by our petty differences anymore.<break time="200ms"/>
  
//   We will be united in our common interests.<break time="200ms"/>
  
//   Perhaps its fate that today <break time="200ms"/> is the 4th of July, <break time="200ms"/>and you will once again be fighting for our freedom, not from tyranny, <break time="200ms"/>oppression, <break time="200ms"/> or persecution, <break time="300ms"/> -- but from annihilation.
  
//   We're fighting for our right to live,<break time="500ms"/> to exist.<break time="500ms"/>.
  
//   And should we win the day, the 4th of July will no longer be known as an American holiday, but as the day when the world declared in one voice.</prosody>
  
//   We will not go quietly <prosody rate="-15%">into the night!</prosody>
//   <break time="500ms"/>
  
//   We will not vanish <prosody rate="-15%">without a fight!</prosody>
//   <break time="500ms"/>
  
//   We're going to live on!<break time="800ms"/>
  
//   We're going to survive!<break time="800ms"/>
  
//   Today, <break time="200ms"/>we celebrate <prosody rate="-20%"> our Independence Day.</prosody></s></p>`,
//   accept: 'audio/wav',
//   voice: 'en-US_EmilyV3Voice',
// };