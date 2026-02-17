import React, { useState } from "react";
import { typeIconUrl } from "../utils/typeIcons.js";

export default function TypeBadge({ type }) {
  const [ok, setOk] = useState(true);
  const url = typeIconUrl(type);

  if (!url || !ok) {
    return <span className="typeText">{type}</span>;
  }

  return (
    <img
      className="typeImg"
      src={url}
      alt={type}
      title={type}
      loading="lazy"
      onError={() => setOk(false)}
    />
  );
}
