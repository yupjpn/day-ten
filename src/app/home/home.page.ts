import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public email: string = "";
  public password: string = "";

  constructor(private httpClient: HttpClient, private navCtrl: NavController) {}

  login() {
    const authReq = {
      email: this.email,
      password: this.password
    }

    this.httpClient.post("http://localhost:3000/api/auth", authReq)
    .subscribe((response: any) => {
      const userId = response.id;
      // Navigate
      this.navCtrl.navigateForward("profile", {
        queryParams: {
          user_id: userId
        }
      });
    },
      err => {
        alert("Failed to login.");
      });
  }

}
