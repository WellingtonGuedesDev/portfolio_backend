import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName: {
      type: String,
      required: [true, "Nome do projeto é obrigatorio"],
      unique: [true, "Ja existe um projeto com esse nome"],
      minlength: [2, "Nome do projeto deve ter pelo menos 2 caracteres"],
      maxlength: [30, "Nome do projeto deve ter no maximo 30 caracteres"]
    },
    description: {
      type: String,
      required: [true, "Descrição é obrigatorio"],
      minlength: [2, "Descrição deve ter no minimo 10 caracteres"],
      maxlength: [300, "Descrição deve ter no maximo 300 caracteres"]
    },
    stack: {
      type: Array,
      required: [true, "Informe pelo menos uma stack"],
    },
});

const projects = mongoose.model("projects", projectSchema)

export async function readProject() {
    const result = await projects.find({})

    //console.log(result[0].id)
    const parseResult = result.map((item) => {
        const { id, projectName, description, stack } = item

        return { id, projectName, description, stack }
    })

    return parseResult;
}

// export function getOneProject(id) {
//     const project = projects.findById(id)
//     .then(user => {
//         console.log(user);

//         return user
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }

export function getOneProject(id) {
    return projects.findById(id) // Retorna a Promise diretamente
        .then(project => {
            //console.log("projectThen========", project)

            if (!project) {
                return null
            }

            return project; // Retorna o projeto para o chamador
        })
        .catch(err => {
            //console.log("projectErr========", err)
            throw err; // Propaga o erro para o controlador
        });
}

export function createProject(projectName, description, stack) {
    const newProject = new projects({ projectName: projectName, description: description, stack: stack })
    
    const result = newProject.save()
    .then(() => {
        return { message:  "Projeto criado com sucesso"}
    })
    .catch((err) => {
        //const requiredError = err.errors.projectName.properties.message
        //console.log("teste========", err.errors.description.properties.message)

        if (err?.cause?.errorResponse?.code) {
            console.log("projeto ja existe")
            return { message: "Projeto ja existe", status: "error" }
        }

        if (err?.errors?.projectName?.properties?.message) {
            console.log("Erro generico")
            return { message: err.errors.projectName.properties.message, status: "error" }
        }

        if (err?.errors?.description?.properties?.message) {
            console.log("Erro generico")
            return { message: err.errors.description.properties.message, status: "error" }
        }
    })

    return result;
}

export default { createProject, readProject, getOneProject }