import { Tones } from 'pages/CaptionsWithMood/CaptionsWihMood.types';

const fetchTone = async (text: string): Promise<Tones[]> => {
  try {
    const tone = await fetch('/.netlify/functions/tone', {
      method: 'POST',
      body: JSON.stringify({
        text,
      }),
    });
    const { tones } = await tone.json();

    return tones;
  } catch {
    return [];
  }
};

export default fetchTone;
