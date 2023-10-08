import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost/programacao-web/CriandoAPIPHP',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}); 
