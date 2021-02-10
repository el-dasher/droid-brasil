import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoadingThing() {
  return (
    <div className="element-loading">
      <CircularProgress size="75px" />
    </div>
  );
}
