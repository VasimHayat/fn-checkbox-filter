import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  parentArray = [
    { id: "1", "description": "Owner", isSelected: false, childArray: [{ "id": "1", "description": "Owner" }] },
    { id: "2", "description": "Manager", isSelected: false, childArray: [{ "id": "2", "description": "Store Manager" }, { "id": "3", "description": "Area Manager" }, { "id": "4", "description": "State Manager" }] },
    { id: "3", "description": "Supervisor", isSelected: false, childArray: [{ "id": "5", "description": "Store Supervisor" }] },
    { id: "4", "description": "Crew", isSelected: false, childArray: [{ "id": "6", "description": "Crew" }] }
  ];



  cbSelectedItem(_event) {
    console.log(_event)
  }
}
