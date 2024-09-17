import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Le service est disponible à l'échelle de l'application entière
})
export class MessageService {
  private messages: string[] = []; // Tableau pour stocker les messages

  /**
   * Méthode pour ajouter un message dans le tableau de messages.
   * @param message Le message à ajouter.
   */
  log(message: string): void {
    this.messages.push(message); // Ajoute un nouveau message au tableau
  }

  /**
   * Méthode pour vider complètement le tableau des messages.
   */
  clear(): void {
    this.messages = []; // Efface tous les messages
  }

  /**
   * Méthode pour récupérer les messages stockés.
   * @returns Un tableau de chaînes de caractères représentant les messages.
   */
  getMessages(): string[] {
    return this.messages; // Retourne la liste actuelle des messages
  }

  /**
   * Méthode pour supprimer un message individuel par son index.
   * @param index L'index du message à supprimer.
   */
  deleteMessage(index: number): void {
    // Vérifie que l'index est valide avant de supprimer le message
    if (index > -1 && index < this.messages.length) {
      this.messages.splice(index, 1); // Supprime le message à l'index donné
    }
  }
}
