import { Breadcrumbs, type Crumb } from '@/components/Breadcrumbs';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';

interface AdminLayoutProps {
  /** Breadcrumb trail; the last entry renders as the current page. */
  trail: Crumb[];
  /**
   * `content` is the 721px reading column from the Figma Overview frame.
   * `wide` fills the viewport instead — the Figma column is too narrow for the
   * data tables on the list pages, which wrap every date onto three lines.
   * `bleed` drops the padding and gap entirely so the page can run edge to edge
   * (the User and role tab bar spans the full content width).
   */
  width?: 'content' | 'wide' | 'bleed';
  children: React.ReactNode;
}

/**
 * Page shell for every Admin Center screen: topbar, submenu, breadcrumbs and the
 * centred 721px content column from the Figma frame.
 */
export function AdminLayout({ trail, width = 'content', children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <Sidebar />
      <div className="ml-sidebar pt-topbar">
        <Breadcrumbs trail={trail} />
        {width === 'bleed' ? (
          <main>{children}</main>
        ) : (
          <main className="px-6 pb-8 pt-6">
            <div
              className={`mx-auto flex w-full flex-col gap-16 ${
                width === 'content' ? 'max-w-content' : 'max-w-[1200px]'
              }`}
            >
              {children}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

/** Section Header + body, 20px apart (Figma "Container"). */
export function AdminSection({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-col gap-5">
      <div className="flex w-full items-center gap-4">
        <h2 className="flex-1 whitespace-nowrap text-h6 font-medium text-foreground">
          {title}
        </h2>
        {action}
      </div>
      <div className="flex w-full flex-col gap-6">{children}</div>
    </section>
  );
}
