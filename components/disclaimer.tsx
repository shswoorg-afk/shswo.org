const Disclaimer = () => {
  const sections = [
    {
      title: "General Information",
      content: [
        "Information about our organization, activities, programmes, projects, events and initiatives is provided for general information. Activities and programmes mentioned on the website may be proposed, ongoing, completed or subject to change depending on circumstances and available resources.",
      ],
    },
    {
      title: "Health Information",
      content: [
        "Any health-related information provided on this website is intended only for general health awareness and educational purposes. It should not be considered a substitute for professional medical advice, diagnosis or treatment.",
        "Visitors should consult a qualified healthcare professional for individual medical concerns.",
      ],
    },
    {
      title: "Donations and Financial Support",
      content: [
        "Information relating to donations, fundraising activities and financial support is provided for charitable purposes. Donors are advised to verify the relevant donation details and purpose before making any contribution.",
        "SHSWO will utilize donations and funds in accordance with its charitable objectives and applicable rules and regulations.",
      ],
    },
    {
      title: "External Links",
      content: [
        "This website may contain links to third-party websites, social media platforms, payment services or other external resources.",
        "SHSWO does not control and is not responsible for the content, accuracy, availability, privacy practices or security of external websites. The inclusion of any external link does not necessarily constitute an endorsement or recommendation by SHSWO.",
      ],
    },
    {
      title: "Photographs and Event Information",
      content: [
        "Photographs, videos, names and other information relating to SHSWO activities or events may be published for documentation, awareness, reporting and organizational purposes.",
      ],
    },
    {
      title: "Limitation of Responsibility",
      content: [
        "SHSWO makes reasonable efforts to maintain the information provided on this website; however, the organization shall not be responsible for any loss, damage or inconvenience resulting from reliance on information published on the website.",
      ],
    },
    {
      title: "Changes to This Disclaimer",
      content: [
        "SHSWO reserves the right to update, modify or remove website content and this Disclaimer at any time without prior notice.",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              Saving Humanity Social Work Organization
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Disclaimer
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8">
              Important information about the content, services and resources
              provided through the SHSWO website.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer Content */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Document */}
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2 lg:p-10">
              {/* Introduction */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Website Disclaimer
                </h2>

                <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Saving Humanity Social Work Organization (SHSWO) provides
                  the information on this website for general informational,
                  educational and awareness purposes.
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  While we make reasonable efforts to ensure that the
                  information published on this website is accurate and up to
                  date, SHSWO does not guarantee that all information is
                  complete, accurate, current or free from errors.
                </p>
              </div>

              {/* Sections */}
              <div className="divide-y divide-slate-200">
                {sections.map((section, index) => (
                  <section
                    key={section.title}
                    className="py-8 first:pt-8 last:pb-2"
                  >
                    <div className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-700">
                        {index + 1}
                      </span>

                      <div className="min-w-0">
                        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                          {section.title}
                        </h2>

                        <div className="mt-3 space-y-3">
                          {section.content.map((paragraph) => (
                            <p
                              key={paragraph}
                              className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </article>

            {/* Side Information */}
            <aside className="h-fit space-y-6 lg:sticky lg:top-6">
              {/* Contact Card */}
              <div className="rounded-2xl bg-blue-700 p-6 text-white shadow-lg sm:p-8">
                <p className="text-sm font-medium text-blue-200">
                  Questions?
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Contact SHSWO
                </h2>

                <p className="mt-4 text-sm leading-6 text-blue-100">
                  For any questions or clarification regarding the information
                  published on this website, please contact us.
                </p>

                <div className="mt-7 space-y-5 border-t border-white/15 pt-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                      Office
                    </p>

                    <p className="mt-2 text-sm leading-6 text-white">
                      Kazirbazar, Near SBI CSP
                      <br />
                      P.O. – Ratabari
                      <br />
                      P.S. – Ratabari
                      <br />
                      Dist. – Sribhumi (Karimganj)
                      <br />
                      Assam – 788735, India
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                      Mobile
                    </p>

                    <p className="mt-2 text-sm text-white">
                      9401760100 / 9867077961
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                      Email
                    </p>

                    <p className="mt-2 break-words text-sm leading-6 text-white">
                      shsocialworkorganization@gmail.com
                      <br />
                      shswo.org@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Note */}
              <div className="rounded-2xl bg-blue-50 p-6 sm:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                  ℹ️
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  Please note
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Information published on this website may change as our
                  activities, programmes and initiatives develop.
                </p>
              </div>
            </aside>
          </div>

          {/* Footer Statement */}
          <section className="py-14 text-center sm:py-20">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                Saving Humanity Social Work Organization
              </p>

              <h2 className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl">
                Educate Minds • Inspire Hearts • Serve Humanity
              </h2>

              <p className="mt-3 text-sm text-slate-500">
                Serving Humanity • Supporting Communities • Creating Positive
                Change
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Disclaimer;
