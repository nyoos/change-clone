import ActionButton from "../components/ActionButton";
import StandardButton from "../components/StandardButton";

export default function CommentForm({
  comment,
  error,
  changeComment,
  submitComment,
  closeForm,
}) {
  return (
    <div className="w-full pt-2">
      <form>
        <textarea
          className="w-full text-theme-black"
          name="comment"
          rows="3"
          placeholder="I'm signing because..."
          onChange={changeComment}
          value={comment}
        ></textarea>
        <div className="text-sm text-red-800 mb-2">{error}</div>
        <div className="flex justify-between space-x-3">
          <ActionButton
            type="submit"
            onClick={submitComment}
            text="Submit"
            styling="w-full h-9 text-sm"
          />
          <StandardButton
            type="button"
            onClick={closeForm}
            text="Cancel"
            styling="w-full h-9 text-sm flex items-center justify-center"
          />
        </div>
      </form>
    </div>
  );
}
