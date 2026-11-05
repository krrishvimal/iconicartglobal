import Link from "next/link";
import { Palette, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center pt-28 pb-20 px-4 text-center">
      <div className="max-w-md bg-white p-8 sm:p-12 rounded-3xl border border-burgundy/10 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mx-auto mb-6">
          <Palette className="w-8 h-8" />
        </div>
        <span className="text-gold-dark font-cursive text-2xl font-bold block mb-1">
          404 Page
        </span>
        <h1 className="font-serif text-3xl font-bold text-burgundy mb-3">
          Artwork Not Found
        </h1>
        <p className="text-warm-gray text-sm leading-relaxed mb-8">
          The creative page or creation you are searching for might have been moved
          or is being hand-crafted. Let us guide you back home.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-burgundy to-rose text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg hover:scale-105 transition-all"
        >
          Return to Gallery Home
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
