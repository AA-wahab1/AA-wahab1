import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.css']
})
export class CommissionComponent {
  dataa: any;
  agent: any;
  payment: any;
  json = [];
  agentName: any;
  selectedCar: any;
  alert=false;
  constructor(private user: UsersService) {
    this.user.getAgent().subscribe((data) => {
      //console.log(data);
      this.dataa = data;
      this.agent = this.dataa.Result;
      this.agent = this.agent.Data;
      this.agent = JSON.parse(this.agent);
      //console.log(this.agent);
      this.payment = this.agent[0].paymentmodes;
      //console.log(this.payment);

      this.agentName = this.agent[0].agentname;
      //console.log(this.agentName);
    });
  }
  agentDd: any;
  paymentMode: any;
  date: any;
  terminal: any;
  calendarChange(event: any) {
    this.date = event.target.value;
    //console.log(this.date);
    this.date = this.date.replace('-', '');
    //console.log(this.date);
  }

  agentChange(event: any) {
    this.agentDd = event;
    //console.log(this.agentDd);
  }

  paymentChange(event: any) {
    this.paymentMode = event.value;
    //this.paymentMode=JSON.stringify(this.paymentMode)
    console.log(this.paymentMode);
  }
  terminalChange(event: any) {
    this.terminal = event.target.value;
    //console.log(this.terminal);
  }
  tableData: any;
  tableDisplay = false;
  tableAlert = false;
  noData = false;
  spinner = false;

  submit() {
    //console.log(this.tableData);

    this.spinner = true;

    //console.log(this.agentDd)
    //console.log(this.paymentMode)
    //console.log(this.date)
    //console.log(this.terminal)
    if (
      this.agentDd == null ||
      this.agentDd === '' ||
      this.agentDd == 'undefined' ||
      this.paymentMode == null ||
      this.paymentMode == '' ||
      this.paymentMode == 'undefined' ||
      this.terminal == null ||
      this.terminal == '' ||
      this.terminal == 'undefined' ||
      this.date == null ||
      this.date == '' ||
      this.date == 'undefined'
    ) {
      alert('Enter Correct Data');
      this.spinner = false;
    } else if (
      this.agentDd != null ||
      this.agentDd != '' ||
      this.agentDd != 'undefined' ||
      this.paymentMode != null ||
      this.paymentMode != '' ||
      this.paymentMode != 'undefined' ||
      this.terminal != null ||
      this.terminal != '' ||
      this.terminal != 'undefined' ||
      this.date != null ||
      this.date != '' ||
      this.date != 'undefined'
    ) {
      let GetData = '';
      let submitApi = `http://172.16.100.151:8055/api/get_table_terminalcommision?agentid=${this.agentDd}&paymentym=${this.date}&paymentmode=${this.paymentMode}&terminalid=${this.terminal}`;
      fetch(`${submitApi}`)
        .then((response) => response.json())
        .then((json) => {
          this.spinner = true;
          var responseJson = json.Result;
          var Codee = JSON.parse(responseJson.Response);
          //JSON.parse(responseJson.Result)
          //  let response=JSON.stringify(responseJson)

          let ResCode = Codee[0].Code;
          let ResMessage = Codee[0].Message;
          //console.log('ResCode ' + ResCode + ' ' + ResMessage);

          Codee = JSON.stringify(Codee);

          if (ResCode == '00') {
            this.tableAlert = true;
            console.log('data found');
            this.tableDisplay = true;
            setTimeout(() => {
              this.tableAlert = false;
            }, 2500);
            this.spinner = true;
            //{"Response":"[{\"Code\":\"00\",
            var terminalArray = JSON.parse(responseJson.Data);
            console.log(terminalArray);
            this.tableData = terminalArray;
            let len = this.tableData.length;
            console.log('length= ' + len);
            this.spinner = false;
            this.alert=true;
          } else if (ResCode == '11') {
            this.noData = true;
            setTimeout(() => {
              this.noData = false;
            }, 3500);
            this.spinner = false;
            console.log('data not available');
          } else {
            this.noData = true;
            setTimeout(() => {
              this.noData = false;
            }, 3500);
            this.spinner = false;
          }
        });
    }
    //this.spinner=false;
  }
  willUpdateData: any = [];

