import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit{

  title = 'hero';  

  carte: string[] | undefined;
  heroPosition = { x: 0, y: 0 }; // Position initiale du héros

  

  constructor(private heroService: HeroService,private cdr: ChangeDetectorRef) {
   }

  ngOnInit(): void {
    this.getCarte();

    

  }

  //récupération de la carte du jeu 
  getCarte(): void {
    this.heroService.getCarte().subscribe(carte => {
      this.carte = carte;
      this.heroPosition.y = Math.floor(this.carte.length / 2); // Initialisation de heroPosition ici
    });
  }

  //Ecouteur d'événements sur la fenêtre pour les événements de type keydown.  
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.moveHero('N');
        break;
      case 'ArrowDown':
        this.moveHero('S');
        break;
      case 'ArrowLeft':
        this.moveHero('W');
        break;
      case 'ArrowRight':
        this.moveHero('E');
        break;
    }
  }

 
// Vérifie si la cellule est vide et accessible
  isCellAccessible(y: number, x: number): boolean {
    return this.carte !== undefined && this.carte[y][x] !== "#"; 
  }

  //Vérifie si la position actuelle du héros est donnée par les coordonnées spécifiées.
  isHeroPosition(y: number, x: number): boolean {
    return this.heroPosition.y === y && this.heroPosition.x === x;
  }

  //Déplace le héros dans une direction donnée, en appelant les méthodes de déplacement appropriées en fonction de la direction.


  moveHero(direction: string): void {
    this.heroService.moveHero(direction)
      .subscribe(
        newPosition => {
          // Mettre à jour la position du héros dans le composant
          this.heroPosition = { x: newPosition[0], y: newPosition[1] };
          // Forcer Angular à détecter les changements et mettre à jour la vue
          this.cdr.detectChanges();
        },
        error => {
          console.error('An error occurred:', error);
          // Gérer l'erreur, si nécessaire
        }
      );
  }

 
}
