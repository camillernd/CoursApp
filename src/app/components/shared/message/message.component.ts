import { Component } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-message',
  standalone: true, // Ce composant est autonome et n'est pas rattaché à un module spécifique
  imports: [CommonModule, MatButtonModule, MatCardModule, MatListModule, MatIconModule], // Modules requis pour le fonctionnement du composant
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  // Le service MessageService est injecté via le constructeur pour la gestion des messages
  constructor(public messageService: MessageService) {}

  /**
   * Méthode clearMessages
   * Description : Efface tous les messages stockés dans le MessageService.
   * Cette méthode est déclenchée lorsqu'on clique sur le bouton 'Clear Messages'.
   * Entrées : Aucune
   * Sorties : Aucune
   */
  clearMessages(): void {
    this.messageService.clear();
  }

  /**
   * Méthode deleteMessage
   * Description : Supprime un message spécifique de la liste des messages.
   * Cette méthode est appelée avec l'index du message à supprimer.
   * Entrées :
   *  - index (number) : L'index du message à supprimer dans la liste.
   * Sorties : Aucune
   */
  deleteMessage(index: number): void {
    this.messageService.deleteMessage(index);
  }
}
