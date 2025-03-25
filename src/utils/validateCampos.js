import sanitizeHtml from 'sanitize-html'

const regexPermitida = /^[\p{L}0-9\s-]+$/u;

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

export default { validateCampo, validateArray }