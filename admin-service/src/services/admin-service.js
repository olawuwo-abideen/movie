const { MovieRepository } = require("../database");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} = require("../utils");
const {
  NotFoundError,
  ValidationError,
} = require("../utils/errors/app-errors");

// All Business logic will be here
class AdminService {
  constructor() {
    this.repository = new AdminRepository();
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;

    const existingAdmin = await this.repository.FindAdmin({ email });

    if (!existingAdmin)
      throw new NotFoundError("user not found with provided email id!");

    const validPassword = await ValidatePassword(
      password,
      existingAdmin.password,
      existingAdmin.salt
    );
    if (!validPassword) throw new ValidationError("password does not match!");

    const token = await GenerateSignature({
      email: existingAdmin.email,
      _id: existingAdmin._id,
    });

    return { id: existingAdmin._id, token };
  }

  async SignUp(userInputs) {
    const { email, password, phone } = userInputs;

    // create salt
    let salt = await GenerateSalt();

    let userPassword = await GeneratePassword(password, salt);

    const existingAdmin = await this.repository.CreateAdmin({
      email,
      password: userPassword,
      phone,
      salt,
    });

    const token = await GenerateSignature({
      email: email,
      _id: existingAdmin._id,
    });
    return { id: existingAdmin._id, token };
  }
}
  class MovieService {

    constructor(){
        this.repository = new MovieRepository();
    }
    

  async GetProfile(id) {
    return this.repository.FindAdminById({ id });
  }


async CreateMovie(movieInputs){

  const movieResult = await this.repository.CreateMovie(movieInputs)
  return FormateData(movieResult);
}

async GetMoviesByCategory(category){

  const movies = await this.repository.FindByCategory(category);
  return FormateData(movies)

}

async GetMovies(){
  const movies = await this.repository.Movies();

  let categories = {};

  movies.map(({ genre }) => {
      categories[genre] = genre;
  });
  
  return FormateData({
      movies,
      categories:  Object.keys(categories)  
     })

}

}

module.exports = AdminService;
