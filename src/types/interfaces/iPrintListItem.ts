import ISong from '../models/iSong';

export default interface IPrintListItem {
  song: ISong;
  areChordsVisible: boolean;
  hasMonoFont: boolean;
  transShift: number;
  shouldPrintBnW: boolean;
  orderId: number;
}
