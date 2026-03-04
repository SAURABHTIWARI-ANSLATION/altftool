"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import bookData from "../data/bookData.json";
import Features from "./Features";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Ancient Epics", value: "ancient" },
  { label: "Poetry", value: "poetry" },
  { label: "Bengali", value: "bengali" },
  { label: "Hindi", value: "hindi" },
  { label: "Tamil", value: "tamil" },
  { label: "Malayalam", value: "malayalam" },
  { label: "Modern Fiction", value: "modern" },
];

const CATEGORY_MAP = {
  ancient: ["Mahabharata", "Ramayana", "Bhagavad", "Upanishads", "Arthashastra", "Panchatantra", "Jataka"],
  poetry: ["Meghaduta", "Kumarasambhava", "Raghuvamsa", "Shakuntala", "Gitanjali", "Tirukkural", "Gardener"],
  bengali: ["Tagore", "Chattopadhyay", "Bandyopadhyay", "Chatterjee", "Lahiri", "Bama"],
  hindi: ["Premchand", "Maithili", "Bharat Bharati"],
  tamil: ["Silappathikaram", "Manimekalai", "Tirukkural", "Karukku"],
  malayalam: ["Chemmeen", "Aadujeevitham", "Khasak", "Kayar", "Pottekkatt"],
  modern: ["Roy", "Rushdie", "Seth", "Tharoor", "Ghosh", "Mistry", "Narayan", "Adiga"],
};

function getBookCategory(book) {
  for (const [key, keywords] of Object.entries(CATEGORY_MAP)) {
    if (keywords.some((k) =>
      book.title.includes(k) || book.author.includes(k) || book.description.includes(k)
    )) return key;
  }
  return "modern";
}

const PER_PAGE = 12;

// ─── BookCard ─────────────────────────────────────────────────────────────────

