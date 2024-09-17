// Importation des dépendances nécessaires
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user'; // Import du modèle User
import { MessageService } from '../../../services/message.service'; // Import du service pour les logs

@Component({
  selector: 'app-user-detail', // Sélecteur pour utiliser ce composant dans les templates
  standalone: true, // Le composant est autonome (sans module associé)
  templateUrl: './user-details.component.html', // Lien vers le fichier HTML de ce composant
  styleUrls: ['./user-details.component.css'] // Lien vers le fichier CSS de ce composant
})
export class UserDetail implements OnInit {
  // La propriété user est marquée avec @Input pour être injectée depuis un composant parent
  @Input() user!: User; 

  // Le constructeur injecte le service MessageService pour permettre de loguer des informations
  constructor(private messageService: MessageService) {}

  /**
   * ngOnInit : Lifecycle hook appelé une fois que le composant est initialisé
   * 
   * Cette méthode utilise le service MessageService pour loguer un message 
   * indiquant le prénom et le nom de l'utilisateur affiché dans le composant.
   */
  ngOnInit(): void {
    this.messageService.log(`User name: ${this.user.firstname} ${this.user.name}`);
  }
}
