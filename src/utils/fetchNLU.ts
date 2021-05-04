import { Emotion } from 'pages/CaptionsWithEmotion/CaptionsWithEmotion.types';

const fetchNLU = async (text: string): Promise<Emotion[]> => {
  try {
    const entitiesRes = await fetch('/.netlify/functions/nlu', {
      method: 'POST',
      body: JSON.stringify({
        text,
      }),
    });
    const entities = await entitiesRes.json();

    return entities;
  } catch {
    return [];
  }
};

export default fetchNLU;
