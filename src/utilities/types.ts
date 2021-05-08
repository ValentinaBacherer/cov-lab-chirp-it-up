// -> here I didn't know how to handle this
export interface ChirpsObject {
  nextid: number | string;
  '1'?: SingleChirp;
  '2'?: SingleChirp;
  '3'?: SingleChirp;
}

export interface SingleChirp {
  id?: string;
  user: string;
  text: string;
  date?: string;
}
