# AI Interaction Log

## Approach
The application uses a rule-based engine simulating AI reasoning for the MVP phase. This ensures deterministic, fast, and reliable feedback without external API costs.

## Logic Implementation
The "AI" suggestions are generated based on specific triggers:
- **Trigger**: Category > 30% time.
  - **Response**: "Consider reducing batches of [Category] to 25 mins."
- **Trigger**: Category < 5% time (and not 'Sleep').
  - **Response**: "Try micro-dosing [Category] for just 10 mins today."
- **Trigger**: 'Health' or 'Exercise' missing.
  - **Response**: "Movement is key! Can you find 15 mins for a walk?"

## Future LLM Integration Prompt
When migrating to LLM (Phase 3), the following prompt structure will be used:
> "Act as a productivity coach. The user spent X minutes on A, Y minutes on B. Their goal is '[GOAL]'. Identify 1 misaligned habit and propose a 5-minute fix."
