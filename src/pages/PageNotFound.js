import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <div>
      <div className="mx-10 md:w-600px md:mx-auto mt-40 bg-red-100 p-8 text-red-800 space-y-3">
        <h1>We couldn't find the page you were looking for. </h1>
        <p>
          The URL may have been incorrect or the page may have been deleted.
        </p>
        <p>
          Return to the{" "}
          <span className="text-theme-red hover:text-red-800">
            <Link to="/">homepage</Link>
          </span>
          .
        </p>
      </div>
    </div>
  );
}
