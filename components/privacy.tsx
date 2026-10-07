const PrivacyPolicy = () => {
  const sections = [
    {
      title: "About This Privacy Policy",
      content: [
        "SHSWO is a non-profit social welfare organization working for humanitarian and community welfare purposes.",
        "We are committed to handling personal information responsibly and using it only for legitimate organizational purposes.",
        "By using our website or voluntarily submitting information to us, you acknowledge this Privacy Policy.",
      ],
    },
    {
      title: "Information We May Collect",
      content: [
        "Depending on how you interact with SHSWO, we may collect information such as:",
      ],
      list: [
        "Name",
        "Mobile or telephone number",
        "Email address",
        "Address or location",
        "Membership-related information",
        "Volunteer information",
        "Event or programme registration details",
        "Information provided through enquiry or contact forms",
        "Donation or support-related information where necessary",
        "Other information voluntarily provided by you",
      ],
      footer:
        "We generally collect only the information reasonably necessary for the relevant organizational purpose.",
    },
    {
      title: "How We Use Your Information",
      content: [
        "Information voluntarily provided to SHSWO may be used for legitimate non-profit and organizational purposes, including:",
      ],
      list: [
        "Responding to enquiries and requests",
        "Managing membership and volunteer activities",
        "Registering participants for programmes and events",
        "Communicating programme-related information",
        "Organizing social welfare, health, awareness and community activities",
        "Communicating with donors, supporters and well-wishers",
        "Maintaining appropriate organizational records",
        "Preparing programme reports and documentation",
        "Improving our website and digital services",
        "Protecting the security and proper functioning of our website and forms",
      ],
      footer:
        "We do not sell, rent or trade personal information for commercial purposes.",
    },
    {
      title: "Membership and Volunteer Information",
      content: [
        "If you apply for membership or volunteering with SHSWO, the information you provide may be used to process your application, maintain organizational records and communicate with you regarding relevant activities.",
        "Such information will be handled for legitimate organizational purposes.",
      ],
    },
    {
      title: "Programme and Event Registration",
      content: [
        "For certain programmes, events, awareness activities or health-related initiatives, SHSWO may collect information through online or offline registration forms.",
        "The information may be used for:",
      ],
      list: [
        "Registration and identification",
        "Programme administration",
        "Communication regarding the programme",
        "Maintaining necessary records",
        "Preparing internal reports and programme statistics",
      ],
      footer:
        "Where a programme requires specific information, we will try to collect only information relevant to that programme.",
    },
    {
      title: "Health Programme Information",
      content: [
        "For health camps or health-related activities, certain personal or basic health information may be collected when necessary for registration, screening, consultation, referral or programme administration.",
        "Such information should be provided voluntarily and will be used only for the relevant programme and legitimate organizational purposes.",
        "Health information should not be submitted through general website forms unless the form specifically requests it for an identified health programme.",
      ],
    },
    {
      title: "Donations and Support",
      content: [
        "If you choose to support SHSWO financially or otherwise, we may receive information necessary to acknowledge, record or administer your contribution.",
        "Where payments are processed through banks, payment gateways, QR services or other third-party platforms, those services may collect and process information according to their own privacy policies.",
        "SHSWO does not request unnecessary banking or payment information through ordinary website contact forms.",
      ],
    },
    {
      title: "Google Forms and Other Third-Party Services",
      content: [
        "SHSWO may use services such as Google Forms, Google Sheets, Google Sites, email services, payment services or other third-party platforms to operate certain online facilities.",
        "Information submitted through such services may be processed or stored by the relevant service provider according to its own terms and privacy policy.",
        "SHSWO does not control the privacy practices of independent third-party service providers.",
      ],
    },
    {
      title: "Cookies and Website Technologies",
      content: [
        "Our website may use cookies or similar technologies provided by the website platform or third-party services.",
        "These technologies may help with website functionality, security, performance and basic usage information.",
        "You may be able to manage cookies through your browser settings.",
      ],
    },
    {
      title: "Information Sharing",
      content: [
        "SHSWO does not sell or commercially trade your personal information.",
        "Information may be shared only when reasonably necessary for legitimate organizational purposes, such as:",
      ],
      list: [
        "Providing a requested service or programme",
        "Managing an event or activity",
        "Using a necessary third-party service",
        "Complying with applicable legal or regulatory requirements",
        "Protecting the rights, safety or security of the organization or individuals",
      ],
    },
    {
      title: "Photographs, Videos and Publicity",
      content: [
        "Photographs, videos, names or other information relating to SHSWO programmes and events may sometimes be used for legitimate organizational purposes, including:",
      ],
      list: [
        "Activity reports",
        "Awareness and educational materials",
        "Website updates",
        "Social media posts",
        "Annual or programme reports",
        "Documentation of organizational activities",
      ],
      footer:
        "Where appropriate, SHSWO will take reasonable steps to respect individual privacy and any applicable consent requirements.",
    },
    {
      title: "Data Security",
      content: [
        "SHSWO takes reasonable administrative and technical measures to protect information under its control against unauthorized access, misuse, alteration or disclosure.",
        "However, no internet transmission, electronic storage system or online service can be guaranteed to be completely secure.",
      ],
    },
    {
      title: "External Links",
      content: [
        "Our website may contain links to external websites, social media pages, payment services or other third-party platforms.",
        "These websites operate independently and may have their own privacy policies.",
        "SHSWO is not responsible for the privacy practices, content or security of external websites.",
      ],
    },
    {
      title: "Data Retention",
      content: [
        "SHSWO may retain information for as long as reasonably necessary for the purpose for which it was collected, organizational record-keeping, programme administration, legal compliance or other legitimate purposes.",
        "When information is no longer reasonably required, appropriate steps may be taken to delete, remove or securely dispose of it, subject to applicable requirements.",
      ],
    },
    {
      title: "Your Choices",
      content: [
        "You may choose not to provide personal information when it is not necessary.",
        "If you have voluntarily provided information to SHSWO and wish to request clarification, correction or removal of that information, you may contact us using the details provided below.",
        "Certain records may need to be retained where required for legitimate organizational, financial, legal or regulatory purposes.",
      ],
    },
    {
      title: "Children's Privacy",
      content: [
        "Our website is intended primarily for general informational and charitable purposes.",
        "We do not knowingly seek unnecessary personal information from children. Where children participate in programmes or activities, information may be collected only when reasonably necessary for programme administration and with appropriate involvement of a parent, guardian or responsible authority, where applicable.",
      ],
    },
    {
      title: "Changes to This Privacy Policy",
      content: [
        "SHSWO may update this Privacy Policy from time to time to reflect changes in our activities, website services, technology or applicable requirements.",
        "The latest version will always be published on this page with the updated “Last Updated” date.",
      ],
    },
    {
      title: "Contact Us",
      content: [
        "If you have any questions, concerns or requests regarding this Privacy Policy or information provided to SHSWO, please contact us.",
      ],
    },
  ];

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
              Privacy Policy
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8">
              How SHSWO collects, uses, protects and handles information
              provided through our website and digital services.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-2 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Policy */}
            <article className="rounded-2xl border border-slate-200 bg-white px-3 shadow-sm sm:p-8 lg:col-span-2 lg:p-10">
              {/* Introduction */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Your Privacy Matters
                </h2>

                <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Saving Humanity Social Work Organization (SHSWO) respects
                  the privacy of visitors, members, volunteers, donors,
                  supporters and other individuals who interact with our
                  organization through our website.
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  This Privacy Policy explains how we may collect, use, store
                  and protect information that you voluntarily provide to us
                  through our website, online forms or other digital services
                  connected with our activities.
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

                      <div className="min-w-0 flex-1">
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

                        {section.list && (
                          <ul className="mt-4 space-y-2">
                            {section.list.map((item) => (
                              <li
                                key={item}
                                className="flex gap-3 text-sm leading-6 text-slate-600 sm:text-base"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.footer && (
                          <p className="mt-4 text-sm font-medium leading-7 text-slate-700 sm:text-base">
                            {section.footer}
                          </p>
                        )}

                        {/* Contact details */}
                        {section.title === "Contact Us" && (
                          <div className="mt-6 rounded-xl bg-blue-50 p-5 sm:p-6">
                            <address className="not-italic text-sm leading-7 text-slate-600 sm:text-base">
                              Kazirbazar, Near SBI CSP
                              <br />
                              Ratabari
                              <br />
                              Dist. – Sribhumi (Karimganj), Assam – 788735,
                              India
                              <br />
                              <br />
                              <strong className="text-slate-900">
                                Mobile:
                              </strong>{" "}
                              9401760100 / 9867077961
                              <br />
                              <strong className="text-slate-900">
                                Email:
                              </strong>{" "}
                              <span className="break-words">
                                shsocialworkorganization@gmail.com /{" "}
                                shswo.org@gmail.com
                              </span>
                            </address>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="h-fit space-y-6 lg:sticky lg:top-6">
              {/* Privacy Summary */}
              <div className="rounded-2xl bg-blue-700 p-6 text-white shadow-lg sm:p-8">
                <p className="text-sm font-medium text-blue-200">
                  Privacy at a glance
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Responsible Information Handling
                </h2>

                <p className="mt-4 text-sm leading-6 text-blue-100">
                  SHSWO is committed to using personal information responsibly
                  and only for legitimate organizational purposes.
                </p>

                <div className="mt-7 space-y-4 border-t border-white/15 pt-6">
                  {[
                    "No selling of personal information",
                    "Reasonable security measures",
                    "Purpose-based information collection",
                    "Respect for individual privacy",
                  ].map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs">
                        ✓
                      </span>

                      <p className="text-sm leading-6 text-blue-50">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Last Updated */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
                  Policy Information
                </p>

                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  Privacy Policy
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  This policy may be updated from time to time to reflect
                  changes in our activities, technology, website services or
                  applicable requirements.
                </p>
              </div>

              {/* Contact */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <p className="text-sm font-semibold text-blue-700">
                  Need help?
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  Contact SHSWO
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  For questions, concerns, corrections or requests regarding
                  your information, please contact us.
                </p>

                <div className="mt-5 space-y-2 text-sm text-slate-600">
                  <p>📞 9401760100 / 9867077961</p>
                  <p className="break-words">
                    ✉️ shsocialworkorganization@gmail.com
                  </p>
                  <p className="break-words">
                    ✉️ shswo.org@gmail.com
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {/* Our Commitment */}
          <section className="py-14 text-center sm:py-20">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                Our Commitment
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Respecting privacy. Serving responsibly.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                Saving Humanity Social Work Organization (SHSWO) is committed
                to respecting individual privacy and handling personal
                information responsibly while carrying out its charitable,
                humanitarian and community welfare activities.
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

export default PrivacyPolicy;