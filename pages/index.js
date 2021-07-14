import { useEffect, useState } from "react";

import { Button, TrendingCollection } from "components";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  return <TrendingCollection items={items} loading={loading} />;
}
