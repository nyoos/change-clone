import { getImageFromURL } from "../api/util";

export default class User {
  constructor(name, description, image, proposals, comments) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.proposals = proposals;
    this.comments = comments;
  }
}
