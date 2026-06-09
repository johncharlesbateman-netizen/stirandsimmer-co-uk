import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, KeyRound, ShieldCheck } from "lucide-react";

const ScreenshotPlaceholder = ({ label }: { label: string }) => (
  <div className="my-4 flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-border bg-muted/40 text-xs text-muted-foreground">
    Screenshot placeholder — {label}
  </div>
);

const Step = ({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex gap-4">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
      {n}
    </div>
    <div className="flex-1 space-y-2 pb-2">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <div className="space-y-2 text-sm text-muted-foreground">{children}</div>
    </div>
  </div>
);

export default function AdminDatabasePassword() {
  return (
    <Layout>
      <div className="container mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8 flex items-center gap-3">
          <KeyRound className="h-7 w-7 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reset database password</h1>
            <p className="text-sm text-muted-foreground">
              Rotate the Postgres password for external database connections.
            </p>
          </div>
        </div>

        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Why this lives in the Cloud panel, not the app</AlertTitle>
          <AlertDescription>
            The Postgres superuser password is managed by the Lovable Cloud control plane.
            For security, it can only be rotated through the Cloud UI — not via the app
            or the AI assistant. Use a strong, randomly generated password and store it
            in your password manager.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Step-by-step (desktop)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Step n={1} title="Open the More panel">
              <p>
                In the Lovable editor top navigation, click the <Badge variant="secondary">More</Badge>{" "}
                icon. This panel consolidates Cloud, Analytics, Payments, Security and SEO.
              </p>
              <ScreenshotPlaceholder label="Editor top nav highlighting 'More'" />
            </Step>

            <Step n={2} title="Switch to Cloud in the sidebar">
              <p>
                In the More panel sidebar, select <Badge variant="secondary">Cloud</Badge>.
              </p>
              <ScreenshotPlaceholder label="More panel sidebar with 'Cloud' selected" />
            </Step>

            <Step n={3} title="Open Database">
              <p>
                In the Cloud sub-navigation, click <Badge variant="secondary">Database</Badge>.
                You'll see tables, RLS policies and connection information.
              </p>
              <ScreenshotPlaceholder label="Cloud → Database tab" />
            </Step>

            <Step n={4} title="Open Connection info / Settings">
              <p>
                Look for <Badge variant="secondary">Connection info</Badge> (sometimes under a{" "}
                <Badge variant="secondary">Settings</Badge> or three-dot menu). This is where
                external connection strings and the password reset control live.
              </p>
              <ScreenshotPlaceholder label="Database → Connection info panel" />
            </Step>

            <Step n={5} title="Click 'Reset database password'">
              <p>
                Press <Badge variant="secondary">Reset database password</Badge>. Cloud will
                generate a strong password and display it <strong>once</strong>. Copy it
                immediately into your password manager — it cannot be retrieved later.
              </p>
              <ScreenshotPlaceholder label="Reset password modal with generated value" />
            </Step>

            <Step n={6} title="Update external tools">
              <p>
                Paste the new password into any external client (psql, TablePlus, DBeaver,
                pgAdmin, BI tools, etc.). Existing app code and edge functions continue to
                work automatically — they use managed service keys, not this password.
              </p>
            </Step>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Mobile shortcut</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Switch to <Badge variant="secondary">Chat mode</Badge> → bottom-right{" "}
              <Badge variant="secondary">…</Badge> → <Badge variant="secondary">Cloud</Badge>{" "}
              → <Badge variant="secondary">Database</Badge> → Connection info → Reset.
            </p>
            <ScreenshotPlaceholder label="Mobile Cloud → Database flow" />
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Good practice</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Always let Cloud generate the password — never reuse or pick a memorable one.</li>
              <li>Store it in a password manager (1Password, Bitwarden, etc.) immediately.</li>
              <li>Rotate after any suspected leak or whenever a collaborator with access leaves.</li>
              <li>Prefer read-only roles for analytics tools where possible.</li>
              <li>Never paste the password into chat, code, commits or screenshots.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
