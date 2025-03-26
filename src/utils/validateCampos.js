import sanitizeHtml from 'sanitize-html'

const regexPermitida = /^[a-zA-Z0-9\s-ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäåçèéêëìíîïòóôõöùúûü.,!?;:]+$/i;
const regexId = /^[0-9a-fA-F]{24}$/;

export function validateCampo(value) {
    if (!regexPermitida.test(value)) {
        console.log("regex:=====", value)
        throw new Error('Nome contém caracteres inválidos');
    }

    return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} });
}

export function validateArray(value) {

    const arraySanitize = value.map((item) => {
        if (!regexPermitida.test(item)) {
            console.log("regexArray:=====", item)
            throw new Error('Nome contém caracteres inválidos');
        }

        return sanitizeHtml(item, { allowedTags: [], allowedAttributes: {} });
    })

    return arraySanitize
}

export function validadeId(value) {
    if (!regexId.test(value)) {
        return null
    }

    return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })
}

export default { validateCampo, validateArray, validadeId }