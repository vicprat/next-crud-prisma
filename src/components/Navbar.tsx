import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-4">
      <Link href="/">
        <h3 className="text-xl font-bold">NexCRUD</h3>
      </Link>
      <ul>
        <li>
          <Link
            href="/new"
            className="px-3 py-1 rounded-md text-slate-200 hover:text-slate-400"
          >
            New
          </Link>
        </li>
      </ul>
    </nav>
  )
}

