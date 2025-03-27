import ProjectsController from "../controllers/projectController.js";
import express from "express";
import { validateCampo, validateArray, validadeId } from "../utils/validateCampos.js";

const projectRoutes = express.Router()
const projectController = new ProjectsController()

projectRoutes.get('/getAllProjects', async (req, res) => {
    const projects = await projectController.readProject()
    //console.log('router============', projects)

    res.status(projects.status).json({ message: projects.message, status: projects.status })
})

projectRoutes.get('/getProject/:id', async (req, res) => {
    //console.log(req.params.id)
    const validateId = validadeId(req.params.id)

    if (!validateId) {
        console.log("entro !validate")
        return res.status(404).json({ message: "Projeto não encontrado", status: 404 })
    }   

    const project = await projectController.getOneProject(validateId)
    //console.log(project)

    if (project.status === 404) {
        console.log("entro status 404")
        return res.status(project.status).json({ message: project.message, status: project.status })
    }

    return res.status(project.status).json({ message: project.message, status: project.status })
})

projectRoutes.post('/updateProject', async (req, res) => {
    const { id, update } = req.body
    console.log("router=========", update.stack)

    // if (!validadeId(id)) {
    //     console.log("id invalido")
    // }

    const project = await projectController.updateProject(id, update)
    console.log("projectRouter=======", project)

    if (project.status === 404) {
        return res.status(project.status).json({ message: project.message, status: project.status })
    }

    return res.status(project.status).json({ message: project.message, status: project.status })
})

projectRoutes.post('/createProject', async (req, res) => {
    let { projectName, description, stack } = req.body

    try {
        projectName = validateCampo(projectName)
        description = validateCampo(description)
        stack = validateArray(stack)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "requisição invalida", status: 400 })
        return
    }

    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "O corpo da requisição esta vazio" })

        return
    }

    console.log("routes==========", description)

    if (stack.length === 0) {
        res.json({ message: "Defina pelo menos uma stack" })
        return
    }

    const projectControllerResult = await projectController.createProject(projectName, description, stack)

    res.status(projectControllerResult.status).json({ message: projectControllerResult.message, status: projectControllerResult.status })
})

export default projectRoutes
