import { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

interface Props extends RouteComponentProps {}

const LiveCaptions: FC<Props> = () => {
  const { finalTranscript, resetTranscript } = useSpeechRecognition();
  const [fullTranscript, setFullTranscript] = useState<string[]>([]);

  useEffect(() => {
    if (finalTranscript !== '') {
      setFullTranscript((fullTranscript) => [
        ...fullTranscript,
        finalTranscript,
      ]);

      resetTranscript();
    }
  }, [finalTranscript, resetTranscript]);

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
        {fullTranscript.map((item: string) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </>
  );
};

export default LiveCaptions;
