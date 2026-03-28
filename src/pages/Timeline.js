import TimelineChart from "../components/TimelineChart";


function Timeline() {
  return(
  <div className="p-4 w-100">
  <h2 className="timelineHead">timeline Page</h2>;
  <TimelineChart team={team1Data} />
  </div>
  );
}

export default Timeline;