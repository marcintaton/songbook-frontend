export const defaultSongMetadata = {
  _id: '',
  title: '',
  tags: [],
};

export default interface ISongMetadata {
  _id: string;
  title: string;
  tags: string[];
}
