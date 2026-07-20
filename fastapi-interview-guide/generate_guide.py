#!/usr/bin/env python3
"""Generate detailed FastAPI Interview Prep Guide PDF — from scratch + 30-day plan."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    Preformatted,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
)

OUTPUT = Path(__file__).parent / "FastAPI_Interview_Guide_5Plus_Years.pdf"
PAGE_W, PAGE_H = A4
MARGIN = 0.65 * inch

NAVY = colors.HexColor("#0f2744")
TEAL = colors.HexColor("#0d7377")
LIGHT_BG = colors.HexColor("#f0f7f8")
TASK_BG = colors.HexColor("#fff8e7")
TASK_BORDER = colors.HexColor("#d4a017")
CODE_BG = colors.HexColor("#1e293b")
MUTED = colors.HexColor("#475569")
SOFT_LINE = colors.HexColor("#cbd5e1")
DAY_BG = colors.HexColor("#e8f4f4")


def make_styles():
    base = getSampleStyleSheet()
    return {
        "cover_title": ParagraphStyle(
            "cover_title", parent=base["Title"], fontName="Helvetica-Bold",
            fontSize=26, textColor=NAVY, alignment=TA_CENTER, spaceAfter=10, leading=32,
        ),
        "cover_sub": ParagraphStyle(
            "cover_sub", parent=base["Normal"], fontName="Helvetica",
            fontSize=13, textColor=TEAL, alignment=TA_CENTER, spaceAfter=6, leading=17,
        ),
        "cover_meta": ParagraphStyle(
            "cover_meta", parent=base["Normal"], fontName="Helvetica",
            fontSize=10, textColor=MUTED, alignment=TA_CENTER, spaceAfter=5, leading=13,
        ),
        "h1": ParagraphStyle(
            "h1", parent=base["Heading1"], fontName="Helvetica-Bold",
            fontSize=16, textColor=NAVY, spaceBefore=14, spaceAfter=8, leading=20,
        ),
        "h2": ParagraphStyle(
            "h2", parent=base["Heading2"], fontName="Helvetica-Bold",
            fontSize=12, textColor=TEAL, spaceBefore=11, spaceAfter=5, leading=15,
        ),
        "h3": ParagraphStyle(
            "h3", parent=base["Heading3"], fontName="Helvetica-Bold",
            fontSize=10.5, textColor=NAVY, spaceBefore=8, spaceAfter=3, leading=13,
        ),
        "body": ParagraphStyle(
            "body", parent=base["Normal"], fontName="Helvetica",
            fontSize=9, textColor=colors.HexColor("#1e293b"),
            alignment=TA_JUSTIFY, spaceAfter=5, leading=12,
        ),
        "bullet": ParagraphStyle(
            "bullet", parent=base["Normal"], fontName="Helvetica",
            fontSize=9, textColor=colors.HexColor("#1e293b"),
            leftIndent=10, spaceAfter=2.5, leading=11.5,
        ),
        "code": ParagraphStyle(
            "code", fontName="Courier", fontSize=7, textColor=colors.HexColor("#e2e8f0"),
            backColor=CODE_BG, leading=9.2, leftIndent=3, rightIndent=3,
            spaceBefore=3, spaceAfter=6,
        ),
        "callout": ParagraphStyle(
            "callout", parent=base["Normal"], fontName="Helvetica-Oblique",
            fontSize=8.5, textColor=NAVY, backColor=LIGHT_BG,
            borderPadding=5, spaceBefore=4, spaceAfter=6, leading=11,
        ),
        "toc": ParagraphStyle(
            "toc", parent=base["Normal"], fontName="Helvetica",
            fontSize=9.5, textColor=NAVY, spaceAfter=3.5, leading=12, leftIndent=6,
        ),
        "q": ParagraphStyle(
            "q", parent=base["Normal"], fontName="Helvetica-Bold",
            fontSize=9, textColor=NAVY, spaceBefore=6, spaceAfter=2, leading=11.5,
        ),
        "a": ParagraphStyle(
            "a", parent=base["Normal"], fontName="Helvetica",
            fontSize=8.5, textColor=colors.HexColor("#334155"),
            spaceAfter=3, leading=11, leftIndent=4,
        ),
        "task_title": ParagraphStyle(
            "task_title", parent=base["Normal"], fontName="Helvetica-Bold",
            fontSize=9.5, textColor=colors.HexColor("#7a5a00"), spaceAfter=3, leading=12,
        ),
        "task_body": ParagraphStyle(
            "task_body", parent=base["Normal"], fontName="Helvetica",
            fontSize=8.5, textColor=colors.HexColor("#3d2e00"),
            leftIndent=6, spaceAfter=2, leading=11,
        ),
        "day_title": ParagraphStyle(
            "day_title", parent=base["Normal"], fontName="Helvetica-Bold",
            fontSize=9.5, textColor=NAVY, spaceAfter=2, leading=12,
        ),
        "day_body": ParagraphStyle(
            "day_body", parent=base["Normal"], fontName="Helvetica",
            fontSize=8.5, textColor=colors.HexColor("#1e293b"),
            leftIndent=4, spaceAfter=2, leading=11,
        ),
        "banner": ParagraphStyle(
            "banner", parent=base["Normal"], fontName="Helvetica-Bold",
            fontSize=11, textColor=colors.white, leading=14,
        ),
        "small": ParagraphStyle(
            "small", parent=base["Normal"], fontName="Helvetica",
            fontSize=8, textColor=MUTED, spaceAfter=3, leading=10,
        ),
    }


def hr():
    return HRFlowable(width="100%", thickness=0.7, color=SOFT_LINE, spaceBefore=3, spaceAfter=6)


def bullets(items, styles):
    return [Paragraph(f"• {item}", styles["bullet"]) for item in items]


def code_block(text, styles):
    return Preformatted(text.rstrip("\n"), styles["code"], maxLineLength=100)


def section_bar(title, styles, color=TEAL):
    data = [[Paragraph(f"<font color='white'><b>{title}</b></font>", styles["banner"])]]
    t = Table(data, colWidths=[PAGE_W - 2 * MARGIN])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), color),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return t


def task_box(title, items, styles, done_when=None):
    """Practice tasks after each learning module."""
    rows = [[Paragraph(f"PRACTICE TASKS — {title}", styles["task_title"])]]
    for it in items:
        rows.append([Paragraph(f"☐  {it}", styles["task_body"])])
    if done_when:
        rows.append([Paragraph(f"<b>Done when:</b> {done_when}", styles["task_body"])])
    t = Table(rows, colWidths=[PAGE_W - 2 * MARGIN - 8])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), TASK_BG),
        ("BOX", (0, 0), (-1, -1), 1, TASK_BORDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    return [Spacer(1, 6), t, Spacer(1, 4)]


def day_box(day_label, focus, learn, tasks, styles):
    rows = [
        [Paragraph(f"<b>{day_label}</b> — {focus}", styles["day_title"])],
        [Paragraph(f"<b>Learn:</b> {learn}", styles["day_body"])],
        [Paragraph(f"<b>Do:</b> {tasks}", styles["day_body"])],
    ]
    t = Table(rows, colWidths=[PAGE_W - 2 * MARGIN - 6])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), DAY_BG),
        ("BOX", (0, 0), (-1, -1), 0.5, TEAL),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return [t, Spacer(1, 4)]


def add_page_number(canvas, doc):
    canvas.saveState()
    page = canvas.getPageNumber()
    if page > 1:
        canvas.setStrokeColor(SOFT_LINE)
        canvas.setLineWidth(0.5)
        y = 0.4 * inch
        canvas.line(MARGIN, y + 10, PAGE_W - MARGIN, y + 10)
        canvas.setFont("Helvetica", 7.5)
        canvas.setFillColor(MUTED)
        canvas.drawString(MARGIN, y, "FastAPI Interview Guide — From Scratch to Senior (30-Day)")
        canvas.drawRightString(PAGE_W - MARGIN, y, f"{page}")
    canvas.restoreState()


def build():
    styles = make_styles()
    story = []

    # ===================== COVER =====================
    story.append(Spacer(1, 1.0 * inch))
    story.append(Paragraph("FastAPI Interview Preparation Guide", styles["cover_title"]))
    story.append(hr())
    story.append(Paragraph("From Scratch → Senior (5+ Years Signal)", styles["cover_sub"]))
    story.append(Paragraph(
        "Step-by-step learning • Practice tasks after every module<br/>"
        "Day-by-day 30-day plan • Portfolio projects • Mock questions",
        styles["cover_meta"],
    ))
    story.append(Spacer(1, 20))
    meta = Table([
        [Paragraph("<b>Who this is for</b>", styles["body"]),
         Paragraph("Engineers targeting FastAPI / Python backend roles at mid-senior+ level who want a structured rebuild from fundamentals", styles["body"])],
        [Paragraph("<b>Daily time</b>", styles["body"]),
         Paragraph("2–3 hours/day for 30 days (or stretch weekends). Consistency &gt; marathon sessions.", styles["body"])],
        [Paragraph("<b>Outcomes</b>", styles["body"]),
         Paragraph("Solid mental model, shipped practice APIs, one flagship portfolio project, interview-ready explanations", styles["body"])],
        [Paragraph("<b>Stack</b>", styles["body"]),
         Paragraph("Python 3.11+, FastAPI, Pydantic v2, SQLAlchemy 2 async, Postgres, Redis, Docker, pytest", styles["body"])],
    ], colWidths=[1.3 * inch, 5.2 * inch])
    meta.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_BG),
        ("BOX", (0, 0), (-1, -1), 0.6, TEAL),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, SOFT_LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(meta)
    story.append(Spacer(1, 24))
    story.append(Paragraph(
        "How to use this book: Read a module → do every checkbox task → only then move on. "
        "The 30-day plan maps modules to calendar days. Portfolio projects start in Week 3.",
        styles["callout"],
    ))
    story.append(PageBreak())

    # ===================== TOC =====================
    story.append(Paragraph("Table of Contents", styles["h1"]))
    story.append(hr())
    for t in [
        "Part A — Foundations (start from scratch)",
        "   A0. Setup &amp; mental model of APIs",
        "   A1. Python essentials for FastAPI",
        "   A2. HTTP, REST, and JSON APIs",
        "   A3. Your first FastAPI app",
        "Part B — Core FastAPI",
        "   B1. Path/query/body, status codes, routers",
        "   B2. Pydantic v2 schemas",
        "   B3. Dependency injection &amp; settings",
        "   B4. Error handling &amp; middleware",
        "Part C — Data &amp; Auth",
        "   C1. Postgres + SQLAlchemy 2 async",
        "   C2. Alembic migrations &amp; repositories",
        "   C3. AuthN/AuthZ (JWT, roles, tenancy)",
        "   C4. Redis, caching, rate limits",
        "Part D — Senior depth",
        "   D1. Async concurrency &amp; performance",
        "   D2. Testing &amp; CI",
        "   D3. Observability &amp; production",
        "   D4. Architecture &amp; system design",
        "Part E — 30-Day Plan (day-by-day)",
        "Part F — Portfolio projects",
        "Part G — Question bank &amp; cheat sheets",
    ]:
        story.append(Paragraph(t, styles["toc"]))
    story.append(PageBreak())

    # ===================== A0 =====================
    story.append(section_bar("PART A — FOUNDATIONS (START FROM SCRATCH)", styles, NAVY))
    story.append(Paragraph("A0. Setup &amp; Mental Model of APIs", styles["h1"]))
    story.append(hr())
    story.append(Paragraph(
        "Before FastAPI itself: you need a clean environment and a clear picture of what an API does. "
        "An API is a contract: clients send HTTP requests; your service validates input, applies business rules, "
        "reads/writes data, and returns a structured response (usually JSON) with a meaningful status code.",
        styles["body"],
    ))
    story.append(Paragraph("Install checklist", styles["h2"]))
    story.extend(bullets([
        "Python 3.11+ (verify: <font face='Courier'>python --version</font>)",
        "Git + VS Code/Cursor + Docker Desktop",
        "Create a practice folder: <font face='Courier'>fastapi-30day/</font> with a venv",
        "Install baseline: <font face='Courier'>pip install fastapi uvicorn[standard] httpx pydantic pydantic-settings</font>",
    ], styles))
    story.append(Paragraph("Key vocabulary (memorize)", styles["h2"]))
    story.extend(bullets([
        "<b>Client / Server:</b> browser, mobile app, or another service talking to your API",
        "<b>Endpoint / route:</b> URL path + HTTP method (GET /users/1)",
        "<b>Request / Response:</b> headers + body in; status + headers + body out",
        "<b>Stateless:</b> each request carries what the server needs (often a token)",
        "<b>OpenAPI:</b> machine-readable description of your API (FastAPI generates it)",
    ], styles))
    story.extend(task_box("A0 Setup", [
        "Create repo fastapi-30day, venv, .gitignore (venv, .env, __pycache__)",
        "Install packages listed above; run <font face='Courier'>uvicorn --help</font> successfully",
        "Write NOTES.md with your own 5-sentence explanation of request → response",
        "Bookmark FastAPI docs + Pydantic v2 docs; skim the tutorial TOC only (don't deep-dive yet)",
    ], styles, "Repo exists, venv works, NOTES.md has your mental model."))

    # ===================== A1 =====================
    story.append(Paragraph("A1. Python Essentials for FastAPI", styles["h1"]))
    story.append(hr())
    story.append(Paragraph(
        "You do not need to relearn all of Python—but FastAPI code leans hard on typing, async, "
        "context managers, and clean functions. Close these gaps before writing production-looking routes.",
        styles["body"],
    ))
    story.append(Paragraph("Must be comfortable with", styles["h2"]))
    story.extend(bullets([
        "Type hints: <font face='Courier'>str | None</font>, <font face='Courier'>list[User]</font>, <font face='Courier'>dict[str, Any]</font>",
        "Functions returning typed values; dataclasses / simple classes",
        "<font face='Courier'>async def</font> / <font face='Courier'>await</font> basics (I/O wait points)",
        "Context managers (<font face='Courier'>with</font> / <font face='Courier'>async with</font>)",
        "Exceptions: raise custom errors; <font face='Courier'>try/except/finally</font>",
        "Modules/packages: <font face='Courier'>__init__.py</font>, imports, avoiding circular imports",
        "Virtualenv + <font face='Courier'>requirements.txt</font> or <font face='Courier'>pyproject.toml</font>",
    ], styles))
    story.append(Paragraph("Mini async mental model", styles["h2"]))
    story.append(Paragraph(
        "Async is not 'faster CPU'. It lets one process handle many waiting I/O operations "
        "(DB, HTTP, Redis) without blocking. If you run heavy CPU or sync I/O inside async code "
        "without care, you freeze everyone sharing that event loop.",
        styles["body"],
    ))
    story.append(code_block(
        """# sync vs async intuition
