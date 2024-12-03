import { Link, useMatches } from "react-router-dom";

export default function Breadcrumbs() {
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => (match.handle as { crumb?: string })?.crumb)
    .map((match) => {
      const { handle } = match as { handle: { crumb: string } };

      return (
        <span key={handle.crumb}>
          <span> / </span>
          <Link to={match.pathname}>{handle.crumb}</Link>
        </span>
      );
    });

  return <nav>{crumbs}</nav>;
}
