import NaturalLanguageUnderstandingV1 from 'ibm-watson/natural-language-understanding/v1';
import { IamAuthenticator } from 'ibm-watson/auth';

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: process.env.REACT_APP_WATSON_NLU_KEY || '',
  }),
  serviceUrl: process.env.REACT_APP_WATSON_NLU_URL || '',
});

export async function handler(event, context, callback) {
  const { text } = JSON.parse(event.body);
  const analyzeParams = {
    text: text,
    features: {
      entities: {
        emotion: true,
        sentiment: true,
        limit: 2,
      },
    },
  };

  try {
    const { result } = await naturalLanguageUnderstanding.analyze(
      analyzeParams
    );

    console.log({ usage: result.usage, entities: result.entities });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'ok',
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
