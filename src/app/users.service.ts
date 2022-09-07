import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamsComponent } from './teams/teams.component';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  encodeFormData(data: any) {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
      .join('&');
  }
  constructor(private http: HttpClient) {}
  getData() {
    let url = 'https://jsonplaceholder.typicode.com/users';
    return this.http.get(url);
  }
  getAgent() {
    let agentApi = 'http://172.16.100.151:8055/api/get_agentname_paymentmodes';
    return this.http.get(agentApi);
  }
  getTeams() {
    let teamsApi = 'http://172.16.100.151:8055/api/get_managerall';
    return this.http.get(teamsApi);
  }

  Managerdel(val: any) {
    console.log('services data is ' + val);
    const headers = { 'content-type': 'application/x-www-form-urlencoded' };
    //let url=`http://172.16.100.151:8055/api/delete_managerall?MId=`
    let url = 'http://172.16.100.151:8055/api/delete_managerall';
    const params = {
      MId: val,
    };
    const body = this.encodeFormData(params);
    return this.http.post(url, body, {
      headers: headers,
      responseType: 'json',
    });
  }
  updateCommission(data: any) {
    console.log('services data is ' + data);
    const headers = { 'content-type': 'application/x-www-form-urlencoded' };
    let url = 'http://172.16.100.151:8055/api/update_table_terminalcommision';
    const params = {
      RowData: JSON.stringify(data),
    };
    const body = this.encodeFormData(params);
    return this.http.post(url, body, {
      headers: headers,
      responseType: 'json',
    });
  }
  agentDel(data:any){
    console.log('services data is ' + data);
    const headers = { 'content-type': 'application/x-www-form-urlencoded' };
    let url = 'http://172.16.100.151:8055/api/delete_terminalcommision';
    const params = {
      RowId: data
    };
    const body = this.encodeFormData(params);
    return this.http.post(url, body, {
      headers: headers,
      responseType: 'json',
    });
  }
}
