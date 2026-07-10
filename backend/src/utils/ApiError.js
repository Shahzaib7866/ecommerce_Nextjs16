// Custom error class for handling API errors in a consistent, structured way.
// Har jagah error throw karte waqt same format milta hai (statusCode, message, errors list, etc.)
// isliye frontend ya error-handling middleware ko pata hota hai ke response mein kya expect karna hai.

// Node.js ki built-in "Error" class ko extend kar rahe hain, taake humein
// stack trace jaisi built-in error features bhi milti rahein, aur upar se
// apni custom properties (statusCode, success, errors) bhi add kar sakein.
class ApiError extends Error {

  // Constructor mein parameters:
  // statusCode -> HTTP status code (404, 500, etc.) jo response mein bhejna hai
  // message    -> error ka readable message (default: "Something went wrong")
  // errors     -> agar multiple validation errors hain to unki array
  // stack      -> optional custom stack trace (agar khud se pass karna ho)
  constructor(
    statusCode,
    message = "Something went wrong", // fix: "=" use kiya, ":" nahi (ye JS hai, TS nahi)
    errors = [],
    stack = ""
  ) {
    // super() call zaroori hai kyunke hum Error class extend kar rahe hain.
    // Ye parent Error class ka constructor call karta hai aur "message"
    // property set karta hai (built-in Error.message)
    super(message);

    // Apni custom properties define kar rahe hain jo normal Error class mein nahi hoti
    this.statusCode = statusCode;   // e.g. 400, 404, 500
    this.message = message;         // error message (super() ne bhi set kiya, yahan explicit bhi kar diya)
    this.success = false;           // API response ka standard flag - error hamesha false
    this.errors = errors;           // validation errors ki list (agar multiple ho)
    this.data = null;               // data hamesha null rakhte hain error case mein

    // fix: ye block pehle constructor ke bahar tha jo invalid syntax tha.
    // Ab andar hai, jaisa hona chahiye.
    if (stack) {
      // agar koi custom stack trace already diya gaya hai, wahi use karo
      this.stack = stack;
    } else {
      // warna Node.js ka built-in method use karke stack trace generate karo.
      // Ye batata hai error kis file/line se aayi, aur "ApiError" khud us
      // trace mein extra clutter ki tarah nahi dikhega (clean trace milta hai)
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Is class ko export kar rahe hain taake project ke kisi bhi controller/route mein
// import karke use kar sakein, e.g.:
//   throw new ApiError(404, "User not found");
export default ApiError;