import { Menu } from "lucide-react";
import React from "react";
import Checklist from "./Checklist";
import CodeBlock from "./CodeBlock";
import "./playbook.css";
import PlaybookHero from "./PlaybookHero";
import PlaybookSidebar from "./PlaybookSidebar";

const MASTER_RULES = `# PROJECT INSTRUCTIONS FOR THE AI

## 01 // HOW TO RUN THE PROJECT
- Install code commands: \`npm ci\` or \`pip install -r requirements.txt\`
- How to test the code: \`npm test\` or \`python -m pytest\`
- How to check formatting: \`npm run lint\`

## 02 // DIRECTORY & ARCHITECTURE RULES
- Before writing any code, list out clearly: \`Files to Read\`, \`Files to Edit\`, and \`New Files\`.
- Put core logic functions inside \`src/domain/*\`. Put UI components inside \`src/app/*\`.
- For every single code file you edit inside \`src/*\`, update or add a matching test file inside \`tests/*\`.
- Never create a brand new helper file without checking \`src/shared/*\` first to see if an identical helper already exists.

## 03 // WRITING STYLES & IDIOMS
- Absolutely never use raw \`console.log()\` statements in production code. Import and use \`@/lib/logger\`.
- Never install a new library or open package.json yourself. If you think a new package is required, stop and ask me first.
- Look at the nearest file in the folder you are editing, and match its exact export patterns and brackets.

## 04 // ABSOLUTE LIMITS
- CRITICAL: Never leave lazy comments like \`// TODO\`, \`// FIXME\`, or \`// implement later\` inside code blocks.
- Never write placeholder functions that just throw a generic "Not implemented" error.
- If you don't have enough code context to fully finish a feature, do not edit the files. Stop and tell me exactly what information is missing under a clear \`### Suggestions\` title.`;

const PROMPT_B1 = `### CIRCUIT BREAKER // RESET ASSUMPTIONS

Stop and ignore all your previous chat explanations.
Assume that every piece of reasoning we've done so far is completely untrusted.

1. Look ONLY at the current evidence: the raw error trace and the active files on disk.
2. Tell me, in plain English, what the test expects vs. what the code is actually doing right now.
3. Define the absolute smallest, single line change required to fix this specific discrepancy.
4. Apply ONLY that change. Do not rewrite surrounding files or add unrequested features.

Show me a 2-line summary of the bug, followed directly by the exact file code edit.`;

const PROMPT_B2 = `### CIRCUIT BREAKER // SNAP OUT OF IT

Our chat history is way too crowded and you are losing track of the goal. Wipe your working memory.

1. Rebuild your view of this project using ONLY the very last code block and the active error message.
2. Output a 3-line snapshot containing exactly:
   - What the active goal is:
   - What core constraint we agreed on:
   - What file we are editing:
3. Propose exactly ONE single minimal code edit to move us one step closer to the goal.
4. Provide the code for that single edit only. Stop writing high-level summaries or placeholder lists.`;

const PROMPT_B3 = `### CIRCUIT BREAKER // STEP-BY-STEP EXECUTION

Stop all large planning systems, roadmaps, and global architectural refactors.
From now on, you operate strictly as a single-goal micro-execution engine.

1. Tell me what the single next coding goal is in exactly one sentence.
2. Give me a maximum of 3 explicit paths for the very next line edit, such as Edit File A line 12, or File B line 40.
3. Do not write any code blocks yet. Wait for me to select which option to use.

You are completely locked from modifying files until I approve the step.`;

const NODE_TEST = `import { exec } from "node:child_process";

const cmd = process.argv[2] ?? "npm test";

exec(cmd, { cwd: process.cwd(), maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
  const exitCode = err && typeof (err as any).code === "number" ? (err as any).code : 0;
  const result = { exitCode, stdout, stderr };

  process.stdout.write(JSON.stringify(result, null, 2));
  process.exit(0);
});`;

const PY_TEST = `import subprocess
import json
import sys

cmd = sys.argv[1] if len(sys.argv) > 1 else "python -m pytest"

proc = subprocess.Popen(
    cmd,
    shell=True,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True,
)
out, err = proc.communicate()

result = {
    "exit_code": proc.returncode,
    "stdout": out,
    "stderr": err,
}

print(json.dumps(result, indent=2))`;

