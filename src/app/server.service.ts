import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";




@Injectable()
export class ServerService {

    //dependency injection for http
    constructor(public http: Http) {

    }

    storeServers(servers: any[]) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        //post method will create an observable. request will not be sent yet. 
        //Request will be sent only if there is a subscriber
        // return this.http.post('https://ng-htttp-backend.firebaseio.com/data.json', servers, { headers: headers });

        //put is going to replace the existing data
        return this.http.put('https://ng-htttp-backend.firebaseio.com/data.json', servers, { headers: headers });
    }

    getServers() {
        return this.http.get('https://ng-htttp-backend.firebaseio.com/data.json').map(
            (response: Response) => {
                const data = response.json();
                for (const server of data) {
                    server.name = 'FETCHED_' + server.name;
                }

                //observable
                return data;
            }
        )
            .catch(
            (error: Response) => {
                return Observable.throw('something went wrong');
            }
            );
    }

    //get back the application name from appName.json
    getAppName(){

        //acting as an observer
        return this.http.get('https://ng-htttp-backend.firebaseio.com/appName.json')
        //map is one of the observable operators
        .map(
            (response:Response)=>{
               return response.json();
            }
        );
    }
}