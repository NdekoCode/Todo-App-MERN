export default class Validators {
  constructor() {
    this.errors = {};
  }
  isEmpty(value) {
    if (!this.isVarEmpty(value)) {
      if (typeof value === "string") {
        return this.isStringEmpty(value);
      }

      if (this.checkObject(value)) {
        return this.isEmptyObject(value);
      }
      return this.isArrayEmpty(value);
    }
  }
  fcheckObject(objValue) {
    return (
      objValue &&
      typeof objValue === "object" &&
      objValue.constructor === Object
    );
  }
  /**
   * @description Verifie si une chaine de caractère est vide et retourne true si il est vide et false sinon
   * @param {String} value!this.
   * @author NdekoCode
   * @export
   * @return {Boolean}
   */
  isStringEmpty(value) {
    if (this.isVarEmpty(value) || value === "") {
      return true;
    }
    return value.toString().trim().length < 1;
  }

  /**
   * @description Verifie si une variable est vide et retourne true si il est vide et false sinon
   * @author NdekoCode
   * @export
   * @param {*} value
   * @return {Boolean}
   */
  isVarEmpty(value) {
    return value === undefined || value === null;
  }

  /**
   * @description Verifie si une variable est vide et retourne true si il est vide et false sinon
   * @author NdekoCode
   * @export
   * @param {*} value
   * @return {Boolean}
   */
  isEmpty(value) {
    if (!this.isVarEmpty(value)) {
      if (typeof value === "string") {
        return this.isStringEmpty(value);
      }

      if (value.length === undefined) {
        return this.isEmptyObject(value);
      }
      return this.isArrayEmpty(value);
    }
  }
  /**
   * @description Verifie si une variable est vide et retourne true si il est vide et false sinon
   * @author NdekoCode
   * @export
   * @param {Object} value
   * @return {Boolean}
   */
  isEmptyObject(value) {
    if (!this.isVarEmpty(value)) {
      return Object.keys(value).length < 1;
    }
    return true;
  }

  /**
   * @description
   * Verifie si un tableau est vide et retourne true si il est vide et false sinon
   * @param {Array} value
   * @author NdekoCode
   * @export
   * @return {Boolean}
   */
  isArrayEmpty(value) {
    return Array.isArray(value) && value.length < 1;
  }

  /**
   * @description Permet de valider le formulaire des produits
   * @author NdekoCode
   * @export
   * @param {Object} reqbody Le corps de la requete
   * @param {Array} [error=[]] Le tableau des erreurs
   * @return {Boolean}
   */
  validForm(reqbody) {
    if (!this.isVarEmpty(reqbody)) {
      for (let element in reqbody) {
        if (
          this.isStringEmpty(reqbody[element]) ||
          (typeof reqbody[element] === "string" && reqbody[element].length < 2)
        ) {
          this.errors["error"] =
            "Remplissez les champs avec des informations valides";
          break;
        }
      }
    } else {
      this.errors["error"] = "Veuillez completer tous les champs";
    }
    return this.isEmptyObject(this.errors);
  }

  /**
   * @description Permet de verifier si une addresse mail est valide ou non
   * @param {String} value L'adresse emil à verifier
   * @param {Object} errors Le tableau qui va contenir les erreur s'il y en a
   * @returns
   */
  ValidateEmail(value) {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (value.match(validRegex)) {
      return true;
    }
    this.errors["error"] = "adresse e-mail invalide";
    return this.isEmptyObject(this.errors);
  }
  validPassword(value, confPassword = undefined) {
    if (this.isStringEmpty(value) || value.length < 5) {
      this.errors["error"] =
        "Le mot de passe doit etre au moins de 5 caractères";
    }
    if (confPassword && value !== confPassword) {
      this.errors["error"] = "Les deux mot de passe ne correspondent pas";
    }
    return this.isEmptyObject(this.errors);
  }
  isValidUserFields(bodyUserRequest, validField) {
    for (let field in bodyUserRequest) {
      if (!validField.includes(field)) {
        this.errors[field] = "Le champs est requis";
      }
    }
    return this.isEmptyObject(errors);
  }
}
