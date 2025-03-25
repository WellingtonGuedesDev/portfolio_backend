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

function createProject(projectName, description, stack) {
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

export { createProject }