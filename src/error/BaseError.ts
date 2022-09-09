export class CustomError extends Error {
  constructor(statusCode: number, message: string){
      super(message)
  }
}

export class MissingInformation extends CustomError{
  constructor() {
    super(422, "Informações incompletas. Favor verificar todos os campos.")
  }
}

export class InvalidName extends CustomError{ 
  constructor(){
      super(400, "Nome inválido")
  }
}

export class InvalidEmail extends CustomError{ 
  constructor(){
      super(400, "Email inválido")
  }
}

export class InvalidPassword extends CustomError{ 
  constructor(){
      super(400, "Senha inválida")
  }
}

export class Unauthorized extends CustomError{
  constructor() {
    super(400, "Somente administradores podem cadastrar bandas no sistema.")
  }
}

export class NotFound extends CustomError{
  constructor() {
    super(404, "Esta banda não foi encontrada no sistema.")
  }
}

export class InvalidWeekDay extends CustomError {
  constructor() {
    super(400, "Os shows devem ocorrer somente nas sextas, sábados e domingos.")
  }
}



export class FestivalClosed extends CustomError {
  constructor() {
    super(400, "Os shows devem ocorrer entre as 8h e 23h, e devem iniciar e terminar somente em horas cheias.")
  }
}

export class InvalidStartTime extends CustomError {
  constructor() {
    super(400, "Horários inválidos. Verifique o início e o fim do show.")
  }
}

