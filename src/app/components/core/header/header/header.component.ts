import { Component } from '@angular/core';
import { AvatarComponent } from "../avatar/avatar/avatar.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
