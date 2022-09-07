import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  data: any;
  manager: any;
  panelOpenState = false;
  team: any;
  managerId: any;
  constructor(private user: UsersService) {
    this.user.getTeams().subscribe((data) => {
      this.data = data;
      this.data = this.data.Result.Data;
      this.data = JSON.parse(this.data);
      this.data = this.data;
      this.manager = this.data;
      console.log(this.manager);
      this.team = this.manager.TeamList;

      console.log(this.team);
    });
  }
  managerDel(data: any) {
    this.managerId = data;
    alert(this.managerId);
    //var val={MId:this.managerId}

    this.user.Managerdel(this.managerId).subscribe((result) => {
      console.log(result);
    });
  }

  ngOnInit(): void {}
}
