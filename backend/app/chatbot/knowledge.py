"""
Structured Portfolio Knowledge Base for Sahib Narula.
Sourced exclusively from verified portfolio content.
Do not fabricate details.
"""

PORTFOLIO_DATA = {
    "owner": {
        "name": "Sahib Narula",
        "role": "Systems Engineer, AI Builder, and Software Craftsman",
        "tagline": "BUILDING WITH INTENT",
        "bio": (
            "Sahib Narula is a systems engineer, AI builder, and software craftsman. "
            "He specializes in low-latency web applications, modular AI microservices, and "
            "reactive data pipelines that prioritize speed, security, and developer ergonomics."
        ),
        "philosophy": (
            "Code should be self-documenting. Interfaces should load instantly. Backend systems "
            "should scale automatically. Security boundaries, clean telemetry, and comprehensive test pipelines "
            "are treated as core deliverables — not afterthoughts."
        ),
        "email": "hello@sahibnarula.com",
        "resume_url": "/resume.pdf",
        "social": {
            "email": "hello@sahibnarula.com",
            "linkedin": "Available in portfolio Contact section",
            "github": "Available in portfolio Contact section",
            "instagram": "Available in portfolio Contact section",
        },
    },
    "assistant": {
        "name": "Blub",
        "role": "Sahib Narula's Personal Portfolio AI Assistant",
        "purpose": (
            "To answer questions from visitors about Sahib Narula, his projects, technical skills, "
            "education, experience, and help them get in touch."
        ),
    },
    "currently_building": [
        "Aptlyst AI — Real-time audio pipeline refinement",
        "ReviveOps AI — Kubernetes log parsers on staging",
    ],
    "projects": [
        {
            "number": "01",
            "name": "APTLYST AI",
            "tagline": "AI Meeting Copilot Platform",
            "status": "IN PRODUCTION",
            "version": "v1.0.0",
            "description": (
                "Transforms raw spoken discussions into structured, action-oriented engineering specifications — "
                "removing manual summarization delays and alignment friction across engineering teams."
            ),
            "architecture": [
                "Real-time audio processing pipeline via WebRTC protocols",
                "Structured spec extraction engine powered by OpenAI JSON schemas",
                "Autonomous task generation workers mapping directly to Jira APIs",
            ],
            "technologies": ["React", "TypeScript", "Node.js", "LLMs", "WebRTC"],
            "links": {"github": None, "live": None},
        },
        {
            "number": "02",
            "name": "REVIVEOPS AI",
            "tagline": "Agentic Workflow Optimizer",
            "status": "BETA TESTING",
            "version": "v0.8.0-beta",
            "description": (
                "Actively scans server infrastructure logs, anticipates hardware limits, and resolves bottlenecks "
                "before they impact users — safeguarding uptime at the system level."
            ),
            "architecture": [
                "Structured log parsing adapters for Kubernetes system event files",
                "Multi-threaded Go daemon agents reporting local CPU/Memory cycles",
                "Prometheus metric collectors triggering Slack alerts on load anomalies",
            ],
            "technologies": ["Python", "Go", "Kubernetes", "Prometheus"],
            "links": {"github": None, "live": None},
        },
    ],
    "tech_stack": [
        {"name": "React", "category": "Frontend"},
        {"name": "TypeScript", "category": "Language"},
        {"name": "JavaScript", "category": "Language"},
        {"name": "Node.js", "category": "Backend"},
        {"name": "Express", "category": "Backend"},
        {"name": "Python", "category": "Language"},
        {"name": "Go", "category": "Language"},
        {"name": "WebRTC", "category": "Protocol"},
        {"name": "LangChain", "category": "AI"},
        {"name": "LLMs", "category": "AI"},
        {"name": "Kubernetes", "category": "Infrastructure"},
        {"name": "Prometheus", "category": "Monitoring"},
        {"name": "Docker", "category": "Infrastructure"},
        {"name": "Git", "category": "Tooling"},
        {"name": "PostgreSQL", "category": "Database"},
        {"name": "MongoDB", "category": "Database"},
    ],
    "education": {
        "degree": "Bachelor of Computer Applications (BCA)",
        "institution": "S.S. Jain Subodh P.G. College",
        "graduation_year": "2027",
    },
    "experience": [
        {
            "organization": "IBM SkillsBuild",
            "program": "AI Automation & Intelligent Solutions",
            "role": "Intern",
            "period": "To be confirmed",
            "responsibilities": [],
        },
        {
            "organization": "Bleep",
            "role": "Intern",
            "period": "To be confirmed",
            "responsibilities": [],
        },
    ],
}


def get_formatted_knowledge_context() -> str:
    owner = PORTFOLIO_DATA["owner"]
    assistant = PORTFOLIO_DATA["assistant"]
    currently = PORTFOLIO_DATA["currently_building"]
    projects = PORTFOLIO_DATA["projects"]
    tech_stack = PORTFOLIO_DATA["tech_stack"]
    education = PORTFOLIO_DATA["education"]
    experience = PORTFOLIO_DATA["experience"]

    projects_lines = []
    for p in projects:
        arch = "; ".join(p["architecture"])
        techs = ", ".join(p["technologies"])
        projects_lines.append(
            f"- **{p['name']}** ({p['tagline']}) [Status: {p['status']}, Version: {p['version']}]\n"
            f"  - Description: {p['description']}\n"
            f"  - Architecture: {arch}\n"
            f"  - Technologies: {techs}\n"
        )
    projects_text = "\n".join(projects_lines)

    tech_text = ", ".join([f"{t['name']} ({t['category']})" for t in tech_stack])

    exp_lines = []
    for e in experience:
        prog = f" ({e['program']})" if e.get("program") else ""
        role = e.get("role") or "N/A"
        exp_lines.append(f"- **{e['organization']}**{prog} - Role: {role}")
    exp_text = "\n".join(exp_lines)

    currently_text = "\n".join([f"- {item}" for item in currently])

    return f"""
=== VERIFIED PORTFOLIO KNOWLEDGE BASE ===

[PROFILE & BIO]
- Name: {owner['name']}
- Role: {owner['role']}
- Tagline: {owner['tagline']}
- Bio: {owner['bio']}
- Philosophy: {owner['philosophy']}
- Email: {owner['email']}
- Resume: Downloadable via {owner['resume_url']}

[AI ASSISTANT IDENTITY]
- Assistant Name: {assistant['name']}
- Identity: {assistant['role']}
- Purpose: {assistant['purpose']}

[CURRENTLY BUILDING]
{currently_text}

[FEATURED PROJECTS]
{projects_text}

[TECHNICAL SKILLS]
{tech_text}

[EDUCATION]
- Degree: {education['degree']}
- Institution: {education['institution']}
- Expected Graduation: {education['graduation_year']}

[EXPERIENCE & INTERNSHIPS]
{exp_text}

[CONTACT & REACH OUT]
- Direct Email: {owner['email']}
- Contact Form: Available directly on the portfolio website in the Contact section
- Social Links: Email, LinkedIn, GitHub, Instagram (accessible in the portfolio Contact section)
"""
