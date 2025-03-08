import { convertUnits } from "../utils/convert.js"

export const createConversion = (req, res) => {
    const { value, from, to, type } = req.body
    const result = convertUnits(value, from, to, type)

    if (result == null) return res.status(400).json({ error: 'Conversión incorrrecta' })

    return res.json({ result })
}