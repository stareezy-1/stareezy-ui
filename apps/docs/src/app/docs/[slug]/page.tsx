import type { Metadata } from "next";
import { notFound } from "next/navigation";

const DOC_SLUGS = [
  "installation",
  "usage",
  "components",
  "theming",
  "compiler",
  "migration",
  "architecture",
] as const;

type DocSlug = (typeof DOC_SLUGS)[number];

const DOC_TITLES: Record<DocSlug, string> = {
  installation: "Installation",
  usage: "Usage",
  components: "Component API",
  theming: "Theming",
  compiler: "Compiler",
  migration: "Migration Guide",
  architecture: "Architecture",
};

export function generateStaticParams() {
  return DOC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug as DocSlug;
  if (!DOC_SLUGS.includes(slug)) return {};
  return { title: DOC_TITLES[slug] };
}

export default function DocSlugPage({ params }: { params: { slug: string } }) {
  const slug = params.slug as DocSlug;
  if (!DOC_SLUGS.includes(slug)) notFound();

  // Redirect to the static MDX page for this slug
  // In Next.js App Router, the MDX pages at /docs/[slug]/page.mdx take precedence.
  // This page handles any slug not covered by a static MDX file.
  return (
    <div className="prose">
      <h1>{DOC_TITLES[slug]}</h1>
      <p>Documentation for this section is coming soon.</p>
    </div>
  );
}
