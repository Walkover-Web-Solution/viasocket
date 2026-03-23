'use client';
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, LayoutGrid } from "lucide-react";
import { GlassCard } from "./shared";
import createURL from "@/utils/createURL";
import ExternalLink from "@/utils/ExternalLink";

function FooterTag({ label, href }) {
  const inner = <span className="footer-tag">{label}</span>;
  if (href) {
    return <Link href={href}>{inner}</Link>;
  }
  return inner;
}

// ─── Footer Learn More ───────────────────────────────────────────────
function FooterLearnMore({ href, external, appSlugName, doFollowArray }) {
  const content = (
    <span className="hover-arrow-cta inline-flex items-center gap-1 mt-1 no-underline text-black/35 hover:text-blue-600">
      Learn More
      <ChevronRight size={13} />
    </span>
  );

  if (external && href) {
    return (
      <ExternalLink
        href={href.startsWith('http') ? href : 'http://' + href}
        appSlugName={appSlugName}
        doFollowArray={doFollowArray}
      >
        {content}
      </ExternalLink>
    );
  }

  return (
    <Link href={href || '#'} className="no-underline">
      {content}
    </Link>
  );
}

// ─── About Cards Section ─────────────────────────────────────────────
export default function AboutCardsSection({ appOneDetails, getDoFollowUrlStatusArray }) {
  return (
    <section className="section">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* About App */}
        <GlassCard className="flex flex-col">
          <div className="p-8 flex flex-col gap-5 flex-1">
            <div className="app-icon-box w-10 h-10 border primary-border bg-[var(--vs-surface)]">
              <Image
                alt={appOneDetails?.name || 'App'}
                src={appOneDetails?.iconurl || 'https://placehold.co/36x36'}
                width={40}
                height={40}
              />
            </div>
            <h3 className="card-title-sm">About {appOneDetails?.name}</h3>
            <p className="text-sm blog-card-desc">
              {appOneDetails?.description}
            </p>
            {appOneDetails?.category?.length > 0 && (
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {appOneDetails.category.slice(0, 2).map((cat, index) => (
                  <FooterTag
                    key={index}
                    label={cat}
                    href={createURL(`/integrations/category/${cat.toLowerCase().replace(/\s+/g, '-')}`)}
                  />
                ))}
              </div>
            )}
            <FooterLearnMore
              href={appOneDetails?.domain}
              external
              appSlugName={appOneDetails?.appslugname}
              doFollowArray={getDoFollowUrlStatusArray}
            />
          </div>
        </GlassCard>

        {/* About viaSocket */}
        <GlassCard className="flex flex-col">
          <div className="p-8 flex flex-col gap-5 flex-1">
            <div className="flex items-center justify-center shrink-0 w-10 h-10 border primary-border bg-[var(--vs-surface)]">
              <LayoutGrid size={20} />
            </div>
            <h3 className="card-title-sm">About viaSocket</h3>
            <p className="text-sm blog-card-desc">
              viaSocket is an AI-powered, workflow automation platform that helps people and businesses connect apps and
              automate repetitive tasks. With thousands of integrations, anyone can build workflows to move data, cut
              manual work, and save time. Whether for simple tasks or large-scale processes, viaSocket makes automation
              easy and helps teams focus on what matters most.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <FooterTag label="Workflow Automation" href="/" />
              <FooterTag label="Integration" href="/integrations" />
            </div>
            <FooterLearnMore href="/" />
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
