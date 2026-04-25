import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { resolveProjectPage } from "../data/projectDetail";
import type { ProjectBodyBlock, ProjectImageItem } from "../data/projectDetail";

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

function MediaSlot({ item, index }: { item: ProjectImageItem; index: number }) {
  const hasSrc = Boolean(item.src?.trim());

  if (!hasSrc) {
    return (
      <div className="project-media-slot project-media-slot--device">
        <div className="project-media-device-stack">
          <div className="device-frame device-frame--large" role="presentation">
            <div className="device-screen">
              <span className="placeholder-label">{item.alt || "Add image"}</span>
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

  return (
    <div className="project-media-slot">
      <img
        src={item.src}
        alt={item.alt}
        className={isContain ? "project-media-img project-media-img--contain" : "project-media-img"}
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

function ImagePair({ block }: { block: Extract<ProjectBodyBlock, { type: "images" }> }) {
  const items = block.items;
  const hasImages = items.length > 0;

  if (!hasImages) {
    return (
      <div className="project-media-row project-media-row--placeholder">
        <div className="project-media-slot project-media-slot--device">
          <div className="project-media-device-stack">
            <div className="device-frame device-frame--large" role="presentation">
              <div className="device-screen">
                <span className="placeholder-label">Add image</span>
              </div>
            </div>
          </div>
        </div>
        <div className="project-media-slot project-media-slot--device">
          <div className="project-media-device-stack">
            <div className="device-frame device-frame--large" role="presentation">
              <div className="device-screen">
                <span className="placeholder-label">Add image</span>
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
        <MediaSlot key={`${item.src ?? "ph"}-${i}`} item={item} index={i} />
      ))}
    </div>
  );
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = resolveProjectPage(slug);

  useEffect(() => {
    document.title = data ? `${data.name} | Nati Medina` : "Project | Nati Medina";
  }, [data]);

  if (!data) {
    return (
      <div className="project-page project-page--empty">
        <p className="project-not-found">This project does not exist.</p>
      </div>
    );
  }

  return (
    <article className="project-page">
      <div className="project-page-inner">
        <header className="project-intro">
          <div className="project-intro-meta">
            <h1 className="project-page-title">{data.name}</h1>
            <dl className="project-meta-list">
              <div className="project-meta-row">
                <dt>Date</dt>
                <dd>{data.date}</dd>
              </div>
              <div className="project-meta-row">
                <dt>Role</dt>
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
                  {block.title ? <h2 className="project-block-title">{block.title}</h2> : null}
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
                <ImagePair block={block} />
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
}
