// Interface TUser : définit les propriétés d'un utilisateur avec certaines options facultatives
export interface TUser {
  id: number | null; // L'ID peut être un nombre ou null 
  firstname: string;  // Prénom de l'utilisateur (obligatoire)
  name: string;       // Nom de l'utilisateur (obligatoire)
  role?: string;      // Rôle de l'utilisateur, facultatif avec une valeur par défaut
  email?: string;     // Email de l'utilisateur, facultatif avec une validation dans la classe User
  tel?: string;       // Téléphone de l'utilisateur, facultatif
}

// Classe User : implémente l'interface TUser et offre un modèle plus structuré
export class User implements TUser {
  public id: number | null;  // ID public pour l'utilisateur
  firstname: string;         // Prénom de l'utilisateur
  name: string;              // Nom de l'utilisateur
  role: string;              // Rôle de l'utilisateur avec une valeur par défaut
  email: string;             // Email de l'utilisateur, validé lors de la construction
  tel: string;               // Numéro de téléphone de l'utilisateur

  /**
   * Constructeur de la classe User.
   * @param firstname Le prénom de l'utilisateur (obligatoire).
   * @param name Le nom de l'utilisateur (obligatoire).
   * @param role Le rôle de l'utilisateur, optionnel, avec une valeur par défaut 'default role'.
   * @param email L'email de l'utilisateur, optionnel, avec une valeur par défaut et validation.
   * @param tel Le numéro de téléphone de l'utilisateur, optionnel, avec une valeur par défaut.
   * @param id L'ID de l'utilisateur, optionnel, initialisé à null si non fourni.
   */
  constructor(
    firstname: string,
    name: string,
    role: string = 'default role',
    email: string = 'default@email.com',
    tel: string = 'default tel',
    id: number | null = null
  ) {
    // Assignation des propriétés aux valeurs fournies ou par défaut
    this.firstname = firstname;
    this.name = name;
    this.role = role;
    
    // Validation de l'email avant assignation, sinon utilise une valeur d'erreur
    this.email = this.validateEmail(email) ? email : 'invalid@email.com';
    this.tel = tel;
    this.id = id; // ID initialisé ou mis à jour par un processus externe
  }

  /**
   * Méthode privée pour valider l'email.
   * @param email Email à valider.
   * @returns true si l'email est valide, false sinon.
   */
  private validateEmail(email: string): boolean {
    // Expression régulière pour valider le format email
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email); // Retourne true si l'email correspond au pattern
  }
}
