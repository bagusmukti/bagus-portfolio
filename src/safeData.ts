// Safe data accessor — components import from here, not directly from data.ts
// Uses `import *` (namespace import) which never fails even if exports are deleted
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import * as raw from './data'
const r = raw as any

export const personal: any   = r.personal   ?? {}
export const skills:   any[] = r.skills     ?? []
export const projects: any[] = r.projects   ?? []
export const experience: any[] = r.experience ?? []
