import { FC, useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import fetchNLU from 'utils/fetchNLU';

import { Emotion } from './CaptionsWithEmotion.types';

interface Props extends RouteComponentProps {}
type FullTranscript = Array<{
  text: string;
  emotion: Array<Emotion>;
}>;

const Home: FC<Props> = () => {
  const { finalTranscript, resetTranscript } = useSpeechRecognition();
  const [fullTranscript, setFullTranscript] = useState<FullTranscript>([]);

  const getTones = useCallback(
    async (text: string) => {
      try {
        const emotion = await fetchNLU(text);

        setFullTranscript(
          (fullTranscript: FullTranscript): FullTranscript => [
            ...fullTranscript,
            {
              text: finalTranscript,
              emotion,
            },
          ]
        );

        resetTranscript();
      } catch {}
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
      <h1>Live captions</h1>

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
        {fullTranscript.map(({ text }, index: number) => (
          <p key={`${text}_${index}`}>{text}</p>
        ))}
      </div>
    </>
  );
};

export default Home;
