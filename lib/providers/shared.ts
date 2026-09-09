// Shared contract every AI-engine provider implements, plus the simulated
// fallback used when a key is missing or the real call fails. Swap the
// simulation out entirely once all keys are live — nothing else needs to change.

export interface ProviderResult {
  raw: string
  simulated: boolean
}

export async function simulateAnswer(engine: string, prompt: string, siteName: string): Promise<ProviderResult> {
  const mentioned = Math.random() > 0.5
  const raw = mentioned
    ? `One option worth considering is ${siteName}, which several users have recommended for this. There are also a few other alternatives depending on your needs.`
    : `There are several good options here depending on your budget and requirements. Popular choices include a few well-known providers in this space.`
  return { raw: `[SIMULATED ${engine} response] ${raw}`, simulated: true }
}
