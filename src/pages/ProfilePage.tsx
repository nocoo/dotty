import { MapPin, Mail, Phone, Briefcase, Star, Users, Share2, Shield, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageIntro } from "@/components/PageIntro";

const highlights = [
  { label: "Projects", value: "24" },
  { label: "Followers", value: "12.8k" },
  { label: "Rating", value: "4.9" },
  { label: "Badges", value: "18" },
];

const activity = [
  { title: "Published new template", time: "2 hours ago" },
  { title: "Added analytics module", time: "Yesterday" },
  { title: "Reviewed onboarding flow", time: "Feb 09" },
];

export default function ProfilePage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Profile overview with social signals"
        description="Lead roles, activity feed, and contact blocks designed for portfolio or team directories."
        eyebrow="Profile"
        icon={User}
        actions={
          <>
            <button className="rounded-widget bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">Follow</button>
            <button className="rounded-widget bg-card px-4 py-2 text-xs font-medium text-foreground">Message</button>
            <button className="rounded-widget bg-card px-4 py-2 text-xs font-medium text-foreground">Share</button>
          </>
        }
      />
      <div className="rounded-card bg-secondary p-5">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-card flex items-center justify-center text-muted-foreground">
            <Star className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">Zheng Li</p>
            <p className="text-sm text-muted-foreground">Lead Product Designer</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" strokeWidth={1.5} /> Singapore</span>
              <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" strokeWidth={1.5} /> Basalt Studio</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {highlights.map((item) => (
          <div key={item.label} className="rounded-card bg-secondary p-4">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-xl font-semibold text-foreground font-display">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="rounded-card border-0 bg-secondary shadow-none lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <CardTitle className="text-sm font-normal text-muted-foreground">Latest Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {activity.map((item) => (
              <div key={item.title} className="rounded-widget border border-border bg-card p-3">
                <p className="text-sm text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-card border-0 bg-secondary shadow-none">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <CardTitle className="text-sm font-normal text-muted-foreground">Contact</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Mail className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} /> zhengli@basalt.app
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Phone className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} /> +65 1234 5678
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Share2 className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} /> basalt.app/zhengli
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
