import { useEffect, useReducer } from "react";

const initialState = {
  results: [],
  loading: false,
  error: "",
  pagination: {
    count: 0,
    offset: 0,
    total_count: 0,
  },
};

const limit = 20;

function reducer(state = initialState, type) {
  switch (type.action) {
    case "fetchStarted":
      return { ...state, loading: true };

    case "fetchSucceeded":
      return {
        ...state,
        loading: false,
        pagination: type.payload.pagination,
        results: [...state.results, ...type.payload.data],
      };

    case "fetchFailed":
      return { ...state, loading: false, error: type.payload };

    default:
      return state;
  }
}

async function fetchData(limit, offset) {
  try {
    const uri = `https://api.giphy.com/v1/gifs/trending`;
    const apiKey = `UJ83DtolXtUKIIxr6yo1uPK3JGCw32Zp`;
    const defaultQs = `&limit=${limit}&offset=${offset}&rating=G&lang=en`;
    const reqInfo = `${uri}?api_key=${apiKey}${defaultQs}`;

    const response = await fetch(reqInfo);
    const data = await response.json();

    return data;
  } catch (error) {
    Promise.reject(error);
  }
}

export function useGiphy() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function initialize() {
      dispatch({ action: "fetchStarted" });

      try {
        const result = await fetchData(limit, 0);

        dispatch({
          action: "fetchSucceeded",
          payload: { data: result.data, pagination: result.pagination },
        });
      } catch (error) {
        console.log(error);
      }
    }

    initialize();
  }, []);

  const loadMore = async () => {
    if (state.loading) {
      return;
    }

    async function loadMoreHandler() {
      dispatch({ action: "fetchStarted" });

      try {
        const result = await fetchData(limit, state.pagination.offset + limit);

        dispatch({
          action: "fetchSucceeded",
          payload: { data: result.data, pagination: result.pagination },
        });
      } catch (error) {
        console.log(error);
      }
    }

    loadMoreHandler();
  };

  return [state.results, state.loading, loadMore];
}