import asyncio, time

async def fetch_fake(i: int) -> str:
    await asyncio.sleep(0.2)          # non-blocking wait
    return f"ok-{i}"

async def main():
    # runs roughly concurrently → ~0.2s total, not 1.0s
    results = await asyncio.gather(*(fetch_fake(i) for i in range(5)))
    print(results)

asyncio.run(main())""", styles))
    story.extend(task_box("A1 Python", [
        "Write scripts/typing_drill.py with 5 typed functions (parse email, clamp int, merge dicts, filter list, safe divide)",
        "Write scripts/async_drill.py using asyncio.gather for 5 fake 'API calls' with sleep",
        "Explain in NOTES.md (in your words) when async helps and when it does not",
        "Enable a type checker (pyright/mypy) on the drills; fix all errors",
    ], styles, "Both drills run; NOTES.md has async explanation; type checker clean."))

    # ===================== A2 =====================
    story.append(Paragraph("A2. HTTP, REST, and JSON APIs", styles["h1"]))
    story.append(hr())
    story.append(Paragraph(
        "Interviewers assume HTTP fluency. Be precise about methods, status codes, headers, and REST resource modeling.",
        styles["body"],
    ))
    story.append(Paragraph("HTTP methods (practical meaning)", styles["h2"]))
    story.extend(bullets([
        "<b>GET</b> — read; safe &amp; idempotent; no body side effects",
        "<b>POST</b> — create or trigger action; not idempotent unless you add Idempotency-Key",
        "<b>PUT</b> — replace resource; idempotent",
        "<b>PATCH</b> — partial update; ideally idempotent for same payload",
        "<b>DELETE</b> — remove; idempotent (deleting again → 404 or 204)",
    ], styles))
    story.append(Paragraph("Status codes you must use correctly", styles["h2"]))
    story.extend(bullets([
        "200 OK, 201 Created, 202 Accepted, 204 No Content",
        "400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found",
        "409 Conflict, 422 Unprocessable Entity (validation), 429 Too Many Requests",
        "500 Internal Server Error, 503 Service Unavailable",
    ], styles))
    story.append(Paragraph("REST modeling tips", styles["h2"]))
    story.extend(bullets([
        "Nouns for resources: <font face='Courier'>/users</font>, <font face='Courier'>/orders/{id}/items</font>",
        "Avoid verbs in paths: prefer <font face='Courier'>POST /orders/{id}/cancel</font> only for non-CRUD actions",
        "Stable error body: <font face='Courier'>{code, message, details, request_id}</font>",
        "Pagination, filtering, sorting as query params with allowlists",
    ], styles))
    story.extend(task_box("A2 HTTP/REST", [
        "On paper (or NOTES.md), design REST resources for a 'Bookstore': books, authors, reviews, carts",
        "For each resource list methods + status codes for success and 3 failure cases",
        "Use curl or httpie against https://httpbin.org (GET/POST) and inspect headers",
        "Write a 10-line JSON error envelope standard you will reuse in later modules",
    ], styles, "Bookstore API sketch + error envelope committed to NOTES.md."))

    # ===================== A3 =====================
    story.append(Paragraph("A3. Your First FastAPI App", styles["h1"]))
    story.append(hr())
    story.append(Paragraph(
        "Build the smallest useful app and understand the generated OpenAPI docs. This is your 'hello, ownership' moment.",
        styles["body"],
    ))
    story.append(code_block(
        """# app/main.py
