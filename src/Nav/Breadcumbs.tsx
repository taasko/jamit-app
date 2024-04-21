import { Link, UIMatch, useMatches } from "react-router-dom";

export default function Breadcrumbs() {
  const matches = useMatches();

  return matches.map((match) => {
    const { handle } = match as UIMatch<unknown, { crumb?: string }>;

    if (handle?.crumb) {
      return (
        <span key={handle.crumb}>
          <Link to={match.pathname}>{handle.crumb}</Link>
          <span>/</span>
        </span>
      );
    }
  });
}
