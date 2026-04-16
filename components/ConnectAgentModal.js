"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ConnectAgentModal.module.css";

const SERVER_NAME = "viennaup-events";

function buildClients(mcpUrl) {
  const jsonBlock = (obj) => JSON.stringify(obj, null, 2);

  return [
    {
      id: "openclaw",
      label: "OpenClaw 🦞",
      showFeatureCard: true,
      tagline: "One-click skill bundle",
      intro: (
        <>
          We built a ready-made OpenClaw skill for ViennaUP. Install the skill
          bundle, point it at the hosted HTTP API, and OpenClaw can answer
          programme questions without a separate MCP server config.
        </>
      ),
      download: {
        href: "/api/agent-skill",
        filename: "viennaup-events.skill.zip",
        label: "Download skill (.zip)"
      },
      steps: [
        {
          title: "1. Unzip into your OpenClaw skills folder",
          code: `mkdir -p ~/.openclaw/skills\nunzip viennaup-events.skill.zip -d ~/.openclaw/skills/`,
          lang: "bash"
        },
        {
          title: "2. Configure the skill env",
          desc: (
            <>
              Merge this block into <span className={styles.kbd}>~/.openclaw/openclaw.json</span> under
              {" "}
              <span className={styles.kbd}>skills.entries</span>:
            </>
          ),
          code: jsonBlock({
            skills: {
              entries: {
                [SERVER_NAME]: {
                  enabled: true,
                  env: {
                    VIENNAUP_API_BASE_URL: `${mcpUrl.replace(/\/mcp$/, "")}/openclaw`
                  }
                }
              }
            }
          }),
          lang: "json"
        },
        {
          title: "3. Refresh skills",
          desc: (
            <>
              Start a new OpenClaw turn. If the skill does not show up immediately, check
              {" "}
              <span className={styles.kbd}>openclaw skills list</span> or restart the gateway.
            </>
          ),
          code: "openclaw skills list",
          lang: "bash"
        },
        {
          title: "4. Try it",
          desc: (
            <>
              Ask your agent: <em>"Using the viennaup-events skill, recommend sessions on 18 May for an impact investor."</em>
            </>
          )
        }
      ]
    },
    {
      id: "claude-code",
      label: "Claude Code",
      steps: [
        {
          title: "Option A — one-liner (recommended)",
          desc: (
            <>
              In any terminal where the <span className={styles.kbd}>claude</span> CLI is installed:
            </>
          ),
          code: `claude mcp add --transport http ${SERVER_NAME} ${mcpUrl}`,
          lang: "bash"
        },
        {
          title: "Option B — manual config",
          desc: (
            <>
              Add this to your <span className={styles.kbd}>~/.claude.json</span> (project scope works too):
            </>
          ),
          code: jsonBlock({
            mcpServers: {
              [SERVER_NAME]: {
                type: "http",
                url: mcpUrl
              }
            }
          }),
          lang: "json"
        },
        {
          title: "Try it",
          desc: (
            <>
              Restart <span className={styles.kbd}>claude</span>, then ask: <em>"Using the {SERVER_NAME} MCP, recommend ViennaUP events for an investor on the 18th."</em>
            </>
          )
        }
      ]
    },
    {
      id: "chatgpt",
      label: "ChatGPT",
      steps: [
        {
          title: "Enable Developer Mode",
          desc: (
            <>
              Open <strong>Settings → Connectors → Advanced</strong> in the ChatGPT web app and turn on <strong>Developer Mode</strong>. A remote MCP server requires a paid plan (Plus, Pro, Business, Enterprise, or Edu).
            </>
          )
        },
        {
          title: "Add the connector",
          desc: (
            <>
              <strong>Settings → Connectors → Add custom connector</strong>. Paste the URL below, pick <strong>No authentication</strong>, and save.
            </>
          ),
          code: mcpUrl,
          lang: "text"
        },
        {
          title: "Use it in a chat",
          desc: (
            <>
              Start a new chat, open the <span className={styles.kbd}>+</span> menu → <strong>Developer tools</strong>, and enable <strong>{SERVER_NAME}</strong>. Then ask it about the programme.
            </>
          )
        }
      ]
    },
    {
      id: "cursor",
      label: "Cursor",
      steps: [
        {
          title: "Deeplink (fastest)",
          desc: (
            <>
              <a
                href={`cursor://anysphere.cursor-deeplink/mcp/install?name=${encodeURIComponent(
                  SERVER_NAME
                )}&config=${encodeURIComponent(
                  btoa(JSON.stringify({ url: mcpUrl }))
                )}`}
              >
                Click here
              </a>{" "}
              to install directly into Cursor.
            </>
          )
        },
        {
          title: "Manual — global config",
          desc: (
            <>
              Create or edit <span className={styles.kbd}>~/.cursor/mcp.json</span>:
            </>
          ),
          code: jsonBlock({
            mcpServers: {
              [SERVER_NAME]: {
                url: mcpUrl
              }
            }
          }),
          lang: "json"
        },
        {
          title: "Reload MCP servers",
          desc: (
            <>
              Open <strong>Cursor Settings → MCP &amp; Integrations</strong> and toggle <strong>{SERVER_NAME}</strong> on. Tools should appear in chat.
            </>
          )
        }
      ]
    },
    {
      id: "windsurf",
      label: "Windsurf",
      steps: [
        {
          title: "Open MCP settings",
          desc: (
            <>
              In Windsurf, open <strong>Settings → Cascade → MCP servers</strong> and click <strong>Add custom server</strong>, or edit the config directly.
            </>
          )
        },
        {
          title: "Config",
          desc: (
            <>
              Add this block to <span className={styles.kbd}>~/.codeium/windsurf/mcp_config.json</span>:
            </>
          ),
          code: jsonBlock({
            mcpServers: {
              [SERVER_NAME]: {
                serverUrl: mcpUrl
              }
            }
          }),
          lang: "json"
        },
        {
          title: "Refresh",
          desc: <>Hit the refresh icon in Cascade's MCP panel. The {SERVER_NAME} tools will load.</>
        }
      ]
    },
    {
      id: "stdio",
      label: "Other (stdio bridge)",
      steps: [
        {
          title: "For clients without streamable HTTP",
          desc: (
            <>
              Claude Desktop stable, older Continue/Zed builds, etc. can speak to the server through <span className={styles.kbd}>mcp-remote</span>:
            </>
          ),
          code: jsonBlock({
            mcpServers: {
              [SERVER_NAME]: {
                command: "npx",
                args: ["-y", "mcp-remote", mcpUrl]
              }
            }
          }),
          lang: "json"
        },
        {
          title: "Where it goes",
          desc: (
            <>
              Claude Desktop: <span className={styles.kbd}>~/Library/Application Support/Claude/claude_desktop_config.json</span> (macOS) or the equivalent config path your client documents.
            </>
          )
        }
      ]
    }
  ];
}

