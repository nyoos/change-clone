export function Footer() {
  return (
    <div className="h-48 bg-gray-100 px-2 w-full border-t border-gray-300 pt-5 text-gray-500">
      <div className="w-full h-full mx-auto md:w-768px text-sm flex flex-col">
        <p>
          This website is a clone of{" "}
          <a
            className="text-theme-red-dark hover:text-gray-500 underline"
            href="change.org"
          >
            change.org
          </a>
          , made for the final project of{" "}
          <a
            className="text-theme-red-dark hover:text-gray-500 underline"
            href="theodinproject.com"
          >
            The Odin Project
          </a>
          {"'s "}
          javascript course.
        </p>
        <p className="mt-1">
          Built from scratch with React + Redux, Tailwind and Firebase, and
          bootstrapped with create-react-app.
        </p>

        <span className="w-full border-b border-gray-300 block mt-auto mb-2"></span>
        <p className="mt-1">
          Created by{" "}
          <a
            className="text-theme-red-dark hover:text-gray-500 underline"
            href="https://github.com/nyoos"
          >
            Sun I
          </a>
        </p>
        <p className="mb-5 mt-1">
          Content and images were taken from change.org.
        </p>
      </div>
    </div>
  );
}
