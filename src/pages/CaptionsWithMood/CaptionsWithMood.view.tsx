import { FC, useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import fetchTone from 'utils/fetchTone';

import { Tones } from './CaptionsWihMood.types';

interface Props extends RouteComponentProps {}
type FullTranscript = Array<{
  text: string;
  tones: Array<Tones>;
}>;

const Home: FC<Props> = () => {
  const { finalTranscript, resetTranscript } = useSpeechRecognition();
  const [fullTranscript, setFullTranscript] = useState<FullTranscript>([]);

  const getTones = useCallback(
    async (text: string) => {
      try {
        const tones = await fetchTone(text);

        setFullTranscript(
          (fullTranscript: FullTranscript): FullTranscript => [
            ...fullTranscript,
            {
              text: finalTranscript,
              tones,
            },
          ]
        );

        resetTranscript();

        return tones;
      } catch {
        return [];
      }
    },
    [finalTranscript, resetTranscript]
  );

  useEffect(() => {
    if (finalTranscript !== '') {
      getTones(finalTranscript);
    }
  }, [finalTranscript, getTones]);

  return (
    <>
      <h1>Live captions with mood</h1>

      <button
        onClick={() =>
          SpeechRecognition.startListening({
            clearTranscriptOnListen: true,
            continuous: true,
          })
        }
        type="button"
      >
        Start
      </button>

      <button onClick={() => SpeechRecognition.stopListening()} type="button">
        Stop
      </button>

      <div>
        {fullTranscript.map(({ text, tones }, index: number) => (
          <p key={`${text}_${index}`}>
            {text}{' '}
            {tones && (
              <em>
                {tones
                  .reduce(
                    (arr: string[], { tone_name }) => [...arr, tone_name],
                    []
                  )
                  .join(', ')}
              </em>
            )}
          </p>
        ))}
      </div>
    </>
  );
};

export default Home;
