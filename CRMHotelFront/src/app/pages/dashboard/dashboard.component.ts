import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrmSidebarComponent } from "../../components/crm-sidebar/crm-sidebar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, CrmSidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
