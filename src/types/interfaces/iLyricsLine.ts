import IChordPosition from './iChordPosition';

export default interface ILyricsLine {
  chordPositions: IChordPosition[];
  textLine: string;
  chordLine: string;
}
