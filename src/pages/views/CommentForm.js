import ActionButton from "../components/ActionButton";

export default function CommentForm({ comment, changeComment, submitComment }) {
  return (
    <div>
      <h2 className="text-center mt-3 pb-3">Add a comment</h2>
      <form>
        <textarea
          className="long-text-area"
          name="comment"
          rows="5"
          placeholder="Comment"
          onChange={changeComment}
          value={comment}
        ></textarea>
        <div className="mt-3 flex justify-center">
          <ActionButton type="submit" onClick={submitComment} text="Submit" />
        </div>
      </form>
    </div>
  );
}
