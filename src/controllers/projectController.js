import { createProject } from "../models/projects.js";

export default class ProjectsController {
    async createProject(projectName, description, stack) {
        const project = await createProject(projectName, description, stack)
        console.log("controler========", project)

        if (project.status === "error") {
            //console.log("Projeto ja existe")
            //console.error(project.message)
            return { message: project.message, status: 400 }
        }

        return { message: "Projeto criado com sucesso", status: 200 }
    }
}