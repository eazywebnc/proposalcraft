import { GoogleGenerativeAI } from '@google/generative-ai'
import type { ProposalContent, WizardAnswers } from '@/lib/types'

function getGenAI() {
  return new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)
}

const SYSTEM_PROMPT = `You are ProposalCraft AI, an expert business proposal writer for freelancers and agencies.
You generate professional, persuasive, and well-structured business proposals.

Output ONLY valid JSON matching the ProposalContent schema. No markdown, no code fences, no explanation.

ProposalContent schema:
{
  "sections": [
    { "type": "cover", "title": string, "subtitle": string, "client_name": string, "date": string },
    { "type": "about", "heading": string, "body": string },
    { "type": "scope", "heading": string, "items": [{ "title": string, "description": string }] },
    { "type": "deliverables", "heading": string, "items": [string] },
    { "type": "timeline", "heading": string, "milestones": [{ "phase": string, "duration": string, "description": string }] },
    { "type": "pricing", "heading": string, "line_items": [{ "description": string, "quantity": number, "unit_price": number }], "total": number },
    { "type": "terms", "heading": string, "body": string },
    { "type": "next_steps", "heading": string, "body": string, "cta_text": string }
  ]
}

Rules:
- Title should be compelling and specific to the project
- About section should position the freelancer as expert
- Scope items should be specific and detailed (3-6 items)
- Deliverables should be concrete and actionable
- Timeline should have 3-5 phases
- Pricing line items should break down the budget logically. Total should be within the given budget range
- Terms should cover payment schedule, revisions, IP ownership
- Next steps should have a clear CTA
- Use professional but warm tone
- Be specific to the industry and service type`

export async function generateProposal(answers: WizardAnswers): Promise<ProposalContent> {
  const model = getGenAI().getGenerativeModel({ model: 'gemini-2.0-flash' })

  const prompt = `Generate a professional business proposal with these details:
- Client: ${answers.client_name} (${answers.client_company})
- Service type: ${answers.service_type}
- Project: ${answers.project_description}
- Key deliverables requested: ${answers.deliverables}
- Timeline: ${answers.timeline}
- Budget range: $${answers.budget_min} - $${answers.budget_max}
- Payment terms: ${answers.payment_terms}
- Today's date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    systemInstruction: { role: 'model', parts: [{ text: SYSTEM_PROMPT }] },
    generationConfig: {
      temperature: 0.7,
      responseMimeType: 'application/json',
    },
  })

  const text = result.response.text()
  return JSON.parse(text) as ProposalContent
}
