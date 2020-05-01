import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import 'rxjs/add/operator/catch'


@Injectable({
    providedIn: 'root',
})
export class AppService {

    constructor(private http: HttpClient) { }


    getCoronaData() {
        return this.http.get("https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=Sri%20Lanka", {
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "98d1f2e8eamsh3272f0e61ffc411p18f11ajsn5b1f4452ee95"
            }
        }).catch((error)=>{
            return Observable.throw(error.message||"server error")
        });
    }

    getCoronaSummary(){
        return this.http.get("https://api.covid19api.com/summary", {
            "headers": {}
        }).catch((error)=>{
            return Observable.throw(error.message||"server error")
        });
    }

    getCoronaSafetyInstruction(): Observable<any> {
        return this.http.get("https://coronavirus-monitor.p.rapidapi.com/coronavirus/random_masks_usage_instructions.php", {
            "headers": {
                "content-type": "image/jpeg",
                "responseType": "blob",
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "98d1f2e8eamsh3272f0e61ffc411p18f11ajsn5b1f4452ee95",
            }
        }).catch((error)=>{
            return Observable.throw(error.message||"server error")
        });
    }

    getCountryLocation(country:string):Observable<any>{
        return this.http.get("https://api.covid19api.com/country/"+country+"/status/confirmed", {
            "headers": {}
        }).catch((error)=>{
            return Observable.throw(error.message||"server error")
        });
    }


}