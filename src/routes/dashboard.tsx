import { createFileRoute, redirect } from "@tanstack/react-router";
import { getMemberDashboard } from "../../serverFunc/member.dashboard"; 
import { getAdvisorDashboard } from "../../serverFunc/advisor.dashboard"; 
import MemberDashboardProfile from "../../components/member.dashboard.profile"; 
import AdvisorDashboardProfile from "../../components/advisor.dashboard.profile"; 

export const Route = createFileRoute("/dashboard")({
    loader: async () => {
        const advisor = await getAdvisorDashboard();

        if (advisor?.fullName) {
            return { advisor, member: null };
        }

        const member = await getMemberDashboard();

        if (member) {
            return { advisor: null, member };
        }

        throw redirect({ to: "/" });
    },
    component: Dashboard,
});

function Dashboard() {
    const { advisor, member } = Route.useLoaderData();

    if (advisor) {
        return <AdvisorDashboardProfile advisor={advisor} />;
    }

    if (member) {
        return <MemberDashboardProfile member={member} />;
    }

    return null;
}