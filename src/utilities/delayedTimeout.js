
// función de utilidad creada para añadir una demora en ms y aparentar el efecto latencia
export const delayedTimeout = ms => new Promise(res => setTimeout(res, ms));