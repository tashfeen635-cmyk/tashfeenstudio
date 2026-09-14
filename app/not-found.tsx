import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 44 }}>404</h1>
        <p style={{ color: "#ddd", marginBottom: 30 }}>
          The page you are looking for doesn&apos;t exist.
        </p>
        <Link className="btn" href="/">
          Back to Homepage
        </Link>
      </div>
    </section>
  );
}