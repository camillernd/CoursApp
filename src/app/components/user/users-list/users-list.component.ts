import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from '../../../models/user'; // Importation du modèle User
import { UserDetail } from '../user-details/user-details.component'; // Composant UserDetail pour les détails d'un utilisateur
import { CommonModule } from '@angular/common'; // Importation du module CommonModule d'Angular
import { MessageService } from '../../../services/message.service'; // Service pour gérer les messages
import { UsersService } from '../../../services/users.service'; // Service pour gérer les utilisateurs
import { MatTableModule } from '@angular/material/table'; // Module de tableau de Angular Material
import { MatButtonModule } from '@angular/material/button'; // Module de bouton de Angular Material
import { MatTableDataSource } from '@angular/material/table'; // Classe pour gérer les données du tableau

@Component({
  selector: 'app-users-list', // Sélecteur utilisé dans les templates pour référencer ce composant
  standalone: true, // Indique que le composant est autonome et peut être utilisé sans module
  imports: [UserDetail, CommonModule, MatTableModule, MatButtonModule], // Modules et composants importés
  templateUrl: './users-list.component.html', // Chemin vers le template HTML
  styleUrls: ['./users-list.component.css'] // Chemin vers les fichiers CSS
})
export class UsersList implements OnInit {
  usersDataSource = new MatTableDataSource<User>(); // MatTableDataSource pour gérer les données des utilisateurs dans un tableau
  displayedColumns: string[] = ['id', 'firstname', 'name', 'role', 'email', 'tel']; // Colonnes affichées dans le tableau

  // États pour suivre les changements de style, par utilisateur (id: boolean/string)
  isHighlighted: { [key: number]: boolean } = {}; // Suivi de l'état surligné (highlight) pour chaque utilisateur
  isBold: { [key: number]: boolean } = {}; // Suivi de l'état de gras pour chaque utilisateur
  textColor: { [key: number]: string } = {}; // Couleur du texte pour chaque utilisateur
  fontStyle: { [key: number]: string } = {}; // Style de la police (italique ou normal) pour chaque utilisateur

  constructor(
    private messageService: MessageService, // Service pour gérer et afficher les messages (injection de dépendance)
    private usersService: UsersService, // Service pour gérer les utilisateurs (injection de dépendance)
    private changeDetectorRef: ChangeDetectorRef // Service pour détecter manuellement les changements dans l'UI (injection de dépendance)
  ) {}

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.refreshUsers(); // Charge la liste des utilisateurs et initialise les données
  }

  /**
   * Récupère la liste des utilisateurs à partir du UsersService,
   * met à jour le tableau de données (MatTableDataSource) et
   * enregistre un message avec le nombre d'utilisateurs.
   * Utilise ChangeDetectorRef pour détecter les changements manuellement.
   * Entrée : aucune
   * Sortie : aucune (action side-effect)
   */
  refreshUsers(): void {
    this.usersDataSource.data = this.usersService.getUsers(); // Récupère et assigne les utilisateurs au tableau
    this.messageService.log(`Number of users: ${this.usersDataSource.data.length}`); // Log du nombre d'utilisateurs via le service de messages
    this.changeDetectorRef.detectChanges(); // Déclenche manuellement la détection des changements
  }

  /**
   * Active ou désactive le surlignage (couleur rouge) du prénom d'un utilisateur.
   * Change la propriété `isHighlighted` et met à jour la couleur du texte.
   * @param userId - L'identifiant unique de l'utilisateur (clé primaire).
   * Entrée : `userId` (number) - L'ID de l'utilisateur à modifier.
   * Sortie : aucune (modifie l'état interne).
   */
  toggleStyle(userId: number): void {
    this.isHighlighted[userId] = !this.isHighlighted[userId]; // Inverse l'état de surlignage
    this.textColor[userId] = this.isHighlighted[userId] ? 'red' : 'white'; // Met à jour la couleur du texte en fonction de l'état
  }

  /**
   * Active ou désactive le style gras et italique pour le nom de famille d'un utilisateur.
   * Change la propriété `isBold` et met à jour le style de la police.
   * @param userId - L'identifiant unique de l'utilisateur (clé primaire).
   * Entrée : `userId` (number) - L'ID de l'utilisateur à modifier.
   * Sortie : aucune (modifie l'état interne).
   */
  toggleClass(userId: number): void {
    this.isBold[userId] = !this.isBold[userId]; // Inverse l'état gras
    this.fontStyle[userId] = this.isBold[userId] ? 'italic' : 'normal'; // Met à jour le style de la police (italique ou normal)
  }
}
