---
title: "Selecting the Right AI Model"
date: 2025-11-13T10:00:00
slug: selecting-the-right-ai-model
authors: [lkgarcia]
tags: [ai, agentic-ai, banking]
prompt: |
  Title: Selecting the Right AI Model: A Framework for Building Reliable and Scalable Agentic Systems

  Message: Effective model selection in agentic AI for retail banking requires a disciplined framework that balances capability, adaptability, cost, latency, risk, and governance. This paper provides a decision model for choosing among Large Language Models (LLMs), Small Language Models (SLMs), Narrow / Specialized Models (NLMs), and adaptation strategies (prompt-only, retrieval augmentation, fine-tuning, multi-modal integration) to build reliable, scalable agent systems.

  Purpose: Deliver an actionable, evidence-based framework to guide architects and product leaders in selecting and adapting language and multi-modal models for high-impact retail banking use cases (e.g., personalized financial guidance, fraud signal triage, customer service orchestration) while controlling cost and risk.

  Goals:
    - Define classification taxonomy: LLM vs SLM vs NLM (capability, cost, latency, governance trade-offs).
    - Provide criteria for when to use: (a) LLM + context/prompt engineering only, (b) Retrieval-Augmented Generation (RAG), (c) Fine-tuning, (d) Multi-modal models.
    - Quantify cost & effort dimensions of fine-tuning (data acquisition, cleaning, annotation, infra, evaluation, ongoing drift management).
    - Outline evaluation dimensions: accuracy, hallucination rate, latency, cost per 1K tokens, privacy/compliance surface, operational maturity.
    - Present model selection decision flow (Mermaid diagram) from use case attributes (complexity, domain specificity, data readiness, regulatory sensitivity) to adaptation strategy.
    - Provide pragmatic 3-phase roadmap (short, mid, long-term) for model portfolio evolution in retail banking.
    - Highlight emerging role of multi-modal (text + document imaging, receipts, statements) and constraints.
    - Embed cost optimization levers (model sizing, caching, distillation, tiered routing, selective RAG scopes).

  Audience: Technical product managers, enterprise/solution architects, AI platform leads, and senior banking executives (mixed technical / non-technical). Assumes familiarity with AI concepts but not deep research expertise.

  Tone: Clear, authoritative, pragmatic; moderately technical yet accessible; caveated where speculative; avoids hype and vendor promotion.

  Length & structure:
    - Target: ~1200–1600 words total.
    - Use plain Markdown headings (no bold), concise paragraphs, bullets, and one Mermaid diagram (decision flow).
    - Inline citations with footnotes: [^n] referencing reputable sources (ArXiv papers, Gartner insights, recognized universities/researchers).
    - Minimize jargon; define terms on first use.

  Sections:
    1) Executive summary (100–150 words): Core thesis + decision framework value.
    2) Introduction: Why disciplined model selection matters now (cost pressure, reliability, governance).
    3) Technical fundamentals:
       - Model scale vs capability vs latency (parameters, context window, throughput).
       - Adaptation continuum: prompt engineering → RAG → fine-tuning → multi-modal integration.
       - Evaluation & risk axes (accuracy, hallucination, compliance, cost kinetics, observability).
    4) Topics (deep dive):
       - Taxonomy: LLM vs SLM vs NLM (definition, strengths, limitations, when to choose each).
       - Strategy comparison: LLM + system prompt vs RAG vs Fine-Tuning (decision criteria: domain specificity, update frequency, data volume, risk tolerance).
       - Cost & effort model of fine-tuning (stages, typical resource consumption, breakeven thresholds).
       - Multi-modal models in retail banking (document ingestion, statement understanding, fraud evidence).
       - Cost dimension & optimization (pricing structures, batching, caching, distillation, model routing, guardrail execution costs).
       - Risk & governance (hallucination mitigation, leakage prevention, bias monitoring, auditability).
    5) Recommendations & roadmap:
       - Short-term: Establish evaluation harness, start with SLM or efficient LLM + robust system prompts + guardrails.
       - Mid-term: Introduce RAG over curated, governed internal knowledge base; selective fine-tuning for narrow classification tasks.
       - Long-term: Portfolio optimization (model routing & distillation), multi-modal expansion, continuous cost governance & drift management.
    6) Conclusion: Reinforce disciplined selection + adaptive strategy as foundation for sustainable agentic AI scaling.

  Decision diagram (Mermaid) guidance: Flow from use case inputs (domain specificity, update velocity, required explainability, available labeled data, latency budget, cost constraints) to recommended path (Prompt-only LLM, SLM, RAG, Fine-tune, Multi-modal extension).

  Examples & requirements:
    - 3-point roadmap (short / mid / long).
    - Emphasis on retail banking scenarios; avoid naming specific banks or jurisdictions.
    - No regulatory specifics; keep governance general (privacy, auditability).

  Constraints: Avoid vendor promotion; provide caveats for emerging capabilities; no unrealistic timelines; no unsupported performance claims.

  Sources (target at least 6 distinct footnotes): Mix of ArXiv (model scaling, RAG efficiency), Gartner (enterprise adoption / cost trends), and leading academic institutions (e.g., Stanford, MIT, Oxford) on evaluation, hallucination mitigation, and multi-modal advances.

  Output Format: Single downloadable Markdown file ready for Docusaurus docs pipeline.

---
:::warning WORK IN PROGRESS
:::

# Selecting the Right AI Model: A Framework for Building Reliable and Scalable Agentic Systems
