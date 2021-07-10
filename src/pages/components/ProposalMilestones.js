import { use768Breakpoint } from "../../util/mediabreakpoints";

export function ProposalMilestones({ numberOfSupporters, hasSigned }) {
  const formatter = new Intl.NumberFormat();
  const biggerThan768 = use768Breakpoint();
  const milestones = [500, 1000, 2500, 5000, 10000, 50000, 100000];
  const nextMilestone = milestones.find(
    (element) => element > numberOfSupporters
  );
  const percentageComplete = Math.round(
    (numberOfSupporters / nextMilestone) * 100
  );
  const numberMore = formatter.format(nextMilestone - numberOfSupporters);
  const encouragement = hasSigned
    ? `Thanks to your support, this petition has a chance of winning! We only need ${numberMore} more signatures to reach the next goal - please share the petition to help!`
    : `We only need ${numberMore} more signatures to reach the next goal - can you help?`;
  if (biggerThan768) {
    return (
      <div className="mb-4">
        <p>
          <b>
            <span>{formatter.format(numberOfSupporters)}</span> have signed.
          </b>{" "}
          Let's get to {formatter.format(nextMilestone)}!
        </p>
        <div className="w-full bg-gray-300 h-3 rounded-full mt-3">
          <div
            className="bg-gradient-to-r from-yellow-400 to-theme-red h-3 rounded-full z-10"
            style={{ width: `${percentageComplete}%` }}
          ></div>
        </div>

        <span className="w-11/12 border-b-2 border-gray-300 mx-auto mt-5 block"></span>
        <p className="mt-3">{encouragement}</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>
          <b>
            <span>{formatter.format(numberOfSupporters)}</span> have signed.
          </b>{" "}
          Let's get to {formatter.format(nextMilestone)}!
        </p>
        <div className="w-full bg-gray-300 h-3 rounded-full my-2">
          <div
            className="bg-gradient-to-r from-yellow-400 to-theme-red h-3 rounded-full z-10"
            style={{ width: `${percentageComplete}%` }}
          ></div>
        </div>
      </div>
    );
  }
}
