"use client";

import Link from "next/link";
import FadeInWhenVisible from "./FadeInWhenVisible";

export default function Courses() {
  return (
    <FadeInWhenVisible>
      <section className="py-20 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-10">Courses</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/courses/5km"
            className="border rounded-xl p-8 shadow hover:shadow-md transition"
          >
            <h3 className="text-2xl font-bold text-blue-800">5 KM</h3>
            <p className="text-gray-600 mt-2">Course nature</p>
          </Link>
          <Link
            href="/courses/12km"
            className="border rounded-xl p-8 shadow hover:shadow-md transition"
          >
            <h3 className="text-2xl font-bold text-blue-800">12 KM</h3>
            <p className="text-gray-600 mt-2">Course nature</p>
          </Link>
          <Link
            href="/courses/21km"
            className="border rounded-xl p-8 shadow hover:shadow-md transition"
          >
            <h3 className="text-2xl font-bold text-blue-800">21 KM</h3>
            <p className="text-gray-600 mt-2">Course nature</p>
          </Link>
        </div>
      </section>
    </FadeInWhenVisible>
  );
}
