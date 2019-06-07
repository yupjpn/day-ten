import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  public user: User = new User();

  constructor(private activatedRoute: ActivatedRoute, 
    private http: HttpClient) {
   }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(
      (parameters: ParamMap) => {
        console.log(parameters);
        console.log(parameters.get("user_id"));

        const userId = parameters.get("user_id");

        // specify that response is of type User
        this.http.get("http://localhost:3000/api/users/" + userId).subscribe(
          (response: User) => {
            console.log(response);

            this.user.id = response.id;
            this.user.name = response.name;
            this.user.email = response.email;
          }
        );

        /*
        Express:
          return res.json
            name: ""
            email: ""
        */
      }
    );
  }

}
