import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-inner"><span>© {new Date().getFullYear()} Putera MY. Created by Putera MY.</span><Link href="/#home">Back to top ↑</Link><span>Built with Next.js</span></div>
    </footer>
  );
}