export default function PlaybookPage(): React.ReactElement {
  const [activeId, setActiveId] = React.useState<string>("overview");
  const [mobileNavOpen, setMobileNavOpen] = React.useState<boolean>(false);
  const [toast, setToast] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(t);
  }, [toast]);

  const showToast = (message: string): void => setToast(message);

  const handleCopyTemplate = async (): Promise<void> => {
    try {
      await navigator.clipboard?.writeText(MASTER_RULES);
      showToast("AGENTS.md template copied.");
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = MASTER_RULES;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      showToast("AGENTS.md template copied.");
    }
  };

  React.useEffect(() => {
    const title = "AI Agent Playbook — Cheat Sheet for Developers | Austin Carson";
    document.title = title;

    const desc =
      "AI Agent Playbook — plain English cheat sheet for developers: agent rules, avoiding context bloat, and safe code review.";
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = desc;

    let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content =
      "AI agent playbook, AI agents, cheat sheet, developer guide, AI code review";

    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    try {
      linkCanonical.href = `${window.location.origin}/playbook`;
    } catch {
      // ignore
    }
  }, []);

  const scrollToStuck = (): void => {
    document.getElementById("stuck-loops")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  React.useEffect(() => {
    const navLinks = Array.from(document.querySelectorAll(".playbook-main [id]")) as HTMLElement[];
    const observed = navLinks.map((el) => ({ id: el.id, el })).filter(Boolean);

    if (observed.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        setActiveId(visible.target.id);
      },
      { root: null, rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    observed.forEach((o) => observer.observe(o.el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="playbook-layout">
      <PlaybookSidebar
        activeId={activeId}
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {mobileNavOpen && <div className={`playbook-backdrop open`} onClick={() => setMobileNavOpen(false)} aria-hidden="true" />}

      <main className="playbook-main" aria-labelledby="overview">
        <div className="playbook-mobile-top">
          <button
            type="button"
            className="playbook-mobile-toggle"
            aria-controls="playbook-sidebar"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu size={16} />
            <span className="sr-only">Open navigation</span>
          </button>
        </div>

        <PlaybookHero onCopyTemplate={handleCopyTemplate} onScrollToStuck={scrollToStuck} />

        <section id="mcp-vs-cli" className="playbook-section">
          <h2>
            <span>01 //</span> Why Your AI Gets Slow and Confused
          </h2>
          <p>
            AI models have a limited memory. When you use advanced connector plugins, like massive
            MCP server catalogs, you are accidentally forcing the AI to read through thousands of
            lines of background rules and data shapes before it can even read your query.
          </p>

          <p>
            For example, loading a single comprehensive GitHub connector plugin can eat up{" "}
            <strong>55,000 tokens of memory</strong> just explaining to the AI how to talk to
            GitHub. If you add 4 or 5 plugins, the AI's working memory is completely filled with
            instructions instead of your actual code layout.
          </p>

          <p>
            <strong>The Fix: Use Native Commands.</strong> Instead of forcing the AI to use complex
            internal plugins to look at files or search code, tell it to run a simple terminal
            script. Running a background terminal pipeline like <code>grep</code> or{" "}
            <code>awk</code> takes only 12 tokens of memory and does the heavy lifting instantly on
            your computer, keeping the AI's brain empty and hyper-focused on coding.
          </p>

          <table>
            <thead>
              <tr>
                <th>What matters</th>
                <th>The Bad Way, Monolithic Plugins</th>
                <th>The Good Way, Quick Local Commands</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Memory Spent Upfront</strong>
                </td>
                <td>
                  <strong>20k to 100k+ tokens wasted</strong> instantly just loading rules,
                  parameter descriptions, and examples.
                </td>
                <td>
                  <strong>10 to 50 tokens max.</strong> The AI just writes a single-line command.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>How Data Moves</strong>
                </td>
                <td>
                  Massive raw text arrays are dumped straight into the chat history, making the
                  conversation sluggish.
                </td>
                <td>
                  Data stays on your machine's disk. Only a quick 5-line summary or snippet is
                  pasted back into the chat.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Long Chats</strong>
                </td>
                <td>
                  The AI begins to completely forget early design choices, skip essential rules, or
                  time out.
                </td>
                <td>
                  Stays perfectly stable. The AI reasons over small, lean code blocks instead of
                  massive logs.
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section id="bloat-vs-poison" className="playbook-section">
          <h2>
            <span>01.2 //</span> The Two Ways the AI Fails
          </h2>
          <p>
            When an AI stops delivering working code in a deep chat session, it is usually because
            of one of these two simple problems:
          </p>

          <div className="playbook-grid">
            <article className="playbook-card">
              <span className="tag-badge tag-yellow">Problem 1</span>
              <h4>Memory Overload, Context Bloat</h4>
              <p>
                <strong>What it means:</strong> The conversation history has gotten too long because
                you've pasted big files, massive terminal error logs, or endless strings of
                messages.
              </p>
              <p>
                <strong>The Symptom:</strong> The AI acts tired. It stops looking at the small
                details, ignores instructions you gave it 5 minutes ago, and drops massive code
                files down to lazy high-level summaries.
              </p>
            </article>

            <article className="playbook-card">
              <span className="tag-badge tag-red">Problem 2</span>
              <h4>Bad Assumptions, Context Poisoning</h4>
              <p>
                <strong>What it means:</strong> The AI made a small code mistake or generated a
                broken variable name early in the chat, and neither of you corrected it.
              </p>
              <p>
                <strong>The Symptom:</strong> The AI is highly confident but completely wrong.
                Because it reads the conversation history as factual truth, it keeps building new
                functions on top of that early broken mistake.
              </p>
            </article>
          </div>
        </section>

        <section id="writing-rules" className="playbook-section">
          <h2>
            <span>02 //</span> How to Write Project Rules the AI Will Follow
          </h2>
          <p>
            Do not write long essays or personal engineering philosophies in your system prompts.
            Modern AIs ignore them. Instead, write short, enforceable instructions that point
            directly to actual project directories or specific terminal commands.
          </p>

          <h3 id="agents-skeleton">The Master AGENTS.md Template</h3>
          <p>
            Create a file named <code>AGENTS.md</code> in the absolute root folder of your project,
            and paste this exact clean format into it:
          </p>

          <div className="playbook-cutout">
            <div className="cutout-header">
              <span>AGENTS.md</span>
              <button
                type="button"
                className="pb-btn"
                onClick={async () => {
                  await navigator.clipboard?.writeText(MASTER_RULES);
                  showToast("Copied file content.");
                }}
              >
                Copy File Content
              </button>
            </div>
            <pre>
              <code>{MASTER_RULES}</code>
            </pre>
          </div>
        </section>

        <section id="stuck-loops" className="playbook-section">
          <h2>
            <span>03 //</span> 3 Prompts to Un-Stick an AI Agent
          </h2>
          <p>
            When the AI starts looping, arguing, or ignoring your instructions, do not throw away
            the chat thread or rewrite everything from scratch. Use one of these exact
            copy-pasteable prompts to force the AI out of its stuck state.
          </p>

          <h4>Fix 1 // Use this when the AI keeps repeating a broken error</h4>
          <CodeBlock label="Copy-paste this text block" text={PROMPT_B1} onCopy={showToast} />

          <h4>Fix 2 // Use this when the AI gets lazy or vague in a long chat</h4>
          <CodeBlock label="Copy-paste this text block" text={PROMPT_B2} onCopy={showToast} />

          <h4>Fix 3 // Use this when the AI over-steps and refactors unrelated files</h4>
          <CodeBlock label="Copy-paste this text block" text={PROMPT_B3} onCopy={showToast} />
        </section>

        <section id="test-sandboxes" className="playbook-section">
          <h2>
            <span>04 //</span> How to Safely Check the AI's Code
          </h2>
          <p>
            Never treat the AI like an oracle. Treat it like a fast junior developer. Box it in with
            automated scripts that force it to verify its own work against your local machine
            terminal before you review the code yourself.
          </p>

          <div className="playbook-cutout">
            <div className="cutout-header">
              <span>tools/run-tests.ts, For Node/JS Projects</span>
              <button
                type="button"
                className="pb-btn"
                onClick={async () => {
                  await navigator.clipboard?.writeText(NODE_TEST);
                  showToast("Copied script.");
                }}
              >
                Copy Script
              </button>
            </div>
            <pre>
              <code>{NODE_TEST}</code>
            </pre>
          </div>

          <div className="playbook-cutout">
            <div className="cutout-header">
              <span>tools/run_tests.py, For Python Projects</span>
              <button
                type="button"
                className="pb-btn"
                onClick={async () => {
                  await navigator.clipboard?.writeText(PY_TEST);
                  showToast("Copied script.");
                }}
              >
                Copy Script
              </button>
            </div>
            <pre>
              <code>{PY_TEST}</code>
            </pre>
          </div>
        </section>

        <section id="adversarial-checklist" className="playbook-section">
          <h2>
            <span>04.2 //</span> The Pre-Merge Code Checklist
          </h2>
          <p>
            Run through this quick interactive check list before you merge any code written by an AI
            agent into your project. Treat the AI's pull request with active skepticism.
          </p>

          <Checklist onToast={showToast} />
        </section>

        {toast && (
          <div className={`playbook-toast visible`} role="status" aria-live="polite">
            {toast}
          </div>
        )}
      </main>
    </div>
  );
}
