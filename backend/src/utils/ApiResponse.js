/**
 * ApiResponse Class
 * * Yeh class backend se bheje jaane wale har response ka ek standard format (structure) 
 * define karti hai. Iska maqsad yeh ensure karna hai ke client-side (frontend) ko 
 * hamesha ek predictable structure mile, chahe request kamyab ho ya fail.
 */

class ApiResponse {

    constructor(statusCode, message = "Success", data = null, errors = []) {
        this.statusCode = statusCode;
        this.message = message;
        // Yeh flag automate karta hai ke request successful hai ya nahi
        this.success = statusCode >= 200 && statusCode < 300;
        this.data = data;
        this.errors = errors;
    }
}

export default ApiResponse;









