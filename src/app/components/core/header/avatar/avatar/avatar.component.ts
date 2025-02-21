import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {


  @Input()
  isLogged : boolean = false;
  @Input()
  userName : string | null = "";

  constructor() { }

  ngOnInit(): void {

  }
}
