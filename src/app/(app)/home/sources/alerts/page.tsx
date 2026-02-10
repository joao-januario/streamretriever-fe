import { Card } from '@/components/ui/Card';

export default function AlertsPage() {
  return (
    <div className="p-6 h-full">
      <Card className="h-full flex flex-col !p-0 overflow-hidden">
        <Card variant="header" className="!rounded-none !border-0 px-8 py-8">
          <h1 className="text-2xl font-bold">Alerts</h1>
        </Card>
        <div className="p-6 flex flex-col gap-6 flex-1">
          <Card variant="inner">
            <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
            <p className="text-sm text-[var(--text-muted)]">
              Alert source management is currently in development.
            </p>
          </Card>
        </div>
      </Card>
    </div>
  );
}
