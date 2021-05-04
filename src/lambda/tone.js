import ToneAnalyzerV3 from 'ibm-watson/tone-analyzer/v3';
import { IamAuthenticator } from 'ibm-watson/auth';

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: process.env.REACT_APP_WATSON_TONE_KEY || '',
  }),
  serviceUrl: process.env.REACT_APP_WATSON_TONE_URL || '',
});

export async function handler(event, context, callback) {
  const { text } = JSON.parse(event.body);
  const toneParams = {
    toneInput: { text: text },
    contentType: 'application/json',
  };

  try {
    const { result } = await toneAnalyzer.tone(toneParams);

    return {
      statusCode: 200,
      body: JSON.stringify({
        tones: result.document_tone.tones,
      }),
    };
  } catch {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'not ok',
      }),
    };
  }
}
