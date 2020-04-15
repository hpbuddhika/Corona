import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./material.css']
})
export class AppComponent implements OnInit {
  title = 'corona';
  valuesSriLanka:ValuesSriLanka={
    id:"",
    countryName:"",
    totalCases:"",
    newCases:"",
    activeCases:"",
    totalDeaths: "",
    newDeaths:"",
    totalRecovered:"",
    seriousCritical:"",
    region: null,
    totalCasesPer1m: "",
    recordDate:""
  }
 
  constructor(private appService: AppService) {

  }

  ngOnInit() {
    this.appService.getCoronaData().subscribe((data) => {
      console.log(data['latest_stat_by_country'][0]);
      this.valuesSriLanka.countryName= data['latest_stat_by_country'][0].country_name ;
    },(error)=>{
      console.log(error);
    });

    // this.appService.getCoronaSafetyInstruction().subscribe((data) => {
    //   // console.log(data['latest_stat_by_country'][0]);
    //   console.log("2 nd call "+data.text())
    //   this.createImageFromBlob(data);
    // }, error => {
    //   console.log(error);
    // });

    setInterval(()=>{
      console.log('HI')
    },1000)

  }


}
export interface ValuesSriLanka{
  id:string
  countryName:string
  totalCases:string
  newCases:string
  activeCases: string
  totalDeaths: string
  newDeaths:string
  totalRecovered: string
  seriousCritical: string
  region: null
  totalCasesPer1m: string
  recordDate: string
}

