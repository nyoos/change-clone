export default class Discussion {
  constructor(author = "", comment = "", likes = []) {
    this.author = author;
    this.comment = comment;
    this.likes = likes;
  }
}
