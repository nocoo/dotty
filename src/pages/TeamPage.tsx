import { Users, UserPlus, Crown, Shield } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";

const team = [
  { name: "Zheng Li", role: "Lead Designer", status: "Owner" },
  { name: "Mina Park", role: "Product Manager", status: "Admin" },
  { name: "Ethan Cole", role: "Frontend Engineer", status: "Member" },
  { name: "Ava Reyes", role: "Data Analyst", status: "Member" },
];

const roleIcon: Record<string, React.ElementType> = {
  Owner: Crown,
  Admin: Shield,
  Member: Users,
};

export default function TeamPage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Team directory with roles and access"
        description="Member list, permission badges, and onboarding actions in one surface."
        eyebrow="Team"
        icon={Users}
        actions={
          <button className="flex items-center gap-2 rounded-widget bg-primary px-3 py-2 text-xs font-medium text-primary-foreground">
            <UserPlus className="h-3.5 w-3.5" strokeWidth={1.5} /> Invite
          </button>
        }
      />

      <div className="rounded-card bg-secondary p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {team.map((member) => {
            const Icon = roleIcon[member.status] ?? Users;
            return (
              <div key={member.name} className="rounded-widget border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.5} /> {member.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
