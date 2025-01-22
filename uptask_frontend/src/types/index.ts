import { z } from 'zod'

/** Projects */

export const ProjectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string()
})

export const dashboardProjectSchema = z.array(
    ProjectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    })
)

export type Project = z.infer<typeof ProjectSchema>

export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>