import ProjectsController from "../controllers/projectController.js";
import express from "express";
import {validateCampo, validateArray} from "../utils/validateCampos.js";

const projectRoutes = express.Router()
const projectController = new ProjectsController()

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
