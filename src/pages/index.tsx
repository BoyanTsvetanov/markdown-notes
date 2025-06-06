import Head from "next/head";
import { NoteApp } from "@/components/NoteApp";

export default function Home() {
  return (
    <>
      <Head>
        <title>Markdown Notes</title>
      </Head>
      <main className="min-h-screen bg-emerald-400 p-6 text-black">
        <h1 className="text-2xl font-bold mb-4 text-center font-handwriting">Markdown Note Taker 📝</h1>
        <NoteApp />
      </main>
    </>
  );
}
