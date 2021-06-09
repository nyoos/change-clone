export default class Proposal {
  constructor(
    title = "",
    description = "",
    image = "",
    target = "",
    author = "",
    supporters = [],
    amendments = [],
    discussions = []
  ) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.target = target;
    this.author = author;
    this.supporters = supporters;
    this.amendments = amendments;
    this.discussions = discussions;
  }
}
