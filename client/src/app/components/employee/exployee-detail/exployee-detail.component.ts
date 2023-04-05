import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/interfaces/interfaces';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-exployee-detail',
  templateUrl: './exployee-detail.component.html',
  styleUrls: ['./exployee-detail.component.scss']
})
export class ExployeeDetailComponent implements OnInit {

  employeeDetail!: Employee;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.employeeService.getEmployee(id).subscribe((employeeData) => {
      this.employeeDetail = employeeData;
    });
  }

}
