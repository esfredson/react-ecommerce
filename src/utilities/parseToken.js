export const parseToken = (token) => {
    var base64Url = token.split('.')[1]; //separo el header, el payload y la firma digital del token y tomo su payload en su formato base64 sin decodificar
    var base64 = base64Url.replace(/-/g, '+').replace(/_/, '/'); //decodifico el payload a formato base64
    var jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')); // devuelve la data en formato string legible

    return JSON.parse(jsonPayload);

}