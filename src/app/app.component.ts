import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AuthService } from './shared/auth.service';
import { User } from './shared/user';

declare var $: any;

@Component({
  selector: 'as-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private isLogin: boolean = false;
  private user: User = new User();
  @ViewChild('regModal') registerModal: ElementRef;
//  @ViewChild('regModal') registerModal: ModalDirective;
  private errorMessage: string = null;
  @ViewChild('loginModal') loginModal: ElementRef;

  constructor(private renderer: Renderer, private authService: AuthService) {}

  private onShowModal() {
    this.user = new User();
    this.errorMessage = null;
  }

  private onRegister(user: User) {
    this.errorMessage = null;
    this.authService.createUser(user)
      .subscribe((result: string) => {
        if(result == null) {
          $(this.registerModal.nativeElement).modal('hide');  //DELA, samo mi ni všeč, ker je mimo ng2
        } else {
          this.errorMessage = result;
        }
      });
    console.log(user);
//    console.log(this.registerModal.nativeElement);
    console.log(this.registerModal);
//    this.registerModal.nativeElement.modal('hide');
//    this.renderer.invokeElementMethod(this.registerModal.nativeElement, 'modal', ['hide']);  - NE DELA, ne najde metode
//    $(this.registerModal.nativeElement).modal('hide');  //DELA, samo mi ni všeč, ker je mimo ng2

//    console.log(this.registerModal.isShown);  problem pri tem je, da je false, ker ga nismo odprli preko API, ampak v template
//    this.registerModal.hide(); 
  }

  private onLogin(user: User) {
    this.errorMessage = null;
    console.log(user);
    this.authService.login(user)
      .subscribe((result: string) => {
        if(result == null) {
          $(this.loginModal.nativeElement).modal('hide');  //DELA, samo mi ni všeč, ker je mimo ng2
          this.isLogin = true;
        } else {
          this.errorMessage = result;
          this.isLogin = true;
        }
      });
  }

  private logout() {
    this.authService.logout().subscribe((result: boolean) => this.isLogin = false);
  }
}
