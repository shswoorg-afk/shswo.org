const ContactUs = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="bg-linear-to-br from-blue-700 via-blue-800 to-blue-900 px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              Saving Humanity Social Work Organization
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8">
              We are always happy to hear from you. Whether you have a
              question, suggestion, or would like to work with us, we would
              love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Information */}
            <div className="space-y-6 lg:col-span-2">
              {/* Address */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    📍
                  </div>

                  <div>
                    <p className="text-sm font-medium text-blue-700">
                      Visit Us
                    </p>
                    <h2 className="text-xl font-semibold">
                      Office Address
                    </h2>
                  </div>
                </div>

                <address className="not-italic text-sm leading-7 text-slate-600 sm:text-base">
                  Kazirbazar, Near SBI CSP
                  <br />
                  P.O. – Ratabari, P.S. – Ratabari
                  <br />
                  Dist. – Sribhumi (Karimganj)
                  <br />
                  Assam – 788735, India
                </address>
              </div>

              {/* Phone & Email */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    📞
                  </div>

                  <p className="text-sm font-medium text-blue-700">
                    Call Us
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    Contact Information
                  </h2>

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <p>
                      <span className="font-medium text-slate-900">
                        Mobile
                      </span>
                      <br />
                      9401760100 / 9867077961
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    ✉️
                  </div>

                  <p className="text-sm font-medium text-blue-700">
                    Write to Us
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    Email
                  </h2>

                  <div className="mt-4 space-y-2 break-words text-sm leading-6 text-slate-600">
                    <p>shsocialworkorganization@gmail.com</p>
                    <p>shswo.org@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Website / Quick Contact */}
            <div className="rounded-2xl bg-blue-700 p-6 text-white shadow-lg sm:p-8">
              <p className="text-sm font-medium text-blue-200">
                Online
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Find Us Online
              </h2>

              <p className="mt-4 text-sm leading-6 text-blue-100">
                Learn more about our organization, activities, programmes
                and initiatives through our website.
              </p>

              <div className="mt-8 rounded-xl bg-white/10 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-blue-200">
                  Website
                </p>

                <p className="mt-2 break-all text-base font-semibold">
                  shswo.org.in
                </p>
              </div>

              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="text-sm leading-6 text-blue-100">
                  We welcome individuals, organizations and communities who
                  share our commitment to serving humanity and creating
                  positive change.
                </p>
              </div>
            </div>
          </div>

          {/* Get Involved */}
          <section className="mt-12 rounded-3xl bg-blue-50 p-6 sm:mt-16 sm:p-10 lg:p-12">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">
                Get Involved
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Be a part of the change.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                You can reach out to us regarding any of our social welfare
                activities or opportunities to contribute to our mission.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Membership",
                "Volunteering",
                "Donations & Support",
                "Health & Awareness Programmes",
                "Community Development",
                "Events & Programmes",
                "Social Welfare Activities",
                "Collaboration & Partnerships",
                "General Enquiries & Suggestions",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-blue-100 bg-white px-4 py-4 text-sm font-medium text-slate-700 shadow-sm"
                >
                  <span className="mr-2 text-blue-600">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* Mission */}
          <section className="py-14 text-center sm:py-20">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                Our Mission
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Together, we can make a difference.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                Your support, participation and encouragement can help us
                reach more people and contribute to the welfare and
                development of our communities.
              </p>

              <div className="mt-8">
                <p className="text-lg font-semibold text-blue-800 sm:text-xl">
                  “Educate Minds • Inspire Hearts • Serve Humanity”
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Saving Humanity Social Work Organization (SHSWO)
                </p>

                <p className="mt-1 text-sm font-medium text-slate-600">
                  Serving Humanity • Supporting Communities • Creating
                  Positive Change
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