export default function ConnectAgentModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState("openclaw");
  const [mcpUrl, setMcpUrl] = useState("/api/mcp");
  const [copiedId, setCopiedId] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    if (typeof window !== "undefined") {
      setMcpUrl(`${window.location.origin}/api/mcp`);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", handleKey);
    const previouslyFocused = document.activeElement;
    dialogRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", handleKey);
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [open, onClose]);

  const clients = useMemo(() => buildClients(mcpUrl), [mcpUrl]);
  const active = clients.find((c) => c.id === activeTab) || clients[0];

  const copy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1500);
    } catch {
      // Clipboard blocked (e.g. insecure context); fallback leaves the user to copy manually.
    }
  };

  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="connect-agent-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className={styles.modal} ref={dialogRef} tabIndex={-1}>
        <div className={styles.header}>
          <div>
            <h2 id="connect-agent-title">Connect your agent</h2>
            <p>
              Plug the ViennaUP events MCP server into your assistant. It can then search the programme, recommend events, find venues near you, and more.
            </p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.urlRow}>
          <span className={styles.urlLabel}>MCP URL</span>
          <code className={styles.urlValue}>{mcpUrl}</code>
          <button type="button" className={styles.copyBtn} onClick={() => copy(mcpUrl, "url")}>
            {copiedId === "url" ? "Copied" : "Copy"}
          </button>
        </div>

        <div className={styles.tabs} role="tablist">
          {clients.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={c.id === activeTab}
              className={`${styles.tab} ${c.id === activeTab ? styles.tabActive : ""} ${
                c.highlighted ? styles.tabFeatured : ""
              }`}
              onClick={() => setActiveTab(c.id)}
              type="button"
            >
              {c.label}
              {c.highlighted ? <span className={styles.tabBadge}>Featured</span> : null}
            </button>
          ))}
        </div>

        <div className={styles.panel} role="tabpanel">
          {active.showFeatureCard ? (
            <div className={styles.featureCard}>
              <div className={styles.featureHeader}>
                <div>
                  <span className={styles.featureEyebrow}>{active.label}</span>
                  <h3 className={styles.featureTitle}>
                    {active.tagline || "One-click skill bundle"}
                  </h3>
                  {active.intro ? <p className={styles.featureIntro}>{active.intro}</p> : null}
                </div>
                {active.download ? (
                  <a
                    className={styles.downloadBtn}
                    href={active.download.href}
                    download={active.download.filename}
                  >
                    <span aria-hidden="true" className={styles.downloadIcon}>↓</span>
                    {active.download.label}
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
          {active.steps.map((step, i) => (
            <div key={i}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              {step.desc ? <p className={styles.stepDesc}>{step.desc}</p> : null}
              {step.code ? (
                <div className={styles.codeBlockWrap}>
                  <pre className={styles.codeBlock}>{step.code}</pre>
                  <button
                    type="button"
                    className={`${styles.copyBtn} ${styles.subtle}`}
                    onClick={() => copy(step.code, `${active.id}-${i}`)}
                  >
                    {copiedId === `${active.id}-${i}` ? "Copied" : "Copy"}
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
