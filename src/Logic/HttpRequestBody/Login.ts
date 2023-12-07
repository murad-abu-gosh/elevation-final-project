export interface LoginRoot {
    login : Login
  }
  
  // Create an object that adheres to the interface
  export interface Login {
    email: string;
    password: string;
  }