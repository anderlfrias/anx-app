import { useLocation, useNavigate } from "react-router-dom";

export default function useURLSearchParams() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const setParams = (key, value) => {
    if (value === '') {
      params.delete(key);
      return navigate(`?${params.toString()}`);
    }

    params.set(key, value);
    navigate(`?${params.toString()}`);
  }

  const deleteParams = (key) => {
    if (!params.has(key)) return;

    params.delete(key);
    navigate(`?${params.toString()}`);
  }

  const getParams = (key) => {
    return params.get(key) || undefined;
  }

  return {
    query: params.toString(),
    set: setParams,
    delete: deleteParams,
    get: getParams,
  }
}
