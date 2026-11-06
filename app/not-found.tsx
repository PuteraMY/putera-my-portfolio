import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() {
  return (
    <main className="page-container min-h-screen flex flex-col items-start justify-center py-24">
      <span className="eyebrow">ERROR / 404</span>
      <h1 className="mt-8 text-[clamp(5rem,15vw,12rem)] font-display font-extrabold tracking-tight leading-none">404<span className="gradient-name">.</span></h1>
      <h2 className="mt-6 font-display text-3xl font-bold">Page not found.</h2>
      <p className="mt-6 max-w-lg text-muted">That link doesn't point to a published page. You can return to the projects index.</p>
      <Link href="/#projects" className="btn btn-primary mt-8"><ArrowLeft size={18} /> Back to projects</Link>
    </main>
  );
}
