import { FC, useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

import fetchTone from 'utils/fetchTone';

import { Tones } from './CaptionsWithMoodChart.types';

interface Props extends RouteComponentProps {}
type FullTranscript = Array<{
  text: string;
  tones: Array<Tones>;
}>;
type ChartData = Array<{
  x: number,
  y: number,
}>;

const MOODS: {
  [key: string]: number;
} = {
  joy: 8,
  confident: 7,
  analytical: 6,
  neutral: 5,
  tentative: 4,
  fear: 3,
  sadness: 2,
  anger: 1,
} as const;

const CaptionsWithMoodChart: FC<Props> = () => {
  const { finalTranscript, resetTranscript } = useSpeechRecognition();
  const [chartData, setChartData] = useState<ChartData>([
    { x: 1, y: 4 },
    { x: 2, y: 2 },
    { x: 3, y: 5 },
    { x: 4, y: 6 },
    { x: 5, y: 3 },
  ]);
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

        const { tone_id } = tones?.[0] || {};

        setChartData(chartData => [
          ...chartData,
          {
            x: chartData.length + 1,
            y: MOODS[tone_id || 'neutral'],
          }
        ]);

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
      <h1>Live captions with mood chart</h1>

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

      <div style={{ height: '400px' }}>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
            data={chartData}
            domain={{ y: [0, 9] }}
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc"}
            }}
          />
        </VictoryChart>
      </div>

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

export default CaptionsWithMoodChart;
