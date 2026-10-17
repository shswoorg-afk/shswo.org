import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  PiHandHeart,
  PiHeart,
  PiBank,
  PiQrCode,
  PiGraduationCap,
  PiFirstAidKit,
  PiUsersThree,
  PiSnowflake,
  PiShieldCheck,
  PiCopy,
  PiCheckCircle,
  PiEnvelopeSimple,
  PiPhone,
  PiMapPin,
  PiArrowUpRight,
} from "react-icons/pi";

export const Route = createFileRoute("/donate")({
  component: DonatePage,
});

const bankDetails = [
  { label: "Bank Name", value: "State Bank of India (SBI)" },
  { label: "Branch", value: "R.K. Nagar" },
  {
    label: "Account Name",
    value: "Saving Humanity Social Work Organization",
  },
  { label: "Account Number", value: "43889623945" },
  { label: "IFSC Code", value: "SBIN0011613" },
];

const donationAreas = [
  {
    icon: PiHandHeart,
    title: "Social Welfare",
    description: "Assisting needy individuals and families.",
  },
  {
    icon: PiFirstAidKit,
    title: "Medical & Health Support",
    description: "Helping people in need and promoting health awareness.",
  },
  {
    icon: PiGraduationCap,
    title: "Education Support",
    description: "Encouraging education and supporting children and learners.",
  },
  {
    icon: PiSnowflake,
    title: "Winter Support",
    description: "Providing blankets and essential items during winter.",
  },
  {
    icon: PiHeart,
    title: "Humanitarian Assistance",
    description: "Supporting vulnerable people during difficult times.",
  },
  {
    icon: PiShieldCheck,
    title: "Awareness Programmes",
    description: "Promoting health, safety and social responsibility.",
  },
  {
    icon: PiUsersThree,
    title: "Community Development",
    description: "Supporting initiatives that build a better society.",
  },
  {
    icon: PiGraduationCap,
    title: "Skill Development",
    description: "Encouraging learning and opportunities for growth.",
  },
];

