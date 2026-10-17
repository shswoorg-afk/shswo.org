import { createFileRoute } from "@tanstack/react-router";
import { getActivites } from "../../serverFunc/activites.crud";
import type { Activites } from "../../types/ActivityType";
import BackButton from "../../components/BackButton";

export const Route = createFileRoute("/activites")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "SHSWO | Activities" }],
  }),
  loader: () => getActivites(),
});

function RouteComponent() {
  const activites: Activites[] = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6">
      <div>
        <BackButton to="/"/>
      </div>
      <div className="mx-auto max-w-2xl">
        {/* Page header */}
        <header className="mb-7 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            SHSWO Community
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Our Activities
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Follow our work, community programs, and efforts to serve humanity.
          </p>
        </header>

        {/* Activity feed */}
        {activites.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blue-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-600">
              ✦
            </div>
            <h2 className="mt-4 text-lg font-semibold">
              No activities yet
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Our latest community activities will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activites.map((item) => (
              <article
                key={item.activityImageFileId}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md"
              >
                {/* Post header */}
                <div className="flex items-center gap-3 px-5 pt-5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700 ring-1 ring-blue-100">
                    S
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-semibold text-slate-900">
                      SHSWO
                    </h2>
                    <p className="text-xs text-slate-500">
                      Saving Humanity Social Work Organization
                    </p>
                  </div>

                  <span className="ml-auto rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    Community
                  </span>
                </div>

                {/* Post content */}
                {item.activityTitle && (
                  <h3 className="px-5 pt-4 text-lg font-bold leading-snug text-slate-900">
                    {item.activityTitle}
                  </h3>
                )}

                {item.activityContent && (
                  <p className="whitespace-pre-wrap break-words px-5 pt-2 text-sm leading-7 text-slate-600">
                    {item.activityContent}
                  </p>
                )}

                {/* Activity image */}
                {item.activityImageUrl && (
                  <div className="mt-4 overflow-hidden border-y border-slate-100 bg-slate-50">
                    <img
                      src={item.activityImageUrl}
                      alt={item.activityTitle || "SHSWO community activity"}
                      loading="lazy"
                      className="max-h-[520px] w-full object-contain"
                    />
                  </div>
                )}

                {/* Post footer */}
                <div className="flex items-center gap-2 px-5 py-4">
                  <span className="flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    ♥
                  </span>
                  <p className="text-xs font-medium text-slate-500">
                    Serving humanity, supporting communities.
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <footer className="py-8 text-center text-xs text-slate-400">
          SHSWO · Serving Humanity · Building a Better Future
        </footer>
      </div>
    </main>
  );
}