export class MWError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "MediaWikiError";
  }
}
