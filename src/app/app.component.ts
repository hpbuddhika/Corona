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
  countryList;
  markerList = [];
  globalData: GlobalData = {
    NewConfirmed: 0,
    TotalConfirmed: 0,
    NewDeaths: 0,
    TotalDeaths: 0,
    NewRecovered: 0,
    TotalRecovered: 0
  }
  countryViceDetails: CountryViceDetails[];
  globalDetails: CountryViceDetails = {
    Country: "Global",
    CountryCode: null,
    Slug: null,
    NewConfirmed: null,
    TotalConfirmed: null,
    NewDeaths: null,
    TotalDeaths: null,
    NewRecovered: null,
    TotalRecovered: null,
    Date: null
  }



  // title = 'corona';
  // valuesSriLanka: ValuesSriLanka = {
  //   id: "",
  //   countryName: "",
  //   totalCases: "",
  //   newCases: "",
  //   activeCases: "",
  //   totalDeaths: "",
  //   newDeaths: "",
  //   totalRecovered: "",
  //   seriousCritical: "",
  //   region: null,
  //   totalCasesPer1m: "",
  //   recordDate: ""
  // }

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
      //making globalDeatils object
      this.globalDetails.NewConfirmed = this.globalData.NewConfirmed;
      this.globalDetails.TotalConfirmed = this.globalData.TotalConfirmed;
      this.globalDetails.NewRecovered = this.globalData.NewRecovered;
      this.globalDetails.TotalRecovered = this.globalData.TotalRecovered;
      this.globalDetails.NewDeaths = this.globalData.NewDeaths;
      this.globalDetails.TotalDeaths = this.globalData.TotalDeaths;

      this.countryViceDetails = data['Countries']
      this.countryViceDetails.splice(0, 0, this.globalDetails);
      console.log(this.countryViceDetails);
      this.totalNum(this.globalData);
    }, (error) => {
      console.log(error);
    });


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
    this.addMarker(L, this.mymap, 0, 0);

  }

  addMarker(L, map, lat, lng) {

    var circle = L.circle([lat, lng], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 10000
    }).addTo(map);
    this.markerList.push(circle);
    console.log("marker list")
    console.log(this.markerList);
  }



  totalNum(globalData) {
    for (let key in globalData) {
      if (typeof globalData[key] == 'number') {
        let numberValue: number = globalData[key]
        console.log(typeof numberValue)
        this.totalNumber = this.totalNumber + numberValue
      }
    }
    console.log(this.totalNumber) 
    console.log(this.globalData);

  }

  onClickCountry(countryDetail) {

    this.getCountryGeoLocation(countryDetail.Country);
    this.globalData.NewConfirmed = countryDetail.NewConfirmed;
    this.globalData.TotalConfirmed = countryDetail.TotalConfirmed;
    this.globalData.NewRecovered = countryDetail.NewRecovered;
    this.globalData.TotalRecovered = countryDetail.TotalRecovered;
    this.globalData.NewDeaths = countryDetail.NewDeaths;
    this.globalData.TotalDeaths = countryDetail.TotalDeaths;
    this.totalNumber = 0;
    this.totalNum(this.globalData);

  }


  getCountryGeoLocation(countryName: string) {

    this.appService.getCountryLocation(countryName).subscribe(
      (result) => {
        let latOfCountry = result[0].Lat;
        let lonOfCountry = result[0].Lon;
        this.markerList.splice(0,this.markerList.length)
        console.log(this.markerList)
        this.addMarker(L, this.mymap, latOfCountry, lonOfCountry);
      },
      (error) => {
        console.log(error);
      } 
    )

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
