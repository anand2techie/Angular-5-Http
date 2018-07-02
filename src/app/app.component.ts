import { Component } from '@angular/core';
import { ServerService } from 'app/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  appName=this.serverService.getAppName();

  //constructor with ServerService dependency injected
  constructor(private serverService: ServerService) {

  }

  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];

  //is going to add to the existing array of json
  //are you seeing any code to save to the DB?
  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }



  private generateId() {
    return Math.round(Math.random() * 10000);
  }

  onSave() {
    this.serverService.storeServers(this.servers)
      .subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
      );
  }

  //get -> get the data from the firebase db overriding the existing values
  onGet() {

    //observer
    this.serverService.getServers().subscribe(
      (servers: any[]) => {
        this.servers=servers;
        console.log(servers);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
