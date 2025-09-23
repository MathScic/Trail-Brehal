// app/infos-pratiques/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function AccordionSection({
  id,
  title,
  defaultOpen = false, // ← replié par défaut
  children,
}: {
  id: string;
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section id={id} className="py-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="group w-full flex items-center gap-3 text-left"
        aria-expanded={open}
        aria-controls={`${id}-content`}
      >
        {/* Flèche */}
        <span
          className={`inline-block transition-transform duration-300 ${
            open ? "rotate-90" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="text-brand-dark"
          >
            <path fill="currentColor" d="M8 5l10 7-10 7V5z" />
          </svg>
        </span>
        {/* Titre */}
        <h2 className="text-lg md:text-xl font-semibold text-brand-dark">
          {title}
        </h2>
      </button>

      {/* Contenu */}
      <div
        id={`${id}-content`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4 pb-6 text-sm md:text-base text-brand-graytext">
            {children}
          </div>
        </div>
      </div>

      {/* Séparateur */}
      <div className="h-px w-full bg-gray-300" />
    </section>
  );
}

export default function InfosPratiquesPage() {
  return (
    <main className="relative">
      {/* Bandeau principal (bleu foncé) */}

      <section className="bg-brand-dark text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold">Infos pratiques</h1>
          <p className="text-white/80 mt-2">
            Tout ce qu’il faut savoir avant le jour J.
          </p>
        </div>
      </section>

      {/* Corps au style de ta maquette */}
      <section className="bg-brand-graybg">
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          {/* Accès */}
          <AccordionSection id="acces" title="Accès">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="font-semibold text-brand-dark">
                  Adresse de départ :
                </p>
                <p>
                  Place Monaco,
                  <br />
                  50290, Bréhal
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-brand-dark">
                  Horaires de départ (adultes) :
                </p>
                <ul className="space-y-1">
                  <li>
                    5,1 km —{" "}
                    <span className="font-medium text-brand-dark">10h</span>
                  </li>
                  <li>
                    10,1 km —{" "}
                    <span className="font-medium text-brand-dark">11h15</span>
                  </li>
                  <li>
                    Marche 0,00 km —{" "}
                    <span className="font-medium text-brand-dark">10h30</span>
                  </li>
                </ul>
                <p className="font-semibold text-brand-dark mt-3">
                  Courses enfants :
                </p>
                <ul className="space-y-1">
                  <li>
                    0,0 km —{" "}
                    <span className="font-medium text-brand-dark">14h00</span>{" "}
                    (nés 2017-2018)
                  </li>
                  <li>
                    1,1 km —{" "}
                    <span className="font-medium text-brand-dark">14h30</span>{" "}
                    (nés 2015-2016)
                  </li>
                  <li>
                    2,2 km —{" "}
                    <span className="font-medium text-brand-dark">15h15</span>{" "}
                    (nés 2013–2014)
                  </li>
                  <li>
                    2,8 km —{" "}
                    <span className="font-medium text-brand-dark">16h15</span>{" "}
                    (nés 2011–2012)
                  </li>
                </ul>
              </div>
            </div>
          </AccordionSection>

          {/* Dossards */}
          <AccordionSection id="dossards" title="Retrait des dossards">
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-brand-dark">
                  Horaires :
                </span>{" "}
                à partir de{" "}
                <span className="font-medium text-brand-dark">8h</span> (jour
                J).
              </p>
              <p>
                <span className="font-semibold text-brand-dark">Lieu :</span>{" "}
                Place de Monaco, Bréhal (village de départ)
              </p>
              <p>
                Pièce d&rsquo;identité obligatoire. Pour les mineurs :
                autorisation parentale.
              </p>
            </div>
          </AccordionSection>

          {/* Parking */}
          <AccordionSection id="parking" title="Parking">
            <p>
              Parking gratuit à l&rsquo;hippodrome de Bréhal (suivre la
              signalisation).
            </p>
          </AccordionSection>

          {/* Restauration */}
          <AccordionSection id="restauration" title="Restauration">
            <p>
              {/* Des food-trucks seront présents sur le village pour proposer
              différents styles de nourriture et boissons. */}
            </p>
          </AccordionSection>

          {/* Inscriptions */}
          <AccordionSection id="inscriptions" title="Inscriptions">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p>
                  Pré-inscription en ligne recommandée sur le lien
                  &nbsp;&laquo;&nbsp;Inscriptions&nbsp;&raquo;&nbsp;(clôture :
                  voir plateforme).
                </p>
                <ul className="list-disc pl-5">
                  <li>10,2 km — 12€</li>
                  <li>5,2 km — 10€</li>
                  <li>Marche — 5€</li>
                  <li>Enfants — 3€</li>
                </ul>
                <Link
                  href="https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-lg bg-brand-dark px-4 py-2 text-white font-semibold hover:bg-brand-medium"
                >
                  S’inscrire en ligne
                </Link>
              </div>
              <div className="rounded-xl border p-4 bg-white">
                <p className="font-semibold text-brand-dark">
                  Certificat / Licence
                </p>
                <p className="text-sm mt-2">
                  Course chronométrée : licence FFA valide ou certificat médical
                  (&lt; 1 an) mentionnant l&rsquo;absence de contre-indication à
                  la course à pied en compétition.
                </p>
              </div>
            </div>
          </AccordionSection>

          {/* Logistique */}
          <AccordionSection id="logistique" title="Infos logistiques">
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="list-disc pl-5 space-y-1">
                <li>Consignes / sacs : oui (près du village)</li>
                <li>
                  Toilettes : zone départ + parking + cale principale de Saint
                  Martin
                </li>
                <li>Ravitaillements : voir roadbook / briefing départ</li>
              </ul>
              <ul className="list-disc pl-5 space-y-1">
                <li>Objets trouvés : au point info</li>
                <li>Contact jour J : affiché au retrait des dossards</li>
                <li>Tri Selectif bien présent</li>
              </ul>
            </div>
          </AccordionSection>

          {/* Sécurité */}
          <AccordionSection id="securite" title="Sécurité & assistance">
            <p>
              Dispositif médical sur site (poste de secours). En cas d’abandon,
              prévenir un bénévole / PC Course. Respect du balisage obligatoire.
            </p>
          </AccordionSection>

          {/* Écoresponsable */}
          <AccordionSection id="eco" title="Engagement écoresponsable">
            <p>
              Tri des déchets sur zone, gobelets réutilisables, aucun jet de
              déchets sur le parcours (pénalités). Co-voiturage encouragé.
            </p>
          </AccordionSection>

          {/* FAQ */}
          <AccordionSection id="faq" title="FAQ">
            <div className="divide-y rounded-xl border bg-white">
              <details className="p-4">
                <summary className="cursor-pointer font-semibold text-brand-dark">
                  Puis-je changer de course ?
                </summary>
                <p className="mt-2">
                  Oui selon disponibilités, jusqu’à la clôture des inscriptions
                  en ligne.
                </p>
              </details>
              <details className="p-4">
                <summary className="cursor-pointer font-semibold text-brand-dark">
                  Politique d’annulation
                </summary>
                <p className="mt-2">
                  Voir règlement / plateforme d’inscription.
                </p>
              </details>
              <details className="p-4">
                <summary className="cursor-pointer font-semibold text-brand-dark">
                  Matériel recommandé
                </summary>
                <p className="mt-2">
                  Chaussures adaptées, hydratation, coupe-vent selon météo.
                </p>
              </details>
            </div>
          </AccordionSection>
        </div>
      </section>
      {/* Illustration de clôture */}
      <div className="mt-10">
        <figure className="relative w-full max-w-4xl mx-auto aspect-[16/9] overflow-hidden rounded-2xl shadow">
          <Image
            src="/images/Trail des vikings.jpg"
            alt="Affiche du Trail des Vikings"
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 768px, (min-width: 768px) 80vw, 100vw"
            loading="lazy"
          />
        </figure>
        <figcaption className="text-center text-sm text-brand-graytext mt-3">
          Affiche – Trail des Vikings
        </figcaption>
      </div>

      {/* espace bas pour ne pas coller le footer */}
      <div className="pb-16" />
    </main>
  );
}
