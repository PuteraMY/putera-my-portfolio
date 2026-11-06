import { ArrowUpRight, BookOpenText } from "lucide-react";

export function Blog() {
  return (
    <section id="blog" className="blog-section" aria-labelledby="blog-heading">
      <div className="page-container blog-inner">
        <div><span className="eyebrow">NOTES / JOURNAL</span><h2 id="blog-heading" className="blog-heading">Notes from the build.</h2></div>
        <div className="blog-message"><BookOpenText size={21} aria-hidden="true" /><p>No posts published yet. <span>TODO: Add real technical notes or remove Blog from navigation.</span></p><ArrowUpRight size={19} aria-hidden="true" /></div>
      </div>
    </section>
  );
}
