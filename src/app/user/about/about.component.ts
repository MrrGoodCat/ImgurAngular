import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {

  constructor(protected userServise: UserService,
              protected appServise: AppService) { }

  isEditAbout = false;
  faPen = faPen;
  bio: string;

  ngOnInit() {
    if (this.userServise.accountBaseInformation.bio) {
      this.bio = this.userServise.accountBaseInformation.bio;
    } else {
      this.bio = 'Tell Imgur a little about yourself';
    }

  }

  onEditAbout() {
    this.isEditAbout = !this.isEditAbout;
  }
}
