export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-4xl font-bold text-blue-700 mt-10">
        Trail de Bréhal
      </h1>
      <p className="text-lg text-gray-600 mt-4 text-center">
        La Bréhalèse – 8 septembre 2024
      </p>
      <button className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-xl hover:bg-blue-800 transition">
        S’inscrire
      </button>
    </main>
  );
}
