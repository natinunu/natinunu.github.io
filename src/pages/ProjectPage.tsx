import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { resolveProjectPage } from "../data/projectDetail";
import type { ProjectBodyBlock, ProjectImageItem } from "../data/projectDetail";
import { applyProjectDetailLocale } from "../i18n/projectDetailLocale";
import { useLanguage } from "../i18n/LanguageProvider";
import { STRINGS } from "../i18n/strings";
import { projectPageTitle } from "../i18n/projectLocale";

/** Lazy-loaded animated GIFs often stick on frame 1 in some browsers; load eagerly instead. */
function isGifUrl(src: string): boolean {
  const path = src.split("?")[0].split("#")[0].toLowerCase();
  return path.endsWith(".gif");
}

function imgLoading(
  src: string | undefined,
  index: number,
  override?: ProjectImageItem["loading"],
): "eager" | "lazy" {
  if (override) return override;
  if (src && isGifUrl(src)) return "eager";
  return index === 0 ? "eager" : "lazy";
}

function MediaSlot({
  item,
  index,
  addImageLabel,
}: {
  item: ProjectImageItem;
  index: number;
  addImageLabel: string;
}) {
  const hasSrc = Boolean(item.src?.trim());

  if (!hasSrc) {
    return (
      <div className="project-media-slot project-media-slot--device">
        <div className="project-media-device-stack">
          <div className="device-frame device-frame--large" role="presentation">
            <div className="device-screen">
              <span className="placeholder-label">{item.alt || addImageLabel}</span>
            </div>
          </div>
          {item.caption ? <p className="project-media-caption">{item.caption}</p> : null}
        </div>
      </div>
    );
  }

  if (item.device) {
    const showFrame = item.showDeviceFrame !== false;

    if (!showFrame) {
      if (item.bare) {
        return (
          <div className="project-media-slot project-media-slot--bare">
            <img
              src={item.src}
              alt={item.alt}
              className="project-media-img--embedded project-media-img--bare"
              loading={imgLoading(item.src, index, item.loading)}
              decoding="async"
            />
            {item.caption ? <p className="project-media-caption">{item.caption}</p> : null}
          </div>
        );
      }
      return (
        <div className="project-media-slot project-media-slot--device">
          <div className="project-media-device-stack">
            <div className="project-media-embedded-mockup">
              <img
                src={item.src}
                alt={item.alt}
                className="project-media-img--embedded"
                loading={imgLoading(item.src, index, item.loading)}
                decoding="async"
              />
            </div>
            {item.caption ? <p className="project-media-caption">{item.caption}</p> : null}
          </div>
        </div>
      );
    }

    return (
      <div className="project-media-slot project-media-slot--device">
        <div className="project-media-device-stack">
          <div className="device-frame device-frame--large" role="presentation">
            <div className="device-screen device-screen--media">
              <img
                src={item.src}
                alt={item.alt}
                className="project-media-img--device"
                style={{
                  objectPosition: item.objectPosition ?? "center",
                  objectFit: item.objectFit ?? "cover",
                }}
                loading={imgLoading(item.src, index, item.loading)}
                decoding="async"
              />
            </div>
          </div>
          {item.caption ? <p className="project-media-caption">{item.caption}</p> : null}
        </div>
      </div>
    );
  }

  const fit = item.objectFit ?? "cover";
  const isContain = fit === "contain";
  const bareClass = item.bare ? " project-media-slot--bare" : "";
  const imgBare = item.bare ? " project-media-img--bare" : "";

  return (
    <div className={`project-media-slot${bareClass}`}>
      <img
        src={item.src}
        alt={item.alt}
        className={`${isContain ? "project-media-img project-media-img--contain" : "project-media-img"}${imgBare}`}
        style={{
          objectPosition: item.objectPosition ?? "center",
          objectFit: fit,
        }}
        loading={imgLoading(item.src, index, item.loading)}
        decoding="async"
      />
    </div>
  );
}

function ImagePair({
  block,
  addImageLabel,
}: {
  block: Extract<ProjectBodyBlock, { type: "images" }>;
  addImageLabel: string;
}) {
  const items = block.items;
  const hasImages = items.length > 0;

  if (!hasImages) {
    return (
      <div className="project-media-row project-media-row--placeholder">
        <div className="project-media-slot project-media-slot--device">
          <div className="project-media-device-stack">
            <div className="device-frame device-frame--large" role="presentation">
              <div className="device-screen">
                <span className="placeholder-label">{addImageLabel}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="project-media-slot project-media-slot--device">
          <div className="project-media-device-stack">
            <div className="device-frame device-frame--large" role="presentation">
              <div className="device-screen">
                <span className="placeholder-label">{addImageLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const single = items.length === 1;

  return (
    <div className={single ? "project-media-row project-media-row--single" : "project-media-row"}>
      {items.map((item, i) => (
        <MediaSlot key={`${item.src ?? "ph"}-${i}`} item={item} index={i} addImageLabel={addImageLabel} />
      ))}
    </div>
  );
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLanguage();
  const t = STRINGS[locale];
  const raw = resolveProjectPage(slug);
  const data = raw ? applyProjectDetailLocale(raw, locale) : null;

  useEffect(() => {
    const bundle = STRINGS[locale];
    if (!data || !slug) {
      document.title = bundle.projectNotFoundTitle;
      return;
    }
    const name = projectPageTitle(slug, data.name, locale);
    document.title = `${name} ${bundle.projectDocTitleSuffix}`.trim();
  }, [data, slug, locale]);

  if (!data) {
    return (
      <div className="project-page project-page--empty">
        <p className="project-not-found">{t.projectNotFound}</p>
      </div>
    );
  }

  const blockHeading = (title: string | undefined) => {
    if (!title) return null;
    const mapped = t.blockTitle[title];
    return mapped ?? title;
  };

  return (
    <article className="project-page">
      <div className="project-page-inner">
        <header className="project-intro">
          <div className="project-intro-meta">
            <h1 className="project-page-title">{projectPageTitle(slug, data.name, locale)}</h1>
            <dl className="project-meta-list">
              <div className="project-meta-row">
                <dt>{t.metaDate}</dt>
                <dd>{data.date}</dd>
              </div>
              <div className="project-meta-row">
                <dt>{t.metaRole}</dt>
                <dd>{data.role}</dd>
              </div>
            </dl>
          </div>
          <div className="project-intro-copy">
            <p>{data.intro}</p>
          </div>
        </header>

        <div className="project-case-blocks">
          {data.blocks.map((block, index) => {
            if (block.type === "text") {
              return (
                <section key={`t-${index}`} className="project-block project-block--text">
                  {block.title ? (
                    <h2 className="project-block-title">{blockHeading(block.title)}</h2>
                  ) : null}
                  <div className="project-block-prose">
                    {block.body.split("\n\n").map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                </section>
              );
            }
            return (
              <section key={`i-${index}`} className="project-block project-block--media">
                <ImagePair block={block} addImageLabel={t.addImagePlaceholder} />
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
}
