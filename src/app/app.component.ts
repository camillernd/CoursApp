import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersList } from './components/user/users-list/users-list.component';
import { UserDetail } from './components/user/user-details/user-details.component';
import { CommonModule } from '@angular/common';
import { MessageService } from './services/message.service';
import { MessageComponent } from './components/shared/message/message.component';
import { UsersService } from './services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root', // Le composant racine de l'application
  standalone: true, // Utilisation de la configuration "standalone" sans module racine
  imports: [
    UsersList, // Importation du composant de la liste des utilisateurs
    MatCardModule, 
    RouterOutlet, 
    UserDetail, 
    MessageComponent, 
    CommonModule, 
    MatButtonModule
  ],
  templateUrl: './app.component.html', // Fichier HTML associé au composant
  styleUrls: ['./app.component.css'],  // Fichier CSS associé au composant
})
export class AppComponent implements OnInit {
  title = 'Angular Standalone App'; // Titre de l'application

  // Référence à l'instance du composant UsersList pour rafraîchir la liste des utilisateurs
  @ViewChild(UsersList) usersList!: UsersList;

  constructor(
    private messageService: MessageService, // Injection du service MessageService pour la gestion des logs/messages
    private usersService: UsersService // Injection du service UsersService pour la gestion des utilisateurs
  ) {}

  /**
   * Méthode appelée à l'initialisation du composant.
   */
  ngOnInit(): void {
    this.messageService.log('AppComponent initialized'); // Log de l'initialisation du composant racine
  }

  /**
   * Méthode pour ajouter un utilisateur avec un prénom et un nom générés dynamiquement.
   */
  addUser(): void {
    const newFirstName = 'New'; // Prénom par défaut pour le nouvel utilisateur
    const newName = `User${this.usersService.getUsers().length + 1}`; // Génération d'un nom unique en fonction du nombre d'utilisateurs
    this.usersService.addUser(newFirstName, newName); // Ajout de l'utilisateur via le service UsersService
    this.usersList.refreshUsers(); // Rafraîchissement de la liste des utilisateurs dans le composant UsersList
    this.messageService.log(`Added new user: ${newFirstName} ${newName}`); // Log de l'ajout du nouvel utilisateur
  }
}
