import { EStatusResonse } from "../enums/baseEnum";

export interface IResponseList<T> {
  code: number;
  data: {
    items: T[];
    totalItems: number;
  };
  message: string;
  status: EStatusResonse;
}

export interface IResponseItem<T> {
  code: number;
  data: T;
  message: string;
  status: EStatusResonse;
}
export interface IResponseError {
  code: number;
  data: any;
  message: string;
  status: EStatusResonse;
}
export interface IResponseErrorFromOpeniddict {
  error: string;
  error_description: string;
  error_uri: string;
}