export default function DonatePage() {
  const [copied, setCopied] = useState("");

  async function copyText(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-blue-950 px-5 py-14 text-white sm:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100">
            <PiHeart className="text-lg" />
            Support Our Mission
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Donate to <span className="text-blue-300">SHSWO</span>
          </h1>

          <p className="mt-4 text-xl font-medium text-blue-100 sm:text-2xl">
            Together, We Can Make a Difference
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100/80 sm:text-base">
            Every act of kindness matters. Your voluntary contribution helps us
            support underprivileged individuals and families and build a more
            caring, compassionate society.
          </p>

          <a
            href="#donation-methods"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-950 transition hover:bg-blue-50"
          >
            <PiHandHeart className="text-xl" />
            Make a Donation
          </a>
        </div>
      </section>

      {/* QR code area */}
      <section
        id="donation-methods"
        className="scroll-mt-8 px-5 py-12 sm:py-16"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-xl rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-8">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-700">
                <PiQrCode />
              </div>

              <h2 className="mt-4 text-2xl font-bold text-slate-900">
                Donate Through QR Code
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Scan our official donation QR code using your UPI app to make
                a contribution.
              </p>
            </div>

            {/* Replace this placeholder with your official QR code image */}
            <div className="mx-auto mt-6 flex aspect-square w-full max-w-[280px] items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-5">
              <div className="text-center">
                <PiQrCode className="mx-auto text-6xl text-blue-300" />
                <p className="mt-3 font-semibold text-blue-900">
                  Donation QR Code
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  <img src="/qr-code.jpeg" alt="QR"  className="rounded-md"/>
                </p>
              </div>
            </div>

            <p className="mt-5 text-center text-xs leading-5 text-slate-500">
              Please verify the recipient name and payment details before
              completing your transaction. Keep your payment receipt for your
              records.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-slate-50 px-5 py-12 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
              Why Your Support Matters
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Small acts of kindness can create lasting change.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Saving Humanity Social Work Organization (SHSWO) is a non-profit
              social welfare organization committed to serving humanity,
              supporting underprivileged individuals and families, and
              promoting community development.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              We believe that every contribution, big or small, can help us
              reach more people in need and continue our social welfare
              activities.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-7 sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-700">
              <PiHeart />
            </div>
            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Our Mission
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              To promote humanity, social responsibility, health awareness,
              education, and community development by providing assistance to
              needy and underprivileged people.
            </p>
          </div>
        </div>
      </section>

      {/* Donation purposes */}
      <section className="px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
              Where Your Donation Helps
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Be part of meaningful change.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Your contribution can support a range of charitable and community
              welfare initiatives.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {donationAreas.map((area) => {
              const Icon = area.icon;

              return (
                <article
                  key={area.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-700">
                    <Icon />
                  </div>
                  <h3 className="mt-4 font-bold text-slate-900">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {area.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bank details */}
      <section className="bg-blue-50/70 px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-700">
              <PiBank />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">
              Official Bank Details
            </h2>
            <p className="mt-3 text-slate-600">
              You can also contribute through a direct bank transfer.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100 bg-white">
            {bankDetails.map((item, index) => (
              <div
                key={item.label}
                className={`flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 ${
                  index !== bankDetails.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <span className="text-sm text-slate-500">{item.label}</span>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <span
                    className={`break-words text-sm font-semibold text-slate-900 ${
                      item.label === "Account Number" ||
                      item.label === "IFSC Code"
                        ? "font-mono"
                        : ""
                    }`}
                  >
                    {item.value}
                  </span>

                  {(item.label === "Account Number" ||
                    item.label === "IFSC Code") && (
                    <button
                      type="button"
                      onClick={() => copyText(item.label, item.value)}
                      aria-label={`Copy ${item.label}`}
                      className="shrink-0 rounded-lg p-2 text-blue-700 transition hover:bg-blue-50"
                    >
                      {copied === item.label ? (
                        <PiCheckCircle className="text-xl" />
                      ) : (
                        <PiCopy className="text-xl" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-xs leading-6 text-slate-500">
            Please double-check all bank details and the recipient account name
            before transferring funds.
          </p>
        </div>
      </section>

      {/* Transparency */}
      <section className="px-5 py-14 sm:py-16">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 p-6 sm:p-9">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-700">
              <PiShieldCheck />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Transparency & Accountability
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                SHSWO aims to use donations responsibly towards its charitable
                objectives and maintain appropriate records of contributions
                and expenditure in accordance with applicable rules and
                regulations.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                <strong className="text-slate-700">Tax benefits:</strong>{" "}
                Please confirm the organization&apos;s applicable approval
                status and your donation&apos;s eligibility before claiming any
                tax deduction. Tax benefits should not be assumed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-14 sm:pb-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-blue-950 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <PiHandHeart className="mx-auto text-5xl text-blue-300" />
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            Join Us in Serving Humanity
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100/80">
            You can support our mission by donating, volunteering, spreading
            awareness, participating in our programmes, and encouraging others
            to help humanitarian causes.
          </p>
          <p className="mt-6 text-lg font-semibold text-white">
            Educate Minds • Inspire Hearts • Serve Humanity
          </p>
        </div>
      </section>

      {/* Contact */}
      <footer className="border-t border-slate-200 bg-slate-50 px-5 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-slate-900">
            Contact SHSWO
          </h2>
          <p className="mt-2 text-slate-600">
            Saving Humanity Social Work Organization
          </p>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <PiMapPin className="mt-1 shrink-0 text-xl text-blue-700" />
              <p className="text-sm leading-6 text-slate-600">
                Kazirbazar, Near Kachukhauri, P.O. Ratabari, P.S. Ratabari,
                Dist. Sribhumi (Karimganj), Assam – 788735, India
              </p>
            </div>

            <div className="flex items-start gap-3">
              <PiPhone className="mt-1 shrink-0 text-xl text-blue-700" />
              <div className="text-sm leading-6 text-slate-600">
                <a
                  href="tel:9401760100"
                  className="block hover:text-blue-700"
                >
                  9401760100
                </a>
                <a
                  href="tel:9867077961"
                  className="block hover:text-blue-700"
                >
                  9867077961
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <PiEnvelopeSimple className="mt-1 shrink-0 text-xl text-blue-700" />
              <a
                href="mailto:shsocialworkorganization@gmail.com"
                className="break-all text-sm leading-6 text-slate-600 hover:text-blue-700"
              >
                shsocialworkorganization@gmail.com
              </a>
            </div>
          </div>

          <a
            href="https://shswo.org.in"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            shswo.org.in <PiArrowUpRight />
          </a>

          <div className="mt-8 border-t border-slate-200 pt-5 text-center text-xs text-slate-500">
            Thank you for your generosity and for supporting our mission of
            serving humanity.
          </div>
        </div>
      </footer>
    </main>
  );
}