import React, { useState, Fragment, useEffect, useCallback } from "react";

import { useInfiniteScroll } from "hooks";
import { Spinner, Grid } from "components";

import { useGiphy } from "./hooks/useGiphy";

import { TrendingCard } from "./components";

export default function TrendingCollection() {
  const [results, loading, loadMore] = useGiphy();
  const [isFetching, setIsFetching] = useInfiniteScroll(loadMoreHandler);

  function loadMoreHandler() {
    loadMore().then(() => {
      setIsFetching(false);
    });
  }

  const content = results.map((giphy, index) => {
    const { id, title } = giphy;

    const previewUrl = giphy?.images?.downsized?.url;
    const avatarUrl = giphy?.user?.avatar_url;
    const displayName = giphy?.user?.display_name;

    return (
      <TrendingCard
        key={`${index}__${id}`}
        id={id}
        src={previewUrl}
        title={title}
        avatarUrl={avatarUrl}
        displayName={displayName}
      />
    );
  });

  return (
    <Fragment>
      <Grid>{content}</Grid>
      <Spinner isLoading={loading || isFetching} />
    </Fragment>
  );
}
