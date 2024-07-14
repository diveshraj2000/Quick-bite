import { useRouteError } from 'react-router-dom';
const Error = () => {
  const err = useRouteError();

  return (
    <div>
      error compomrent
      <h3>
        {err.status}:{err.statusText}
      </h3>
    </div>
  );
};

export default Error;
