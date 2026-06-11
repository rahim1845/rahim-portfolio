import Link from "next/link";

export default function NotFound() {
  return (
    <section className="nf wrap">
      <span className="crumb">home / work / this-page</span>
      <h1>This page broke the grid.</h1>
      <p>Somewhere, an operator added one item too many and the rule did not hold. That never happened on TingTing. It happened here.</p>
      <Link className="p-link" href="/">
        Back to solid ground <span>&rarr;</span>
      </Link>
    </section>
  );
}
