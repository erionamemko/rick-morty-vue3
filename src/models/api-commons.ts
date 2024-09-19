export interface InfoType {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface ApiPaginatedResponse<DataType> {
  info: InfoType;
  results: DataType[];
}
