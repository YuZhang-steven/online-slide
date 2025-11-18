import Link from "next/link";


export default function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <Link className="
      cursor-pointer
      px-6 py-3 bg-gray-200/50 text-gray-700  
      drop-shadow-md
      rounded-lg shadow-md hover:bg-sky-200 transition
      uppercase 
      "
        href={"/presentations"}
      >
        Presentation Collection
      </Link>

    </div>
  );
}
