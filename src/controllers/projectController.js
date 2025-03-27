import { createProject, readProject, getOneProject, updateProject } from "../models/projects.js";

export default class ProjectsController {

    async readProject() {
        const projects = await readProject()
        //console.log('controle=======', projects)

        if (Object.keys(projects).length === 0) {
            return { message: "Nenhum projeto criado", status: 200 }
        }

        return { message: projects, status: 200 }
    }

    async getOneProject(id) {
        const project = await getOneProject(id)

        if (project === null) {
            return { message: "Projeto não encontrado", status: 404 }
        }

        return { message: project, status: 200 }
    }

    async updateProject(id, valueUpdate) {
        const project = await updateProject(id, valueUpdate)
        console.log("controllerTEste========", project)

        if (project.status === 404) {
            console.error('if========null',project)
            return { message: project.message, status: project.status }
        }

        console.log('update==========',project)
        return { message: project.message, status: project.status }
    }

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