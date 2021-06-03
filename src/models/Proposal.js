export default class Proposal {
  constructor(title, description, author, supporters, amendments, discussions) {
    this.title = title;
    this.description = description;
    this.author = author;
    this.supporters = supporters;
    this.amendments = amendments;
    this.discussions = discussions;
  }
}