from fastapi import FastAPI

app = FastAPI(title="Day0 API", version="0.1.0")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/hello/{name}")
def hello(name: str, shout: bool = False) -> dict[str, str]:
    msg = f"Hello, {name}!"
    return {"message": msg.upper() if shout else msg}

# Run: uvicorn app.main:app --reload
# Docs: http://127.0.0.1:8000/docs""", styles))
    story.append(Paragraph("What to notice in /docs", styles["h2"]))
    story.extend(bullets([
        "Schemas inferred from type hints",
        "Try-it-out executes real requests",
        "OpenAPI JSON at /openapi.json — clients and tests can consume this",
    ], styles))
    story.extend(task_box("A3 First app", [
        "Create package app/ with main.py as above; run with --reload",
        "Add POST /echo that accepts JSON {text: str} and returns length + reversed text",
        "Screenshot or export openapi.json into docs/openapi-day0.json",
        "Break the handler on purpose; observe default 500; note what a client sees",
    ], styles, "Health + hello + echo work; you can explain /docs to someone else."))
    story.append(PageBreak())

    # ===================== B1 =====================
    story.append(section_bar("PART B — CORE FASTAPI", styles, NAVY))
    story.append(Paragraph("B1. Path / Query / Body, Status Codes, Routers", styles["h1"]))
    story.append(hr())
    story.append(Paragraph(
        "FastAPI binds request data via function parameters. Master Path, Query, Body, and APIRouter so apps stay modular.",
        styles["body"],
    ))
    story.append(code_block(
        """from fastapi import APIRouter, Path, Query, status
from pydantic import BaseModel, Field

router = APIRouter(prefix="/items", tags=["items"])

class ItemCreate(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    price: float = Field(gt=0)

@router.post("", status_code=status.HTTP_201_CREATED)
def create_item(payload: ItemCreate) -> ItemCreate:
    return payload

@router.get("/{item_id}")
def get_item(
    item_id: int = Path(ge=1),
    q: str | None = Query(default=None, max_length=50),
):
    return {"item_id": item_id, "q": q}

# main.py: app.include_router(router)""", styles))
    story.append(Paragraph("Senior habits early", styles["h2"]))
    story.extend(bullets([
        "One router per domain area (users, items, orders)",
        "Explicit status_code on creates/deletes",
        "Never put business logic deep in the route forever—extract functions soon",
        "Use tags/summary/description so OpenAPI stays useful",
    ], styles))
    story.extend(task_box("B1 Routing", [
        "Build in-memory Items API: create, list (search q), get, update PATCH, delete",
        "Use APIRouter; return proper 201/204/404",
        "Add query params: skip/limit with validation (0≤skip, 1≤limit≤100)",
        "Write curl commands in README for every endpoint",
    ], styles, "Full CRUD works from /docs and curl; 404 on missing ids."))

    # ===================== B2 =====================
    story.append(Paragraph("B2. Pydantic v2 Schemas", styles["h1"]))
    story.append(hr())
    story.append(Paragraph(
        "Pydantic is the validation backbone. At interview level you separate Create/Update/Read models and know v2 APIs.",
        styles["body"],
    ))
    story.extend(bullets([
        "<b>BaseModel</b> + <font face='Courier'>Field</font> constraints; <font face='Courier'>extra='forbid'</font> for strict inputs",
        "<b>field_validator / model_validator</b> for cross-field rules",
        "<b>ConfigDict(from_attributes=True)</b> when reading ORM objects",
        "<b>model_dump(exclude_unset=True)</b> for PATCH partial updates",
        "Never return secrets (password hashes) in response models",
    ], styles))
    story.append(code_block(
        """from pydantic import BaseModel, ConfigDict, Field, field_validator

class UserCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")
    email: str
    password: str = Field(min_length=8)
    display_name: str = Field(min_length=1, max_length=80)

    @field_validator("email")
    @classmethod
    def norm_email(cls, v: str) -> str:
        return v.strip().lower()

class UserUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")
    display_name: str | None = None
    email: str | None = None

class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    email: str
    display_name: str""", styles))
    story.extend(task_box("B2 Pydantic", [
        "Refactor Items API to ItemCreate / ItemUpdate / ItemRead",
        "Reject unknown fields (extra=forbid); add a price currency field with validation",
        "Unit-test validators with plain pytest (no FastAPI) for 5 invalid payloads",
        "Document in NOTES.md why response models prevent data leaks",
    ], styles, "Invalid payloads return 422; unit tests pass; README updated."))

    # ===================== B3 =====================
    story.append(Paragraph("B3. Dependency Injection &amp; Settings", styles["h1"]))
    story.append(hr())
    story.append(Paragraph(
        "Depends() is how FastAPI shares DB sessions, current user, settings, and feature flags. "
        "Seniors design dependency graphs intentionally.",
        styles["body"],
    ))
    story.append(code_block(
        """from functools import lru_cache
from typing import Annotated
from fastapi import Depends
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    app_name: str = "demo"
    api_keys: str = "dev-key"

@lru_cache
def get_settings() -> Settings:
    return Settings()

SettingsDep = Annotated[Settings, Depends(get_settings)]

def require_api_key(settings: SettingsDep, x_api_key: str | None = None):
    if x_api_key != settings.api_keys:
        from fastapi import HTTPException
        raise HTTPException(401, "Invalid API key")
    return True""", styles))
    story.append(Paragraph("Lifespan (startup/shutdown)", styles["h2"]))
    story.append(Paragraph(
        "Use lifespan context managers to open/close connection pools and HTTP clients. "
        "Avoid deprecated on_event startup/shutdown in new code.",
        styles["body"],
    ))
    story.extend(task_box("B3 DI &amp; settings", [
        "Add pydantic-settings Settings; load from .env (do not commit .env)",
        "Protect write endpoints with X-API-Key dependency",
        "Add lifespan that logs 'startup' / 'shutdown' (later replace with real pools)",
        "Override the API-key dependency in a test using app.dependency_overrides",
    ], styles, "Writes fail without key; test proves override works."))

    # ===================== B4 =====================
    story.append(Paragraph("B4. Error Handling &amp; Middleware", styles["h1"]))
    story.append(hr())
    story.extend(bullets([
        "Raise HTTPException for expected failures; use custom exception handlers for domain errors",
        "Middleware for request IDs, timing, CORS, trusted hosts",
        "Never leak stack traces to clients in production",
        "Map domain NotFoundError → 404, ConflictError → 409 in one place",
    ], styles))
    story.append(code_block(
        """from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import uuid, time

app = FastAPI()

@app.middleware("http")
async def add_request_id(request: Request, call_next):
    rid = request.headers.get("X-Request-ID", str(uuid.uuid4()))
    start = time.perf_counter()
    response = await call_next(request)
    response.headers["X-Request-ID"] = rid
    response.headers["X-Process-Time"] = f"{time.perf_counter()-start:.4f}"
    return response

class NotFoundError(Exception): ...

@app.exception_handler(NotFoundError)
async def not_found_handler(request: Request, exc: NotFoundError):
    return JSONResponse(status_code=404, content={"code": "not_found", "message": str(exc)})""", styles))
    story.extend(task_box("B4 Errors &amp; middleware", [
        "Add request-id middleware; return id on every response",
        "Create domain exceptions + handlers for not_found and conflict",
        "Standardize error JSON to your A2 envelope (include request_id)",
        "Add a test that asserts 404 body shape",
    ], styles, "All errors share one envelope; request id always present."))
    story.append(PageBreak())

    # ===================== C1 =====================
    story.append(section_bar("PART C — DATA &amp; AUTH", styles, NAVY))
    story.append(Paragraph("C1. Postgres + SQLAlchemy 2 Async", styles["h1"]))
    story.append(hr())
    story.append(Paragraph(
        "Replace in-memory dicts with a real database. Prefer SQLAlchemy 2.x async style with AsyncSession.",
        styles["body"],
    ))
    story.extend(bullets([
        "Docker Compose service for Postgres; DATABASE_URL in .env",
        "<font face='Courier'>create_async_engine</font> + <font face='Courier'>async_sessionmaker</font>",
        "Mapped models with type annotations; <font face='Courier'>select()</font> API",
        "One session per request via yield dependency; commit in service layer",
        "Beware: sync Session inside async routes blocks the event loop",
    ], styles))
    story.append(code_block(
        """# deps.py (sketch)
from collections.abc import AsyncIterator
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

engine = create_async_engine(settings.database_url, pool_pre_ping=True)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)

async def get_db() -> AsyncIterator[AsyncSession]:
    async with SessionLocal() as session:
        yield session""", styles))
    story.extend(task_box("C1 Database", [
        "docker compose up -d postgres; connect with DATABASE_URL (asyncpg)",
        "Create Item model + create/list/get/update/delete using AsyncSession",
        "Add unique constraint on name; handle integrity error as 409",
        "Verify N+1 isn't an issue yet; note lazy-load risk in NOTES.md",
    ], styles, "CRUD persists across restarts; 409 on duplicate name."))

    # ===================== C2 =====================
    story.append(Paragraph("C2. Alembic Migrations &amp; Repositories", styles["h1"]))
    story.append(hr())
    story.extend(bullets([
        "Alembic autogenerate for schema changes; review migrations before applying",
        "Expand/contract mindset for zero-downtime (add column nullable → backfill → constrain)",
        "Repository functions keep SQL out of routers",
        "Services orchestrate repositories + rules + transactions",
    ], styles))
    story.append(Paragraph("Suggested layout", styles["h2"]))
    story.append(code_block(
        """app/
  api/v1/endpoints/items.py
  schemas/item.py
  models/item.py
  repositories/items.py
  services/items.py
  db/session.py
alembic/""", styles))
    story.extend(task_box("C2 Migrations &amp; layers", [
        "Init Alembic; create migration for items; upgrade head",
        "Add a new column via migration (e.g. description); upgrade/downgrade works",
        "Split code into repository + service + endpoint (no SQL in routes)",
        "Write integration test against real Postgres (compose) for create+get",
    ], styles, "Migration chain clean; routes thin; integration test green."))

    # ===================== C3 =====================
    story.append(Paragraph("C3. AuthN / AuthZ (JWT, Roles, Tenancy)", styles["h1"]))
    story.append(hr())
    story.append(Paragraph(
        "Authentication = who you are. Authorization = what you may do. JWT carries claims; "
        "your code still must enforce permissions on every resource (prevent IDOR/BOLA).",
        styles["body"],
    ))
    story.extend(bullets([
        "Register/login; password hash with bcrypt/argon2 (never store plaintext)",
        "Access token short-lived; optional refresh rotation",
        "Depends chain: get_current_user → require_role('admin')",
        "Object-level checks: resource.owner_id == user.id (or tenant membership)",
        "CORS, secure cookies vs Bearer headers — know trade-offs for SPAs",
    ], styles))
    story.append(code_block(
        """# conceptual auth dependency
async def get_current_user(token: str = Depends(oauth2_scheme), db=Depends(get_db)):
    payload = decode_jwt(token)          # raises 401 on failure
    user = await users_repo.get(db, payload["sub"])
    if not user or not user.is_active:
        raise HTTPException(401, "Inactive")
    return user

def require_roles(*roles: str):
    async def _inner(user=Depends(get_current_user)):
        if user.role not in roles:
            raise HTTPException(403, "Forbidden")
        return user
    return _inner""", styles))
    story.extend(task_box("C3 Auth", [
        "Add User model; register + login endpoints; return JWT access token",
        "Protect item writes: only authenticated users; store owner_id",
        "Enforce owner-only update/delete (403/404 strategy — pick and document)",
        "Tests: user A cannot modify user B's item (IDOR test must pass)",
    ], styles, "IDOR test fails if you remove the owner check; document auth flow."))

    # ===================== C4 =====================
    story.append(Paragraph("C4. Redis, Caching, Rate Limits", styles["h1"]))
    story.append(hr())
    story.extend(bullets([
        "Cache-aside for hot reads; include tenant/user in keys when needed",
        "TTL + invalidation on writes; avoid caching unauthorized responses",
        "Rate limit login and public GETs (token bucket / fixed window in Redis)",
        "Idempotency-Key storage for unsafe POSTs",
    ], styles))
    story.extend(task_box("C4 Redis", [
        "Add Redis to docker compose; ping from lifespan",
        "Cache GET /items/{id} for 30s; invalidate on update/delete",
        "Rate-limit login to 5/min/IP; return 429 with Retry-After",
        "Measure before/after cache with a tiny script (10 sequential gets)",
    ], styles, "Cache hit path works; login limiter returns 429."))
    story.append(PageBreak())

    # ===================== D1 =====================
    story.append(section_bar("PART D — SENIOR DEPTH", styles, NAVY))
    story.append(Paragraph("D1. Async Concurrency &amp; Performance", styles["h1"]))
    story.append(hr())
    story.extend(bullets([
        "Reuse httpx.AsyncClient / engine pools via lifespan",
        "asyncio.gather / TaskGroup for independent I/O; Semaphore to limit fan-out",
        "Move CPU-bound work to process pool or separate worker",
        "Find N+1 queries; use selectinload/joinedload",
        "Profile before optimizing (py-spy, DB EXPLAIN, OpenTelemetry)",
    ], styles))
    story.extend(task_box("D1 Performance", [
        "Add an endpoint that fans out 5 outbound HTTP calls with httpx + gather",
        "Intentionally block with time.sleep in an async route; observe latency impact; fix it",
        "Add a notes section: top 5 FastAPI performance footguns",
        "Run a quick load check (hey/k6/locust) on GET list; record p95",
    ], styles, "You can explain a before/after latency story with numbers."))

    # ===================== D2 =====================
    story.append(Paragraph("D2. Testing &amp; CI", styles["h1"]))
    story.append(hr())
    story.extend(bullets([
        "Unit tests for domain/services with fakes",
        "API tests: httpx.AsyncClient + ASGITransport",
        "Integration: testcontainers or compose Postgres",
        "dependency_overrides for auth/db",
        "GitHub Actions: lint + test on PR",
    ], styles))
    story.append(code_block(
        """import pytest
from httpx import ASGITransport, AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_health():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        r = await ac.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"
""", styles))
    story.extend(task_box("D2 Testing", [
        "Achieve API tests for auth happy path + IDOR + validation 422",
        "Add ruff + pytest to CI workflow",
        "Fail CI if tests fail; badge optional",
        "Write TESTING.md describing how to run tests locally",
    ], styles, "CI green on a clean clone path documented."))

    # ===================== D3 =====================
    story.append(Paragraph("D3. Observability &amp; Production Hardening", styles["h1"]))
    story.append(hr())
    story.extend(bullets([
        "Structured JSON logs with request_id, user_id, tenant_id",
        " /health/live vs /health/ready (DB/Redis checks)",
        "OpenTelemetry traces (at least conceptual wiring)",
        "Docker non-root; timeouts on all external calls; graceful shutdown",
        "Secrets via env; 12-factor config",
    ], styles))
    story.extend(task_box("D3 Production", [
        "Split live/ready probes; ready fails if DB down",
        "Dockerfile + compose for api+db+redis; app runs with one command",
        "Add timeouts to DB engine and httpx client",
        "Write RUNBOOK.md: common failures and first commands to run",
    ], styles, "compose up works; ready probe documented; runbook exists."))

    # ===================== D4 =====================
    story.append(Paragraph("D4. Architecture &amp; System Design", styles["h1"]))
    story.append(hr())
    story.append(Paragraph(
        "For 5+ interviews: clarify requirements → API → data → async flows → failures → scale → security → ops.",
        styles["body"],
    ))
    story.extend(bullets([
        "Modular monolith vs microservices — decide with team size &amp; coupling",
        "Outbox pattern for reliable events; idempotent consumers",
        "Idempotency keys for payment-like POSTs",
        "Background workers (ARQ/Celery) vs BackgroundTasks",
        "Versioning, pagination, multi-tenant isolation as first-class design",
    ], styles))
    story.extend(task_box("D4 Design", [
        "Write a 1-page ADR: 'Why modular monolith for portfolio Project A'",
        "Whiteboard (on paper) a URL shortener: API, data, cache, abuse, scale",
        "Whiteboard a notifications system with WS + Redis pub/sub",
        "Practice a 10-minute verbal walkthrough; record yourself once",
    ], styles, "Two design sketches + one recorded walkthrough in your notes."))
    story.append(PageBreak())

    # ===================== 30 DAY PLAN =====================
    story.append(section_bar("PART E — 30-DAY PLAN (DAY BY DAY)", styles, NAVY))
    story.append(Paragraph("How the plan works", styles["h1"]))
    story.append(hr())
    story.append(Paragraph(
        "Budget ~2–3 hours/day. Each day has Learn + Do. If you miss a day, skip ahead only if "
        "the previous day's 'Do' checkboxes are done—skills compound. Weekends can catch up or deepen.",
        styles["body"],
    ))
    story.append(Paragraph(
        "Weekly themes: W1 Foundations+Core API · W2 Data+Auth · W3 Hardening+Portfolio start · "
        "W4 Portfolio polish+Interview drills",
        styles["callout"],
    ))

    story.append(Paragraph("Week 1 — Foundations &amp; Core FastAPI (Days 1–7)", styles["h2"]))
    week1 = [
        ("Day 1", "Environment &amp; API mental model", "Module A0",
         "Create fastapi-30day repo, venv, NOTES.md; install baseline packages; write mental model"),
        ("Day 2", "Python typing &amp; async drills", "Module A1",
         "Finish typing_drill.py + async_drill.py; enable pyright/mypy; update NOTES"),
        ("Day 3", "HTTP/REST design", "Module A2",
         "Bookstore resource design; error envelope; httpbin curl practice"),
        ("Day 4", "First FastAPI app", "Module A3",
         "health/hello/echo; save openapi.json; break &amp; observe 500"),
        ("Day 5", "Routing &amp; CRUD in-memory", "Module B1",
         "Items router CRUD with skip/limit; README curl section"),
        ("Day 6", "Pydantic v2 schemas", "Module B2",
         "Create/Update/Read models; forbid extras; 5 validator unit tests"),
        ("Day 7", "DI, settings, weekly review", "Module B3 (start)",
         "Settings+.env; API key on writes; dependency_overrides test; review Week 1 gaps"),
    ]
    for d, f, learn, tasks in week1:
        story.extend(day_box(d, f, learn, tasks, styles))

    story.append(Paragraph("Week 2 — Errors, Database, Auth (Days 8–14)", styles["h2"]))
    week2 = [
        ("Day 8", "Errors &amp; middleware", "Module B4",
         "Request-id middleware; domain exception handlers; 404 shape test"),
        ("Day 9", "Postgres + SQLAlchemy async", "Module C1",
         "Compose Postgres; persist Items; unique → 409"),
        ("Day 10", "Alembic + layered architecture", "Module C2",
         "Migrations; repository/service split; integration test"),
        ("Day 11", "Users &amp; password hashing", "Module C3 (part 1)",
         "User model; register; hash passwords; never return hash"),
        ("Day 12", "JWT login &amp; protected routes", "Module C3 (part 2)",
         "Login issues JWT; protect writes; store owner_id"),
        ("Day 13", "Authorization / IDOR defense", "Module C3 (part 3)",
         "Owner-only update/delete; mandatory IDOR tests"),
        ("Day 14", "Redis cache + rate limit", "Module C4",
         "Cache get-by-id; invalidate on write; login 429 limiter; Week 2 retro"),
    ]
    for d, f, learn, tasks in week2:
        story.extend(day_box(d, f, learn, tasks, styles))

    story.append(PageBreak())
    story.append(Paragraph("Week 3 — Senior topics &amp; Portfolio kickoff (Days 15–21)", styles["h2"]))
    week3 = [
        ("Day 15", "Async performance", "Module D1",
         "httpx gather endpoint; fix sleep footgun; capture p95 notes"),
        ("Day 16", "Testing strategy &amp; CI", "Module D2",
         "Expand API tests; ruff+pytest GitHub Action; TESTING.md"),
        ("Day 17", "Observability &amp; Docker", "Module D3",
         "live/ready probes; Dockerfile; one-command compose; RUNBOOK.md"),
        ("Day 18", "System design practice", "Module D4",
         "URL shortener + notifications sketches; record 10-min walkthrough"),
        ("Day 19", "Portfolio Project A kickoff", "Part F — Project A",
         "Scaffold multi-tenant billing API skeleton; choose modules; first migration"),
        ("Day 20", "Project A — tenancy &amp; RBAC", "Project A features",
         "Org/members/roles; tenant scoping in repositories; tests for isolation"),
        ("Day 21", "Project A — billing core", "Project A features",
         "Plans + subscriptions models; create subscription endpoint; Week 3 demo to a friend/rubber duck"),
    ]
    for d, f, learn, tasks in week3:
        story.extend(day_box(d, f, learn, tasks, styles))

    story.append(Paragraph("Week 4 — Ship, polish, interview mode (Days 22–30)", styles["h2"]))
    week4 = [
        ("Day 22", "Idempotent usage ingest", "Project A",
         "POST /usage with Idempotency-Key + Redis/DB store; retry tests"),
        ("Day 23", "Workers &amp; invoices", "Project A",
         "Background worker generates invoice stub; 202 job pattern or outbox notes"),
        ("Day 24", "Security pass", "Project A + OWASP",
         "Threat notes in README (BOLA, webhook forgery); fix gaps; rate limits"),
        ("Day 25", "Project B lite (optional) or deepen A", "Notifications lite OR A polish",
         "Either WS+Redis pub/sub mini demo OR improve A's OpenAPI examples &amp; coverage"),
        ("Day 26", "Docs &amp; architecture narrative", "Portfolio polish",
         "ARCHITECTURE.md + ADR + Postman/Bruno collection; demo GIF/Loom"),
        ("Day 27", "Mock interview — coding", "Question bank Part G",
         "90 min: implement a small feature on a timer; narrate trade-offs"),
        ("Day 28", "Mock interview — system design", "Part G design prompts",
         "45 min design + 15 min critique against checklist (failures, scale, auth)"),
        ("Day 29", "Behavioral stories + resume bullets", "Leadership framing",
         "Write 5 STAR stories; turn Project A into 3 metric-style resume bullets"),
        ("Day 30", "Final dry run &amp; gap list", "Everything",
         "Full review: redo weakest Day tasks; list remaining gaps; plan next 2 weeks"),
    ]
    for d, f, learn, tasks in week4:
        story.extend(day_box(d, f, learn, tasks, styles))

    story.append(Paragraph("30-day success checklist", styles["h2"]))
    story.extend(bullets([
        "You can build a FastAPI service from zero with settings, routers, schemas, DB, auth",
        "You have automated tests + CI + Docker Compose",
        "You can explain async pitfalls, IDOR, idempotency, and ready vs live probes",
        "Portfolio Project A is demoable with README architecture and security notes",
        "You completed at least one timed coding mock and one system-design mock",
    ], styles))
    story.append(Paragraph(
        "<b>If you only have 1.5 hours/day:</b> keep Learn shorter, never skip Do tasks on Days 4–14 "
        "(core skill days). Stretch Days 19–26 over an extra week rather than skipping auth/IDOR.",
        styles["callout"],
    ))
    story.append(PageBreak())

    # ===================== PORTFOLIO =====================
    story.append(section_bar("PART F — PORTFOLIO PROJECTS", styles, NAVY))
    story.append(Paragraph("F. Portfolio Projects (Interview Signal)", styles["h1"]))
    story.append(hr())
    story.append(Paragraph(
        "Ship quality over quantity. Finish Project A well. Add B or C if time remains. "
        "Each project needs: Compose, tests, OpenAPI, ARCHITECTURE.md, security notes.",
        styles["body"],
    ))

    story.append(Spacer(1, 4))
    story.append(section_bar("Project A — Multi-Tenant SaaS Billing API (Flagship)", styles))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "B2B SaaS backend: organizations, members/RBAC, plans, subscriptions, usage metering, invoices. "
        "This is your senior signal project for the 30-day plan (Days 19–26).",
        styles["body"],
    ))
    story.append(Paragraph("Build milestones (use as task list)", styles["h3"]))
    story.extend(bullets([
        "M1 Skeleton: app layout, settings, Postgres, Alembic, health probes",
        "M2 Identity: users, JWT, orgs, memberships, roles",
        "M3 Catalog: plans; subscribe/cancel with validations",
        "M4 Usage: ingest events with Idempotency-Key; aggregate",
        "M5 Billing job: generate invoice stub via worker; list invoices",
        "M6 Hardening: tenant isolation tests, rate limits, RUNBOOK, Loom demo",
    ], styles))
    story.extend(task_box("Project A acceptance", [
        "User in Org A cannot read Org B invoices (automated test)",
        "Usage POST retries with same Idempotency-Key return identical results",
        "OpenAPI documents auth + error envelope",
        "ARCHITECTURE.md explains tenancy + job flow + failure modes",
    ], styles, "Demo works from compose up; you can narrate design in 10 minutes."))

    story.append(Spacer(1, 6))
    story.append(section_bar("Project B — Notifications Hub (Async / Realtime)", styles))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "REST for preferences/history + WebSocket/SSE push + Redis pub/sub across workers. "
        "Great for proving async and horizontal scale awareness.",
        styles["body"],
    ))
    story.extend(bullets([
        "Ingest notification events; persist history with cursor pagination",
        "WS auth on connect; fan-out via Redis; heartbeat",
        "Delivery retries + DLQ sketch; quiet hours",
        "k6/hey script for concurrent connections",
    ], styles))
    story.extend(task_box("Project B acceptance", [
        "Two API replicas both receive pub/sub and push to their clients",
        "Unauthorized websocket rejected",
        "Failure mode notes: Redis blip behavior",
    ], styles, "Diagram + working local demo."))

    story.append(Spacer(1, 6))
    story.append(section_bar("Project C — Secure Document Processing API", styles))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "Presigned upload to MinIO/S3, async virus-scan/metadata worker, ACL downloads. "
        "Highlights trust boundaries and streaming/object storage.",
        styles["body"],
    ))
    story.extend(task_box("Project C acceptance", [
        "Upload initiation → S3 PUT → complete callback flow works in Compose",
        "ACL enforced on download; expired share links fail",
        "Worker retries are idempotent for the same object key",
    ], styles, "Security section in README covers SSRF and ACL."))

    story.append(Paragraph("Repo polish checklist (all projects)", styles["h2"]))
    story.extend(bullets([
        "Makefile: up, test, lint, migrate",
        "Conventional commits; clean README quickstart",
        "Bruno/Postman collection; example .env.example",
        "CI on PR; coverage for services at least",
        "3-minute Loom: problem → architecture → scariest risk → next step at 10× load",
    ], styles))
    story.append(PageBreak())

    # ===================== QUESTIONS =====================
    story.append(section_bar("PART G — QUESTION BANK &amp; CHEAT SHEETS", styles, NAVY))
    story.append(Paragraph("G1. Progressive question bank", styles["h1"]))
    story.append(hr())

    story.append(Paragraph("Beginner → intermediate (after Week 1)", styles["h2"]))
    for i, (q, a) in enumerate([
        ("What does FastAPI generate automatically from your code?",
         "OpenAPI schema + interactive docs from types, paths, and models."),
        ("Difference between path params, query params, and body?",
         "Path = resource identity; query = filters/options; body = payload for write operations."),
        ("Why use response_model / Read schemas?",
         "Control output fields, validate outbound data, prevent leaking internals."),
        ("What is Depends used for?",
         "Reusable request-scoped wiring: DB, auth, settings, permissions."),
    ], 1):
        story.append(Paragraph(f"Q{i}. {q}", styles["q"]))
        story.append(Paragraph(f"A: {a}", styles["a"]))

    story.append(Paragraph("Core senior (after Week 2–3)", styles["h2"]))
    for i, (q, a) in enumerate([
        ("def vs async def endpoints — when each?",
         "async for native async I/O; def runs in threadpool for sync libs; never block the loop with sync I/O/CPU."),
        ("How do you prevent IDOR in multi-tenant APIs?",
         "Authorize on every fetch with tenant/owner scope; deny-by-default; automated isolation tests."),
        ("Pydantic v2 vs v1 highlights?",
         "ConfigDict, new validators API, from_attributes, faster validation, model_dump changes."),
        ("BackgroundTasks vs Celery/ARQ?",
         "BackgroundTasks = in-process after response; queues = durable, multi-worker, retries, DLQ."),
        ("live vs ready probes?",
         "live = process up; ready = dependencies healthy enough to take traffic."),
        ("How do you design idempotent POSTs?",
         "Idempotency-Key stored with request hash/response; retries return first result."),
    ], 1):
        story.append(Paragraph(f"Q{i}. {q}", styles["q"]))
        story.append(Paragraph(f"A: {a}", styles["a"]))

    story.append(Paragraph("System design prompts (Week 4)", styles["h2"]))
    story.extend(bullets([
        "Design a rate limiter used by many FastAPI services",
        "Design idempotent payments capture",
        "Migrate Flask monolith /api to FastAPI without downtime",
        "Design audit logging that is queryable and tamper-evident",
        "Design multi-tenant feature flags with near-realtime updates",
    ], styles))

    story.append(Paragraph("Debugging scenarios", styles["h2"]))
    story.extend(bullets([
        "p99 latency spike after deploy — investigation steps?",
        "Intermittent 401s after scaling replicas — causes?",
        "Async workers exhaust DB connections — what went wrong?",
        "WebSocket clients miss messages on pod restart — fix?",
    ], styles))

    story.append(Paragraph("G2. Cheat sheets", styles["h1"]))
    story.append(hr())
    story.append(Paragraph("Status codes quick map", styles["h2"]))
    story.extend(bullets([
        "200/201/202/204 success family",
        "400/401/403/404/409/422/429 client &amp; conflict family",
        "500/503 server &amp; dependency family",
    ], styles))
    story.append(Paragraph("Annotated deps pattern", styles["h2"]))
    story.append(code_block(
        """UserDep = Annotated[User, Depends(get_current_user)]
DbDep = Annotated[AsyncSession, Depends(get_db)]

@router.get("/me")
async def me(user: UserDep) -> UserRead:
    return user""", styles))
    story.append(Paragraph("Interview phrase bank", styles["h2"]))
    story.extend(bullets([
        "blast radius · rollback plan · explicit consistency model",
        "measure p99 · backpressure · deny by default",
        "expand/contract migration · idempotent consumer · outbox",
    ], styles))

    story.append(Paragraph("G3. Behavioral (5+ years)", styles["h1"]))
    story.append(hr())
    story.extend(bullets([
        "Incident story: detect → mitigate → root cause → prevent",
        "Disagreement on microservices split — align on metrics",
        "Mentorship: review checklist / ADR template impact",
        "Cut scope to hit a date without sacrificing security",
        "Tech debt paid with clear ROI",
    ], styles))

    # Closing
    story.append(Spacer(1, 12))
    story.append(hr())
    story.append(Paragraph("Closing coaching", styles["h2"]))
    story.append(Paragraph(
        "You are not studying to recite FastAPI docs. You are training to own a service: "
        "correctness, security, operability, and clear trade-offs. Follow modules in order, "
        "tick every practice task, and execute the 30-day plan. On Day 30, your weakest topics "
        "become your next two-week focus list—then book real mocks.",
        styles["body"],
    ))
    story.append(Paragraph(
        "Start Day 1 today: create the repo, write your API mental model in NOTES.md, and do not "
        "skip the checkbox tasks. Momentum beats perfect plans.",
        styles["callout"],
    ))

    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=0.55 * inch,
        bottomMargin=0.55 * inch,
        title="FastAPI Interview Guide — From Scratch to Senior (30-Day)",
        author="Interview Prep Series",
    )
    doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
    print(f"Wrote {OUTPUT}")
    return OUTPUT


if __name__ == "__main__":
    build()
