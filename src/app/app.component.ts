import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service'
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './material.css']
})
export class AppComponent implements OnInit {

  mymap;
  totalNumber: number = 0;
  countryList
  globalData: GlobalData = {
    NewConfirmed: 0,
    TotalConfirmed: 0,
    NewDeaths: 0,
    TotalDeaths: 0,
    NewRecovered: 0,
    TotalRecovered: 0
  }
  countryViceDetails:CountryViceDetails[];

  links: any = [
    {
      country: "sri lanka",
      amount: "454"
    },
    {
      country: "america",
      amount: "4540"
    }, {
      country: "braxil",
      amount: "54"
    },
    {
      country: "uk",
      amount: "456"
    },
    {
      country: "Gahana",
      amount: "100"
    }, {
      country: "india",
      amount: "4562"
    }
  ]


  title = 'corona';
  valuesSriLanka: ValuesSriLanka = {
    id: "",
    countryName: "",
    totalCases: "",
    newCases: "",
    activeCases: "",
    totalDeaths: "",
    newDeaths: "",
    totalRecovered: "",
    seriousCritical: "",
    region: null,
    totalCasesPer1m: "",
    recordDate: ""
  }

  constructor(private appService: AppService) {

  }

  ngOnInit() {
    // this.appService.getCoronaData().subscribe((data) => {
    //   console.log(data['latest_stat_by_country'][0]);
    //   this.valuesSriLanka.countryName = data['latest_stat_by_country'][0].country_name;
    // }, (error) => {
    //   console.log(error);
    // });

    this.appService.getCoronaSummary().subscribe((data) => {
      this.globalData = data['Global']
      this.countryViceDetails = data['Countries']
      console.log(this.countryViceDetails);
      this.totalNum(this.globalData);
    }, (error) => {
      console.log(error);
    });

    // this.appService.getCoronaSafetyInstruction().subscribe((data) => {
    //   // console.log(data['latest_stat_by_country'][0]);
    //   console.log("2 nd call "+data.text())
    //   this.createImageFromBlob(data);
    // }, error => {
    //   console.log(error);
    // });

    // setInterval(() => {
    //   console.log('HI')
    // }, 1000)

    this.mymap = L.map("mapid").setView([0, 0], 1);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/light-v10",
        tileSize: 512,
        zoomOffset: -1,
        maxZoom: 17,
        minZoom: 1,
        accessToken:
          "pk.eyJ1IjoicHJhZGVlcGJ1ZGRoaWthIiwiYSI6ImNrOTh0aWM1MDA1OGIzbHFqcG9zNWhoZDYifQ.hoEc1ChjYfftpi3UqEvEwg",
      }
    ).addTo(this.mymap);

    var circle = L.circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 10000
    }).addTo(this.mymap);









  }


  totalNum(globalData: GlobalData) {
    for (let key in globalData) {
      let numberValue: number = globalData[key]
      console.log(typeof numberValue)
      this.totalNumber = this.totalNumber + numberValue
    }
    console.log(this.totalNumber)

  }







  onKey($event) {
    console.log(event.target["value"]);
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }


}
export interface ValuesSriLanka {
  id: string
  countryName: string
  totalCases: string
  newCases: string
  activeCases: string
  totalDeaths: string
  newDeaths: string
  totalRecovered: string
  seriousCritical: string
  region: null
  totalCasesPer1m: string
  recordDate: string
}

export interface GlobalData {
  NewConfirmed: number,
  TotalConfirmed: number,
  NewDeaths: number,
  TotalDeaths: number,
  NewRecovered: number,
  TotalRecovered: number
}

export interface CountryViceDetails {
  Country: string,
  CountryCode: string,
  Slug: string,
  NewConfirmed: number,
  TotalConfirmed: number,
  NewDeaths: number,
  TotalDeaths: number,
  NewRecovered: number,
  TotalRecovered: number,
  Date: string
}
