export default class Discussion {
  constructor(author = "", comment = "", likes = 0) {
    this.author = author;
    this.comment = comment;
    this.likes = likes;
  }
}
