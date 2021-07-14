import { useState, useEffect, useCallback, useRef } from "react";

export default function useInfiniteScroll(callback) {
  const savedCallback = useRef();
  const [isFetching, setIsFetching] = useState(false);

  const isScrolling = useCallback(() => {
    const { innerHeight } = window;
    const { scrollTop, offsetHeight } = document.documentElement;

    if (innerHeight + scrollTop !== offsetHeight || isFetching) return;
    setIsFetching(true);
  }, [isFetching]);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, [isScrolling]);

  useEffect(() => {
    if (!isFetching) return;
    savedCallback.current();
  }, [isFetching]);

  return [isFetching, setIsFetching];
}