  comissionHandler(event: any, id: any, paymod: any) {
    let paymentMode = paymod;

    const obj = {
      RowId: id,
      Amount: event.target.value,
      PaymentMode: paymentMode,
    };
    if (this.willUpdateData.length > 0) {
      const index = this.willUpdateData.findIndex((x: any) => x.RowId == id);
      if (index != '-1') {
        this.willUpdateData[index].Amount = event.target.value;
      } else {
        this.willUpdateData.push(obj);
      }
    } else {
      this.willUpdateData.push(obj);
    }
    console.log(this.willUpdateData);
  }
  paymentHandler(event: any, id: any, cAmount: any) {
    const comAmount = cAmount;
    const obj = {
      RowId: id,
      Amount: comAmount,
      PaymentMode: event.value,
    };
    if (this.willUpdateData.length > 0) {
      const index = this.willUpdateData.findIndex((x: any) => x.RowId == id);
      if (index != '-1') {
        this.willUpdateData[index].PaymentMode = event.value;
      } else {
        this.willUpdateData.push(obj);
      }
    } else {
      this.willUpdateData.push(obj);
    }
  }
  updateNewMethod(){
    console.log(this.willUpdateData);
    this.user.updateCommission(this.willUpdateData).subscribe((result) => {
      console.log(result);
  })
}
  deleteNewMethod(event:any, id:any){
    let rowId = id.RowId;
    console.log(rowId);
    this.user.agentDel(rowId).subscribe((result) => {
      console.log(result);
})}
}

    
 
   

  

  //  update() {
  //   console.log(this.willUpdateData);
  //   const encodeFormData = (data: any) => {
  //     return Object.keys(data)
  //       .map(
  //         (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
  //       )
  //       .join('&');
  //   };
  //   const fetch_url_encoded = function (API: any, params: any) {
  //     let BODY = encodeFormData(params);
  //     console.log('Body ' + BODY);

  //     var promise = new Promise(function (resolve, reject) {
  //       fetch(API, {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //         body: BODY,
  //       })
  //         .then((res) => {
  //           // console.log(res);
  //           return res.json();
  //         })
  //         .then((json) => {
  //           console.log(json);

  //           let { Result } = json;

  //           resolve(Result);
  //         })
  //         .catch((err) => {
  //           reject(err);
  //         });
  //     });
  //     return promise;
  //   };
  //   fetch_url_encoded(
  //     'http://172.16.100.151:8055/api/update_table_terminalcommision',
  //     {
  //       RowData: JSON.stringify(this.willUpdateData),
  //     }
  //   );
  // }


  // rowID: any;
  // deleteHandler(event: any, id: any) {
  //   //console.log(id);
  //   let rowId = id.RowId;
  //   console.log(rowId);

  //   //let deleteApi = `http://172.16.100.151:8055/api/delete_terminalcommision?RowId=${rowId}` ;

  //   const encodeFormData = (data: any) => {
  //     return Object.keys(data)
  //       .map(
  //         (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
  //       )
  //       .join('&');
  //   };
  //   const fetch_url_encoded = function (API: any, params: any) {
  //     let BODY = encodeFormData(params);

  //     var promise = new Promise(function (resolve, reject) {
  //       fetch(API, {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //         body: BODY,
  //       })
  //         .then((res) => {
  //           // console.log(res);
  //           return res.json();
  //         })
  //         .then((json) => {
  //           console.log(json);

  //           let { Result } = json;

  //           resolve(Result);
  //         })
  //         .catch((err) => {
  //           reject(err);
  //         });
  //     });
  //     return promise;
  //   };
  //   fetch_url_encoded(
  //     'http://172.16.100.151:8055/api/delete_terminalcommision',
  //     {
  //       RowId: rowId,
  //     }
  //   );
  //   console.log(this.tableData);
  

  // fetch(`${deleteApi}`)
    // .then((response) => response.json())
    // .then((json) => {
    //   var responseJson = json.Result;
    //   console.log(responseJson);

    // var terminalArray = JSON.parse(responseJson.Data)
    // console.log(terminalArray);
    // this.tableData=terminalArray;