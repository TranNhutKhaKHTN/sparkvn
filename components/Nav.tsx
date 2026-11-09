import Link from "next/link";
import Logo from "./Logo";

export default function Nav() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex h-12 max-w-4xl items-center justify-between px-4 font-mono text-sm">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Logo /> spark<span className="text-muted">.vn</span>
        </Link>
        <nav className="flex gap-5 text-muted">
          <Link href="/ideas" className="hover:text-foreground">Ý tưởng</Link>
          <Link href="/guide" className="hover:text-foreground">Hướng dẫn</Link>
        </nav>
      </div>
    </header>
  );
}
