const AboutUs = () => {
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
              About Us
            </h1>

            <p className="mt-6 text-base font-medium leading-7 text-blue-100 sm:text-lg sm:leading-8">
              Saving Humanity Social Work Organization (SHSWO)
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-200 sm:text-base">
              Serving humanity, supporting communities and working towards
              positive social change.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Introduction */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">
                Who We Are
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Working together for humanity and community welfare.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                Saving Humanity Social Work Organization (SHSWO) is a
                community-based organization dedicated to serving humanity and
                working for the welfare and development of society.
              </p>
            </div>
          </section>

          {/* Our Journey */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                01
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">
                  Our Journey
                </p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  From an idea to an organization
                </h2>
              </div>
            </div>

            <div className="mt-7 max-w-4xl space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              <p>
                Our journey began on{" "}
                <strong className="font-semibold text-slate-900">
                  22 May 2021
                </strong>{" "}
                as Social Work Fund with the aim of supporting people in need
                and contributing to community welfare.
              </p>

              <p>
                During the process of formalizing the organization, it was
                found that the name “Social Work Fund” was already registered
                in Assam. Therefore, to establish a distinct and appropriate
                identity, the organization adopted the name{" "}
                <strong className="font-semibold text-slate-900">
                  Saving Humanity Social Work Organization (SHSWO).
                </strong>
              </p>

              <p>
                Our mission, vision and commitment to social service remained
                unchanged. The new name reflects our continued dedication to
                serving humanity and creating positive change in communities.
              </p>

              <p>
                SHSWO was officially registered under the{" "}
                <strong className="font-semibold text-slate-900">
                  Societies Registration Act, 1860
                </strong>
                , on{" "}
                <strong className="font-semibold text-slate-900">
                  21 January 2025.
                </strong>
              </p>
            </div>
          </section>

          {/* What We Do */}
          <section className="mt-8 rounded-2xl bg-blue-700 p-6 text-white shadow-lg sm:p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200">
              What We Do
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Areas of our work
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-blue-100 sm:text-base sm:leading-8">
              Today, the organization works with members, volunteers,
              advisors, professionals and community supporters across
              different areas of social and community development.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Social Welfare",
                "Health & Medical Support",
                "Education & Awareness",
                "Humanitarian Assistance",
                "Youth Development",
                "Skill Development",
                "Sports",
                "Art & Culture",
                "Afforestation",
                "Community Development",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/10 px-4 py-4 text-sm font-medium backdrop-blur-sm"
                >
                  <span className="mr-2 text-blue-200">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* Belief */}
          <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8 lg:p-10">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">
                What We Believe
              </p>

              <p className="mt-4 text-base font-medium leading-8 text-slate-700 sm:text-lg">
                We believe that meaningful change begins with compassion,
                cooperation and collective responsibility.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                Through our initiatives and community participation, we strive
                to support those in need and contribute towards a healthier,
                stronger and more inclusive society.
              </p>
            </div>
          </section>

          {/* Vision / Mission / Values */}
          <section className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Vision */}
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                ◉
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                Our Vision
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                To build a compassionate, healthy, educated and inclusive
                society where every person can live with dignity, opportunity
                and hope.
              </p>
            </article>

            {/* Mission */}
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                ✦
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                Our Mission
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                To serve humanity through practical community-based
                initiatives that promote social welfare, health, education,
                awareness, environmental responsibility, youth development and
                community well-being.
              </p>
            </article>

            {/* Values */}
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                ♥
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                Our Values
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Compassion",
                  "Integrity",
                  "Service",
                  "Inclusiveness",
                  "Responsibility",
                  "Community Participation",
                ].map((value) => (
                  <span
                    key={value}
                    className="rounded-full bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </article>
          </section>

          {/* Closing */}
          <section className="py-14 text-center sm:py-20">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                Our Commitment
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Serving humanity. Supporting communities.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Together, we strive to build a better future through
                compassion, service and meaningful community participation.
              </p>

              <p className="mt-8 text-lg font-semibold text-blue-800 sm:text-xl">
                “Educate Minds • Inspire Hearts • Serve Humanity”
              </p>

              <p className="mt-3 text-sm text-slate-500">
                Saving Humanity Social Work Organization (SHSWO)
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
