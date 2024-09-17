import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root', // Fournit ce service à l'ensemble de l'application via le root injector
})
export class UsersService {
  private userIdCounter = 1; // Compteur d'ID auto-incrémenté pour chaque utilisateur créé

  // Tableau d'utilisateurs avec des exemples de données
  private users: User[] = [
    // Utilisateur avec toutes les informations fournies (ID auto-généré)
    new User('Doe', 'John', 'Admin', 'john.doe@example.com', '123-456-7890', this.userIdCounter++),

    // Utilisateur avec rôle et email par défaut, ID auto-généré
    new User('Smith', 'Jane', undefined, undefined, undefined, this.userIdCounter++),

    // Utilisateur avec un rôle personnalisé mais un email invalide (email par défaut utilisé), ID auto-généré
    new User('Brown', 'Alice', 'Manager', 'invalid-email', '321-654-0987', this.userIdCounter++),
  ];

  /**
   * Méthode pour récupérer la liste des utilisateurs.
   * @returns Un tableau d'objets User.
   */
  getUsers(): User[] {
    return this.users; // Retourne la liste des utilisateurs stockée localement
  }

  /**
   * Méthode pour ajouter un nouvel utilisateur.
   * @param firstname Le prénom du nouvel utilisateur.
   * @param name Le nom du nouvel utilisateur.
   */
  addUser(firstname: string, name: string): void {
    // Crée un nouvel utilisateur avec les valeurs par défaut pour le rôle, l'email et le téléphone
    const newUser = new User(firstname, name, 'default role', 'default@email.com', 'default tel', this.userIdCounter++);
    
    // Ajoute le nouvel utilisateur au tableau des utilisateurs
    this.users.push(newUser);
  }
}
