export class ResponseWrapper<T> {
  constructor(readonly message: string, readonly data: T) {}
}
