import { Card } from '@/components/ui/Card';

export default function DashboardPage() {
  return (
    <div className="p-6 h-full">
      <div
        className="h-full flex flex-col rounded-2xl border overflow-hidden"
        style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
      >
        <div className="px-8 py-8" style={{ background: 'var(--card-header-bg)' }}>
          <h1 className="text-2xl font-bold">Home</h1>
        </div>
        <div className="p-6 flex flex-col gap-6 flex-1">
          <Card variant="inner">
            <h2 className="text-xl font-semibold mb-2">Welcome to Stream Retriever</h2>
            <p className="text-sm" style={{ color: 'var(--sidebar-text-secondary)' }}>
              Your streaming toolkit, all in one place.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