function BookCard({ book, onSelect }) {
  const [imgErr, setImgErr] = useState(false);
  const fallback = `https://placehold.co/200x300/0f172a/d4a83a?text=${encodeURIComponent(book.title.slice(0, 10))}`;

  return (
    <article
      onClick={() => onSelect(book)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(book)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${book.title}`}
      className="
      group cursor-pointer
      rounded-xl overflow-hidden
      bg-(--card)
      border border-(--border)
      shadow-sm hover:shadow-xl
      transition-all duration-300
      hover:-translate-y-1
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-(--primary)
    "
    >

      {/* Cover */}
      <div className="relative h-56 overflow-hidden bg-(--muted)">

        <img
          src={imgErr ? fallback : book.cover}
          alt={book.title}
          onError={() => setImgErr(true)}
          loading="lazy"
          className="
          w-full h-full object-cover
          transition-transform duration-500
          group-hover:scale-110
        "
        />

        {/* Hover overlay */}
        <div
          className="
          absolute inset-0
          bg-linear-to-t
          from-(--background)/80
          via-transparent
          to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          flex items-end justify-center pb-4
        "
        >
          <span
            className="
            text-(--primary)
            text-xs font-semibold
            tracking-widest uppercase
          "
          >
            View Details →
          </span>
        </div>

        {/* Left accent line */}
        <div
          className="
          absolute left-0 top-0 bottom-0 w-1
          bg-(--primary)/40
        "
        />

      </div>


      {/* Info */}
      <div className="p-4">

        {/* Title */}
        <h3
          className="
          font-semibold
          text-(--foreground)
          text-sm
          leading-snug
          line-clamp-2
          mb-1
        "
        >
          {book.title}
        </h3>


        {/* Author */}
        <p
          className="
          text-xs
          text-(--muted-foreground)
          mb-2 truncate
        "
        >
          {book.author}
        </p>


        {/* Year Badge */}
        <span
          className="
          inline-block
          text-xs font-semibold
          bg-(--primary)
          text-(--primary-foreground)
          rounded-md
          px-2 py-0.5
        "
        >
          {book.year}
        </span>

      </div>

    </article>
  );

}

// ─── BookModal ────────────────────────────────────────────────────────────────

function BookModal({ book, onClose }) {
  const [imgErr, setImgErr] = useState(false);
  const fallback = `https://placehold.co/200x300/0f172a/d4a83a?text=${encodeURIComponent(book.title.slice(0, 10))}`;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="
      fixed inset-0 z-50
      bg-(--background)/80
      backdrop-blur-sm
      flex items-center justify-center
      p-4
    "
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${book.title}`}
    >
      <div
        className="
        relative
        bg-(--card)
        text-(--foreground)
        rounded-2xl
        w-full max-w-2xl
        max-h-[90vh]
        overflow-y-auto
        shadow-xl
        border border-(--border)
      "
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="
          absolute top-4 right-4 z-10
          w-9 h-9
          rounded-full
          bg-(--muted)
          hover:bg-(--accent)
          transition-colors
          text-(--foreground)
          flex items-center justify-center
          text-sm font-bold
          border border-(--border) cursor-pointer
        "
        >
          ✕
        </button>


        <div className="flex flex-col sm:flex-row gap-6 p-8">

          {/* Cover */}
          <div className="relative shrink-0 self-start">

            <img
              src={imgErr ? fallback : book.cover}
              alt={book.title}
              onError={() => setImgErr(true)}
              className="
              w-40
              rounded-xl
              shadow-lg
              border border-(--border)
            "
            />

            {/* subtle overlay */}
            <div
              className="
              absolute inset-0
              rounded-xl
              bg-linear-to-br
              from-(--background)/10
              to-transparent
              pointer-events-none
            "
            />

          </div>


          {/* Content */}
          <div className="flex-1 min-w-0">

            {/* Year */}
            <p
              className="
              text-xs font-bold
              tracking-[0.18em]
              uppercase
              text-(--muted-foreground)
              mb-2
            "
            >
              {book.year}
            </p>


            {/* Title */}
            <h2
              className="
              font-bold
              text-(--foreground)
              text-3xl
              leading-tight
              mb-1
            "
            >
              {book.title}
            </h2>


            {/* Author */}
            <p
              className="
              text-(--primary)
              italic
              text-base
              mb-4
            "
            >
              by {book.author}
            </p>


            {/* Divider */}
            <hr className="border-(--border) mb-4" />


            {/* Description */}
            <p
              className="
              text-(--muted-foreground)
              leading-relaxed
              text-base
              mb-5
            "
            >
              {book.description}
            </p>


            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">

              <span
                className="
                text-xs font-semibold
                tracking-wide uppercase
                px-3 py-1
                rounded-full
                border border-(--primary)
                text-(--primary)
                bg-(--primary)/10
              "
              >
                Literature
              </span>

              <span
                className="
                text-xs font-semibold
                tracking-wide uppercase
                px-3 py-1
                rounded-full
                border border-(--primary)
                text-(--primary)
                bg-(--primary)/10
              "
              >
                Indian Classic
              </span>

            </div>


            {/* Rating */}
            <p
              className="
              text-yellow-400
              text-xl
              tracking-widest
            "
            >
              ★★★★★
            </p>

          </div>

        </div>

      </div>
    </div>
  );

}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function MainComponent() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [page, setPage] = useState(1);
  const [selectedBook, setBook] = useState(null);
  const [heroVis, setHeroVis] = useState(false);
  const libraryRef = useRef(null);

  useEffect(() => { setTimeout(() => setHeroVis(true), 80); }, []);

  // ── Filter + Sort ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...bookData];
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
      );
    }
    if (category !== "all") {
      list = list.filter((b) => getBookCategory(b) === category);
    }
    if (sortBy === "title") list.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === "author") list.sort((a, b) => a.author.localeCompare(b.author));
    if (sortBy === "year") list.sort((a, b) => (parseInt(a.year) || 0) - (parseInt(b.year) || 0));
    return list;
  }, [query, category, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const uniqueAuthors = useMemo(() => new Set(bookData.map((b) => b.author)).size, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    libraryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCategory = (val) => {
    setCategory(val);
    setQuery("");
    setPage(1);
  };

  // ── Pagination range ───────────────────────────────────────────────────────
  const pageRange = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
    .reduce((acc, p, i, arr) => {
      if (i > 0 && p - arr[i - 1] > 1) acc.push("...");
      acc.push(p);
      return acc;
    }, []);
  return (
    <div className=" bg-(--background) text-(--foreground)">

      {/* ══════ HERO ══════ */}
      <section
        className="
        relative 
        flex flex-col items-center justify-center
        text-center px-6 overflow-hidden
        bg-(--background)
      "
      >

      

        {/* Badge */}
        <div
          className={`
          inline-flex items-center gap-2 
          text-(--primary)
          text-xs font-semibold tracking-[0.2em] uppercase
          border border-(--border)
          rounded-full px-4 py-1.5
          backdrop-blur-md
          bg-(--card)
          mt-5
          transition-all duration-700
          ${heroVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
          style={{ transitionDelay: "100ms" }}
        >
          ✦ Indian Literary Heritage
        </div>

   <div className="container mx-auto px-4 py-8">
      {/* PAGE TITLE */}
      <header className="text-center mb-8">
        <h2 className="heading">Book Finder</h2>
        <p className="text-center description">
          Search and discover books quickly by title or author
        </p>
      </header>
    </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className={`
          flex flex-col sm:flex-row gap-3
          justify-center w-full max-w-xl
          transition-all duration-700
          ${heroVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
        `}
        >

          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search books..."
            className="
            flex-1 px-5 py-3.5 rounded-xl
            bg-(--card)
            border border-(--border)
            text-(--foreground)
            placeholder:text-(--muted-foreground)
            outline-none
            focus:border-(--primary)
            transition-all
          "
          />

          <button
            type="submit"
            className="
            px-7 py-3.5 rounded-xl
            bg-(--primary)
            text-(--primary-foreground)
            font-semibold
            hover:opacity-90
            transition-all cursor-pointer
          "
          >
            Search
          </button>

        </form>


        {/* Stats */}
        
        {/* <div
          className={`
          flex gap-12 mt-14 pt-8
          border-t border-(--border)
          transition-all duration-700
          ${heroVis ? "opacity-100" : "opacity-0"}
        `}
        >
          {[
            { val: bookData.length, label: "Books" },
            { val: uniqueAuthors, label: "Authors" },
            { val: "3,000+", label: "Years" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">

              <div className="font-bold text-(--primary) text-4xl">
                {val}
              </div>

              <div className="text-(--muted-foreground) text-xs uppercase">
                {label}
              </div>

            </div>
          ))}
        </div> */}

      </section>


      {/* ══════ LIBRARY ══════ */}
      <section className="py-20 px-5 bg-(--background)" ref={libraryRef}>

        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="mb-8">

            <h2 className="font-bold text-(--foreground) text-4xl sm:text-5xl">
              The <span className="text-(--primary)">Library</span>
            </h2>

            <p className="text-(--muted-foreground) text-sm mt-1">
              Showing {filtered.length} of {bookData.length}
            </p>

          </div>


          {/* Category */}
          <div className="flex flex-wrap gap-2 mb-6">

            {CATEGORIES.map((cat) => {

              const active = category === cat.value;

              return (
                <button
                  key={cat.value}
                  onClick={() => handleCategory(cat.value)}
                  className={`
                  px-4 py-2 rounded-full border text-sm
                  transition-all cursor-pointer
                  ${active
                      ? "bg-(--primary) text-(--primary-foreground) border-(--primary)"
                      : "bg-(--card) text-(--muted-foreground) border-(--border) hover:border-(--primary)"
                    }
                `}
                >
                  {cat.label}
                </button>
              );

            })}


            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="
              ml-auto px-4 py-2 rounded-xl
              border border-(--border)
              bg-(--card)
              text-(--foreground)
              outline-none
              focus:border-(--primary) cursor-pointer
            "
            >
              <option value="default">Sort Default</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="year">Year</option>
            </select>

          </div>


          {/* Grid */}
          {paginated.length === 0 ? (
            <div className="py-24 text-center text-(--muted-foreground)">
              No books found
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {paginated.map((book) => (
                <BookCard key={book.id} book={book} onSelect={setBook} />
              ))}
            </div>
          )}


          {/* Pagination */}
          {totalPages > 1 && (

            <div className="flex justify-center gap-2 mt-12">

              {pageRange.map((p, i) =>
                p === "..." ? (
                  <span key={i+2}>...</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`
                    w-10 h-10 rounded-lg border cursor-pointer
                    ${currentPage === p
                        ? "bg-(--primary) text-(--primary-foreground) border-(--primary)"
                        : "bg-(--card) text-(--foreground) border-(--border)"
                      }
                  `}
                  >
                    {p}
                  </button>
                )
              )}

            </div>

          )}

        </div>
      </section>
      {/* Modal */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setBook(null)} />
      )}

      <Features/>

    </div>
  );

}